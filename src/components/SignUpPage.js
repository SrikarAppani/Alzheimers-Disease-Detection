import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = ({updateUsername}) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    age: "",
  });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (response.status === 201) { // HTTP 201 Created
        localStorage.setItem("isAuthenticated", "true");
        updateUsername(formData.username);
        alert("Signup successful!");
        navigate("/home");
      }
      else if (response.status === 409) { // HTTP 409 Conflict
        const errorData = await response.json();
        alert(errorData.error || "Username already exists.");
      }
      else {
        const errorData = await response.json();
        alert(errorData.error || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occurred. Please check your connection.");
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div style={styles.container}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup} style={styles.form}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>Sign Up</button>
      </form>
      <p>
        Already have an account?{" "}
        <button onClick={() => navigate("/")} style={styles.link}>
          Login
        </button>
      </p>
    </div>
  );
};

const styles = {
  container: { textAlign: "center", margin: "50px auto", maxWidth: "400px" },
  form: { display: "flex", flexDirection: "column", gap: "10px" },
  input: { padding: "10px", fontSize: "16px" },
  button: { padding: "10px", backgroundColor: "blue", color: "white", border: "none" },
  link: { background: "none", border: "none", color: "blue", cursor: "pointer" }
};

export default SignupPage;
