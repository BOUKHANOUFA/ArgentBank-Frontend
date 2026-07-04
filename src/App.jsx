import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Transactions from "./pages/Transactions"; 
import Footer from "./components/Footer";



function App() {
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