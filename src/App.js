import { useState } from "react";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    type: "income",
    category: "",
    amount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div className="container">
      <h1>Учёт финансов</h1>

      <form className="form">
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

        <button>Добавить</button>
      </form>
    </div>
  );
}

export default App;