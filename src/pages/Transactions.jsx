import Navbar from "../components/Navbar";


export default function Transactions() {
  return (
    <>
      <Navbar />

      <main className="main bg-dark">
        <h1 style={{ color: "white", textAlign: "center" }}>
          Transactions
        </h1>

        <section className="account">
          <div className="account-content-wrapper">
            <h3>Transaction #1</h3>
            <p>$50.00</p>
            <p>Grocery</p>
          </div>
        </section>

        <section className="account">
          <div className="account-content-wrapper">
            <h3>Transaction #2</h3>
            <p>$120.00</p>
            <p>Shopping</p>
          </div>
        </section>
      </main>
    </>
  );
}