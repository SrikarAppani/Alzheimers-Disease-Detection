from PIL import Image
import bcrypt
from flask import Flask, request, jsonify
import numpy as np
from pymongo import MongoClient
from bson.binary import Binary
from pydantic import BaseModel
from typing import Any, Dict, List, Optional
import datetime
import tensorflow as tf
from flask_cors import CORS
import io
import base64

app = Flask(__name__)
CORS(app)

client = MongoClient("mongodb://127.0.0.1:27017")
db = client["AlzheimerDetectionApplication"]
users = db["users"]
credentials = db["credentials"]

class UserSchema(BaseModel):
    username: str
    name: str
    age: int
    MRI_records: Optional[List[Dict[str, Any]]]

model = tf.keras.models.load_model("C:/Users/DELL/Downloads/best_weights.keras")

def preprocess_image(image, target_size=(224, 224)):
    image = image.resize(target_size)
    image_array = np.array(image)
    
    if len(image_array.shape) == 2:
        image_array = np.expand_dims(image_array, axis=-1)
        image_array = tf.image.grayscale_to_rgb(tf.convert_to_tensor(image_array)).numpy()
    elif image_array.shape[-1] != 3:
        raise ValueError("Unexpected image format: {}".format(image_array.shape))

    image_array = image_array / 255.0
    return np.expand_dims(image_array, axis=0)

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files['file']
    try:
        image = Image.open(file.stream)
    except Exception as e:
        return jsonify({"error": f"Failed to process the image: {str(e)}"}), 400

    input_data = preprocess_image(image)

    predictions = model.predict(input_data)
    predicted_class = np.argmax(predictions)

    class_labels = {
        0: "Mild Demented",
        1: "Moderate Demented",
        2: "Non Demented",
        3: "Very Mild Demented"
    }
    predicted_label = class_labels.get(predicted_class, "Unknown")

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
        if len(credential) !=0 and bcrypt.checkpw(password.encode('utf-8'), credential[0][username]):
            return jsonify({"message": "Login successful"}), 200
        else:
            return jsonify({"error": "Invalid username or password"}), 401
    except Exception as e:
        return jsonify({"error": e}), 400

@app.route('/add', methods=['POST'])
def add_image():
    try:
        username = request.form.get('username')
        date = request.form.get('date', datetime.datetime.now().isoformat())
        image = request.files['image']
        scan_result = request.form.get("scan_result")
        image_binary = Binary(image.read())
        new_record = {
            "date_scanned": date,
            "image": image_binary,
            "result": scan_result
        }
        
        result = users.update_one({"username":username}, {
            "$push": {
                "MRI_records": new_record
            }
        })
        if result.matched_count==1:
            return jsonify({"message": "Image added successfully"}), 200
        else:
            return jsonify({"error": "No matching record found"}), 400
    except Exception as e:
        return jsonify({"error": e}), 400

@app.route('/get_records', methods=['GET'])
def get_records():
    username = request.args.get("username")
    user = users.find_one({"username": username})
    
    if user:
        records = user.get("MRI_records", [])
        
        for record in records:
            base64_image = []
            if "image" in record:
                image_binary = record["image"]
                base64_image = base64.b64encode(image_binary).decode("utf-8")
                
                record["image"] = base64_image

        return jsonify({"records": records}), 200

    return jsonify({"message": "User not found"}), 404


@app.route('/delete_record', methods=['POST'])
def delete_record():
    data = request.json
    username = data["username"]
    index = data["index"]

    user = users.find_one({"username": username})
    if user and "MRI_records" in user and 0 <= index < len(user["MRI_records"]):
        records = user["MRI_records"]
        del records[index]

        result = users.update_one(
            {"username": username},
            {"$set": {"MRI_records": records}}
        )
        if result.modified_count > 0:
            return jsonify({"message": "Record deleted successfully"}), 200

    return jsonify({"message": "Failed to delete record"}), 400

if __name__ == '__main__':
    app.run(debug=True)
