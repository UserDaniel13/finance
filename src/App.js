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

    if (!form.category.trim()) {
      alert("Введите категорию");
      return;
    }

    if (!form.amount || Number(form.amount) <= 0) {
      alert("Введите корректную сумму");
      return;
    }

    const newOperation = {
      id: Date.now(),
      type: form.type,
      category: form.category,
      amount: Number(form.amount),
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

    return {
      income,
      expense,
      balance: income - expense,
    };
  }, [operations]);

  return (
    <div className="container">
      <h1>Учёт финансов</h1>

      <div className="totals">
        <div>Доход: {totals.income.toFixed(2)} ₽</div>
        <div>Расход: {totals.expense.toFixed(2)} ₽</div>
        <div>Баланс: {totals.balance.toFixed(2)} ₽</div>
      </div>

      <form onSubmit={handleSubmit} className="form">
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="income">Доход</option>
          <option value="expense">Расход</option>
        </select>

        <input
          type="text"
          name="category"
          placeholder="Категория"
          value={form.category}
          onChange={handleChange}
        />

        <input
          type="number"
          name="amount"
          placeholder="Сумма"
          value={form.amount}
          onChange={handleChange}
        />

        <button type="submit">Добавить</button>
      </form>

      <ul className="list">
        {operations.map((item) => (
          <li key={item.id}>
            <span>
              {item.category} ({item.type === "income" ? "Доход" : "Расход"})
            </span>

            <span className={item.type === "income" ? "income" : "expense"}>
              {item.type === "income" ? "+" : "-"}
              {item.amount.toFixed(2)} ₽
            </span>

            <button onClick={() => handleDelete(item.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;