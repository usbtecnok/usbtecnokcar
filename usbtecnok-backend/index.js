const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const mariadb = require('mariadb');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(express.json());

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'seu_usuario',
  password: 'sua_senha',
  database: 'usbtecnokcar'
});

// Simples rota para testar
app.get('/', (req, res) => {
  res.send('API USBtecnokCar funcionando');
});

// Criar pedido
app.post('/pedido', async (req, res) => {
  const { origem, destino } = req.body;
  try {
    const conn = await pool.getConnection();
    const result = await conn.query('INSERT INTO pedidos (origem, destino, status) VALUES (?, ?, ?)', [origem, destino, 'pendente']);
    conn.release();
    io.emit('novo-pedido', { id: result.insertId, origem, destino, status: 'pendente' });
    res.json({ id: result.insertId, origem, destino, status: 'pendente' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Aceitar pedido (motorista)
app.post('/pedido/:id/aceitar', async (req, res) => {
  const id = req.params.id;
  try {
    const conn = await pool.getConnection();
    await conn.query('UPDATE pedidos SET status = ? WHERE id = ?', ['aceito', id]);
    conn.release();
    io.emit('pedido-aceito', { id, status: 'aceito' });
    res.json({ id, status: 'aceito' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Atualizar localização do motorista
io.on('connection', socket => {
  console.log('Cliente conectado: ' + socket.id);

  socket.on('localizacao', data => {
    // data: { idPedido, lat, lng }
    io.emit('atualizacao-localizacao', data);
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

const PORT = 3001;
server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
