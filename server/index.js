import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors()); 
app.use(express.json());

let logs = [
  { id: 1, errorText: "Помилка з'єднання", timestamp: new Date().toLocaleString() }
];

app.get('/api/logs', (req, res) => {
  res.json(logs);
});

app.post('/api/logs', (req, res) => {
  const { errorText } = req.body;

  if (!errorText || typeof errorText !== 'string' || errorText.length < 3) {
    return res.status(400).json({ message: "Текст має бути рядком мін. 3 символи" });
  }

  const newLog = {
    id: Date.now(),
    errorText,
    timestamp: new Date().toLocaleString()
  };

  logs.push(newLog);
  res.status(201).json(newLog);
});

app.get('/', (req, res) => {
  res.send('API Server is running...');
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));