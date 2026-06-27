import { Link } from "react-router-dom";
import logo from "../assets/img/argentBankLogo.png";
import chatIcon from "../assets/img/icon-chat.png";
import money from "../assets/img/icon-money.png";
import security from "../assets/img/icon-security.png";

import "../main.css";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
      </main>
      <Footer />
    </>
  );
}

export default Home;

