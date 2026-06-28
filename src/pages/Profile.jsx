import "../main.css";
import { Navigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Profile() {

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  //  condition
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src="/src/assets/img/argentBankLogo.png"
            alt="Argent Bank Logo"
          />
        </Link>

        <div>
          <Link className="main-nav-item" to="/profile">
            Tony
          </Link>

          <Link className="main-nav-item" to="/">
            Sign Out
          </Link>
        </div>
      </nav>

      <main className="main bg-dark">
        <h1>Welcome back Tony</h1>
      </main>
    </>
  );
}