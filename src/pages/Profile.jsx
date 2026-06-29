import "../main.css";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { loginSuccess } from "../redux/userSlice";

export default function Profile() {
  const dispatch = useDispatch();

  const { isLoggedIn, token, user } = useSelector((state) => state.user);

  const [editMode, setEditMode] = useState(false);
  const [newUsername, setNewUsername] = useState(user?.userName || "");

  
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userName: newUsername,
          }),
        }
      );

      const data = await response.json();

      //  update Redux
      dispatch(
        loginSuccess({
          token,
          user: data.body,
        })
      );

      setEditMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <main className="main bg-dark">
        {!editMode ? (
          <>
            <h1>
              Welcome back {user?.userName}
            </h1>

            <button onClick={() => setEditMode(true)}>
              Edit Name
            </button>
          </>
        ) : (
          <>
            <h1>Edit Name</h1>

            <input
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />

            <button onClick={handleUpdate}>Save</button>
            <button onClick={() => setEditMode(false)}>
              Cancel
            </button>
          </>
        )}
      </main>
    </>
  );
}