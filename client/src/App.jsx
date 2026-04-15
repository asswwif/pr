import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [logs, setLogs] = useState([]);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/logs');
        const data = await response.json();
        setLogs(data);
      } catch (err) {
        console.error("Помилка завантаження:", err);
      }
    };

    fetchData();
  }, []); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ errorText: inputText })
      });

      if (response.ok) {
        const newLog = await response.json();
        setLogs(prevLogs => [...prevLogs, newLog]); 
        setInputText(""); 
      }
    } catch (err) {
      console.error("Помилка при відправці:", err);
      alert("Не вдалося відправити дані.");
    }
  };

  return (
    <div className="container">
      <h1>Журнал запитів</h1>
      
      <form onSubmit={handleSubmit} className="log-form">
        <input 
          type="text" 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Введіть текст помилки..."
        />
        <button type="submit">Додати запис</button>
      </form>

      <table className="log-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Текст помилки</th>
            <th>Час</th>
          </tr>
        </thead>
        <tbody>
          {logs.map(log => (
            <tr key={log.id}>
              <td>{log.id}</td>
              <td>{log.errorText}</td>
              <td>{log.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;