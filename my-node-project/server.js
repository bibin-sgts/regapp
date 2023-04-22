const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'regapp',
  password: 'password',
  port: 5432
});

app.post('/api/register', (req, res) => {
  const { firstName, lastName, email, phone, gender, password1, password2 } = req.body;

  if (password1 !== password2) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  const query = {
    text: 'INSERT INTO users (first_name, last_name, email, phone, gender, password) VALUES ($1, $2, $3, $4, $5, $6)',
    values: [firstName, lastName, email, phone, gender, password1]
  };

  pool.query(query)
    .then(() => {
      res.json({ message: 'User created successfully' });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: 'An error occurred' });
    });
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
  
    const query = {
      text: 'SELECT * FROM users WHERE email = $1 AND password = $2',
      values: [email, password]
    };
  
    pool.query(query)
      .then(result => {
        if (result.rows.length === 0) {
          res.status(401).json({ message: 'Invalid credentials' });
        } else {
          res.json({ message: 'Login successful' });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ message: 'An error occurred' });
      });
  });
  

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
