import { useState } from "react";
import "./App.css";

function App() {
  const [operations, setOperations] = useState([]);
  const [form, setForm] = useState({
    type: "income",
    category: "",
    amount: "",
  });

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

    setOperations([newOperation, ...operations]);
    setForm({ type: "income", category: "", amount: "" });
  };

  return (
    <div className="container">
      <h1>Учёт финансов</h1>

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
            {item.category} ({item.type}) — {item.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;