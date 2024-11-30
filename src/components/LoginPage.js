import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = ({updateUsername}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        localStorage.setItem("isAuthenticated", "true");
        updateUsername(username);
        navigate("/home");
      }
      else {
        alert("Invalid username or password.");
      }
    }
    catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>Login</button>
      </form>
      <p>
        Don't have an account?{" "}
        <button onClick={() => navigate("/sign-up")} style={styles.link}>
          Sign Up
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
  link: { background: "none", border: "none", color: "blue", cursor: "pointer" },
};

export default LoginPage;
