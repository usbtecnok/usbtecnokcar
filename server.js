// server.js
function PagamentoPix({ descricao, valor }) {
  const [qrCodeBase64, setQrCodeBase64] = useState("");

  const gerarPix = async () => {
    const res = await fetch("/api/pagamento/pix", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ descricao, valor, idUsuario: 1 })
    });
    const data = await res.json();
    setQrCodeBase64(data.qrCodeBase64);
  };

  return (
    <div>
      <button onClick={gerarPix}>Gerar Pix</button>
      {qrCodeBase64 && (
        <img src={`data:image/png;base64,${qrCodeBase64}`} alt="QR Code Pix" />
      )}
    </div>
  );
}

const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

// Conexão com banco de dados
const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '@#*Z4939ia4',
  database: 'usbtecnokcar',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Rota de teste simples
app.get('/', (req, res) => {
  res.send('API rodando');
});

// Rota de cadastro de motoristas
app.post('/motoristas/cadastro', async (req, res) => {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) {
    return res.status(400).json({ erro: 'Dados incompletos' });
  }

  try {
    const hashSenha = await bcrypt.hash(senha, 10);
    const [result] = await pool.query(
      'INSERT INTO motoristas (nome, email, senha) VALUES (?, ?, ?)',
      [nome, email, hashSenha]
    );
    res.status(201).json({ mensagem: 'Motorista cadastrado', id: result.insertId });
  } catch (err) {
    console.error(err);
    if (err.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ erro: 'Email já cadastrado' });
    } else {
      res.status(500).json({ erro: 'Erro no servidor' });
    }
  }
});

// Iniciar o servidor
app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
