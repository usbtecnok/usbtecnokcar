const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Testar conexão com o banco
app.get('/test-db', (req, res) => {
  db.query('SELECT NOW() AS now', (err, results) => {
    if (err) {
      console.error('Erro ao conectar no banco:', err);
      return res.status(500).json({ error: 'Erro de conexão com o banco' });
    }
    res.json({ hora_do_banco: results[0].now });
  });
});

// Rota principal
app.get('/', (req, res) => {
  res.send('✅ Backend usbtecnokcar está online!');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
