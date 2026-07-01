
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../redux/userSlice";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../main.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    console.log("LOGIN CLICK");

    // 1. LOGIN
    const response = await fetch(
      "http://localhost:3001/api/v1/user/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: username.trim(),
          password: password.trim(),
        }),
      }
    );

    const data = await response.json();
    console.log("LOGIN DATA:", data);

    const token = data?.body?.token;

    if (!token) {
      alert("Login failed");
      return;
    }
    localStorage.setItem("token", token);

    // 2. PROFILE 
    const profileResponse = await fetch(
      "http://localhost:3001/api/v1/user/profile",
      {
        method: "GET", // 
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const profileData = await profileResponse.json();
    console.log("PROFILE DATA:", profileData);

    // 3. Redux
    dispatch(
      loginSuccess({
        token: token,
        user: profileData.body,
      })
    );

    // 4. redirect
    navigate("/profile");
  } catch (error) {
    console.log("LOGIN ERROR:", error);
  }
};

  return (
   
      <main className="main bg-dark">
      <section className="sign-in-content">
        <h1>Sign In</h1>

        <form onSubmit={handleLogin}>
          <div className="input-wrapper">
            <label>Username (email)</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="input-wrapper">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="sign-in-button">
            Sign In
          </button>
        </form>
      </section>
    </main>
   
  )
}