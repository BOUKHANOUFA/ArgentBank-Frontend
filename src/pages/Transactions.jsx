import { useState } from "react";
import Navbar from "../components/Navbar";

export default function Transactions() {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      title: "Transaction #1",
      amount: "$50.00",
      category: "Grocery",
      note: "",
      isOpen: false,
    },
    {
      id: 2,
      title: "Transaction #2",
      amount: "$120.00",
      category: "Shopping",
      note: "",
      isOpen: false,
    },
  ]);

  const toggleTransaction = (id) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isOpen: !t.isOpen } : t)),
    );
  };

  const updateField = (id, field, value) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, [field]: value } : t)),
    );
  };

  return (
    <>
      <Navbar />

      <main className="main bg-dark">
        <h1 style={{ color: "white", textAlign: "center" }}>Transactions</h1>

        {transactions.map((t) => (
          <section key={t.id} className="account">
            <div className="account-content-wrapper">
              <h3>{t.title}</h3>
              <p>{t.amount}</p>
              <p>{t.category}</p>

              <button
                onClick={() => toggleTransaction(t.id)}
                className="edit-button"
              >
                {t.isOpen ? "Close" : "Edit"}
              </button>
            </div>

            {t.isOpen && (
              <div className="transaction-form">
                <div className="input-wrapper">
                  <label>Category</label>
                  <select
                    value={t.category}
                    onChange={(e) =>
                      updateField(t.id, "category", e.target.value)
                    }
                  >
                    <option>Grocery</option>
                    <option>Shopping</option>
                    <option>Transport</option>
                    <option>Food</option>
                  </select>
                </div>

                <div className="input-wrapper">
                  <label>Note</label>
                  <input
                    type="text"
                    value={t.note}
                    onChange={(e) => updateField(t.id, "note", e.target.value)}
                  />
                </div>
              </div>
            )}
          </section>
        ))}
      </main>
    </>
  );
}
