from PIL import Image
import bcrypt
from flask import Flask, request, jsonify, send_file
import numpy as np
from pymongo import MongoClient
from bson.objectid import ObjectId
from bson.binary import Binary
from pydantic import BaseModel
from typing import Any, Dict, List, Optional
import datetime
from flask import render_template
import tensorflow as tf
from flask_cors import CORS
from flask import send_file
import io
import base64

app = Flask(__name__)
CORS(app)

# MongoDB connection
client = MongoClient("mongodb://127.0.0.1:27017")  # Update with your MongoDB URI if needed
db = client["AlzheimerDetectionApplication"]
users = db["users"]
credentials = db["credentials"]
collection = db["images"]

class UserSchema(BaseModel):
    username: str
    name: str
    age: int
    MRI_records: Optional[List[Dict[str, Any]]]

# Load your trained model
model = tf.keras.models.load_model("C:/Users/DELL/Downloads/best_weights.keras")

# Function to preprocess the image
def preprocess_image(image, target_size=(224, 224)):
    image = image.resize(target_size)  # Resize to model's input size
    image_array = np.array(image)  # Convert to NumPy array
    
    # If the image is grayscale, convert to RGB
    if len(image_array.shape) == 2:
        image_array = np.expand_dims(image_array, axis=-1)
        image_array = tf.image.grayscale_to_rgb(tf.convert_to_tensor(image_array)).numpy()
    elif image_array.shape[-1] != 3:
        raise ValueError("Unexpected image format: {}".format(image_array.shape))

    image_array = image_array / 255.0  # Normalize the pixel values
    return np.expand_dims(image_array, axis=0)  # Add batch dimension

# Define the prediction route
@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400

    # Get the image from the request
    file = request.files['file']
    try:
        image = Image.open(file.stream)  # Open image from the file stream
    except Exception as e:
        return jsonify({"error": f"Failed to process the image: {str(e)}"}), 400

    # Preprocess the image for the model
    input_data = preprocess_image(image)

    # Make the prediction
    predictions = model.predict(input_data)
    predicted_class = np.argmax(predictions)

    # Map the predicted class to a descriptive label
    class_labels = {
        0: "Mild Demented",
        1: "Moderate Demented",
        2: "Non Demented",
        3: "Very Mild Demented"
    }
    predicted_label = class_labels.get(predicted_class, "Unknown")

    # Return the prediction result
    return jsonify({"result": predicted_label})


@app.route("/sign-up", methods=["POST"])
def create_user():
    try:
        data = request.json
        username = data.get("username")
        username_exists = list(db.credentials.find({username:{"$exists":True}}))
        if(len(username_exists) == 0):
            password = data.get("password")
            name = data.get("name")
            age = data.get("age")
            new_credential = {username:bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())}
            new_user = {"username" : username, "name" : name, "age": age}
            db.credentials.insert_one(new_credential)
            db.users.insert_one(new_user)
            return jsonify({"message": "User created successfully"}), 201
        else:
            return jsonify({"error": "Username already exists!"}), 409
        
    except Exception as e:
        print(e)
        return jsonify({"error": e}), 400

@app.route("/login", methods=["POST"])
def login():
    try:
        username = request.json.get("username")
        password = request.json.get("password")
        credential = list(db.credentials.find({username:{"$exists":True}}))
        if bcrypt.checkpw(password.encode('utf-8'), credential[0][username]):
            return jsonify({"message": "Login successful"}), 200
        else:
            return jsonify({"error": "Invalid username or password"}), 401
    except Exception as e:
        return jsonify({"error": e}), 400

@app.route('/add', methods=['POST'])
def add_image():
    """Add an image with date and serial number."""
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"}), 400

    image = request.files['image']
    serial_no = request.form.get('serial_no')
    date = request.form.get('date', datetime.datetime.utcnow().isoformat())

    if not serial_no:
        return jsonify({"error": "Serial number is required"}), 400

    # Convert image to binary
    image_binary = Binary(image.read())
    
    # Create document
    document = {
        "serial_no": serial_no,
        "date": date,
        "image": image_binary
    }
    
    result = collection.insert_one(document)
    return jsonify({"message": "Image added successfully", "id": str(result.inserted_id)})

@app.route('/retrieve', methods=['GET'])
def retrieve_form():
    """Render the form to fetch and display an image."""
    return render_template('display.html')

@app.route('/upload', methods=['GET'])
def upload_form():
    return render_template('upload.html')


@app.route('/update/<id>', methods=['PUT'])
def update_image(id):
    """Update an image, date, or serial number."""
    try:
        updates = {}
        
        if 'image' in request.files:
            image = request.files['image']
            updates["image"] = Binary(image.read())

        if 'serial_no' in request.form:
            updates["serial_no"] = request.form['serial_no']

        if 'date' in request.form:
            updates["date"] = request.form['date']

        if not updates:
            return jsonify({"error": "No updates provided"}), 400

        result = collection.update_one({"_id": ObjectId(id)}, {"$set": updates})
        if result.matched_count == 0:
            return jsonify({"error": "Image not found"}), 404

        return jsonify({"message": "Image updated successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/delete/<id>', methods=['DELETE'])
def delete_image(id):
    """Delete an image by ID."""
    try:
        result = collection.delete_one({"_id": ObjectId(id)})
        if result.deleted_count == 0:
            return jsonify({"error": "Image not found"}), 404

        return jsonify({"message": "Image deleted successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/display', methods=['GET'])
def display_image():
    """Retrieve and return an image as a base64 string based on the serial number."""
    serial_no = request.args.get('serial_no')
    
    if not serial_no:
        return jsonify({"error": "Serial number is required"}), 400

    # Fetch the document from the database
    document = collection.find_one({"serial_no": serial_no})
    if not document:
        return jsonify({"error": "Image not found for the given serial number"}), 404

    # Convert the binary image data to base64
    image_binary = document['image']
    image_base64 = base64.b64encode(image_binary).decode('utf-8')

    return jsonify({"image": image_base64, "serial_no": serial_no})

if __name__ == '__main__':
    app.run(debug=True)
