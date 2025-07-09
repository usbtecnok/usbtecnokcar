const express = require('express');
const cors = require('cors');
const app = express();
const pagamentoPix = require('./rotas/pagamento');

app.use(cors());
app.use(express.json());

app.use('/api/pagamento', pagamentoPix);

app.listen(3000, () => {
  console.log('🚀 Servidor backend rodando na porta 3000');
});
