import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Transactions from "./pages/Transactions"; 
import Footer from "./components/Footer";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./redux/userSlice";



function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch("http://localhost:3001/api/v1/user/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch(
            loginSuccess({
              token: token,
              user: data.body,
            })
          );
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/transactions" element={<Transactions />} />
    </Routes>
      <Footer />
    </>
  );
}

export default App;