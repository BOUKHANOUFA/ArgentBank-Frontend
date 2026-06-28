import "../main.css";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";

export default function Profile() {

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  //  condition
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Navbar />

      <main className="main bg-dark">
        <h1>Welcome back Tony</h1>
      </main>
    </>
  );
}