const express = require('express');
const mysql = require('mysql2');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Pass@123', // change to your DB password
  database: 'ajaydb'        // change to your DB name
});

db.connect(err => {
  if (err) {
    console.error('DB connection error:', err.message);
  } else {
    console.log('Connected to MySQL');
  }
});

// Login route with parameterized query (prevents SQL injection)
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) return res.send('Please enter username and password');

  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.execute(query, [username, password], (err, results) => {
    if (err) return res.send('Database error');
    if (results.length > 0) res.send('Login successful');
    else res.send('Invalid credentials');
  });
});

// Serve HTML
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
