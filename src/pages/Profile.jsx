import "../main.css";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Account from "../components/Account.jsx";
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
        <div className="header">
          {!editMode ? (
            <>
              <h1>
                Welcome back
                <br />
                {user?.userName}!
              </h1>

              <button
                className="edit-button"
                onClick={() => setEditMode(true)}
              >
                Edit Name
              </button>
            </>
          ) : (
            <>
              <h1>Edit user info</h1>

              <div className="input-wrapper">
                <label>User name</label>
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                />
              </div>

              <div className="input-wrapper">
                <label>First name</label>
                <input type="text" value={user?.firstName} disabled />
              </div>

              <div className="input-wrapper">
                <label>Last name</label>
                <input type="text" value={user?.lastName} disabled />
              </div>

              <div>
                <button className="edit-button" onClick={handleUpdate}>
                  Save
                </button>

                <button
                  className="edit-button"
                  onClick={() => setEditMode(false)}
                  style={{
                    marginLeft: "10px",
                    backgroundColor: "#ccc",
                    color: "#000",
                  }}
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>

        <h2 className="sr-only">Accounts</h2>

       
        <Account
          title="Argent Bank Checking (x8349)"
          amount="$2,082.79"
          description="Available Balance"
        />

        <Account
          title="Argent Bank Savings (x6712)"
          amount="$10,928.42"
          description="Available Balance"
        />

        <Account
          title="Argent Bank Credit Card (x8349)"
          amount="$184.30"
          description="Current Balance"
        />
      </main>
    </>
  );
}