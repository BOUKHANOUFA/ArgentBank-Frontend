import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../redux/userSlice";
import "../main.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // 1. LOGIN API
      const response = await fetch(
        "http://localhost:3001/api/v1/user/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: username,
            password: password,
          }),
        }
      );

      const data = await response.json();
      const token = data.body.token;

      // 2. PROFILE API
      const profileResponse = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const profileData = await profileResponse.json();

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
      console.log("Erreur login :", error);
    }
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <h1>Sign In</h1>

        <form onSubmit={handleLogin}>
          <div className="input-wrapper">
            <label>Username</label>
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

          <button className="sign-in-button" type="submit">
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
}