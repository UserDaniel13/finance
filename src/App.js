import { useState, useMemo, useEffect } from "react";
import "./App.css";

const STORAGE_KEY = "finance-operations";

function App() {
  const [operations, setOperations] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({
    type: "income",
    category: "",
    amount: "",
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(operations));
  }, [operations]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newOperation = {
      id: Date.now(),
      ...form,
    };

    setOperations((prev) => [newOperation, ...prev]);

    setForm({ type: "income", category: "", amount: "" });
  };

  const handleDelete = (id) => {
    setOperations((prev) => prev.filter((item) => item.id !== id));
  };

  const totals = useMemo(() => {
    const income = operations
      .filter((i) => i.type === "income")
      .reduce((s, i) => s + Number(i.amount), 0);

    const expense = operations
      .filter((i) => i.type === "expense")
      .reduce((s, i) => s + Number(i.amount), 0);

    return { income, expense, balance: income - expense };
  }, [operations]);

  return (
    <div className="container">
      <h1>Учёт финансов</h1>

      <div>
        Доход: {totals.income} | Расход: {totals.expense} | Баланс: {totals.balance}
      </div>

      <form onSubmit={handleSubmit} className="form">
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="income">Доход</option>
          <option value="expense">Расход</option>
        </select>

        <input name="category" value={form.category} onChange={handleChange} />
        <input name="amount" value={form.amount} onChange={handleChange} />

        <button>Добавить</button>
      </form>

      <ul>
        {operations.map((item) => (
          <li key={item.id}>
            {item.category} — {item.amount}
            <button onClick={() => handleDelete(item.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;