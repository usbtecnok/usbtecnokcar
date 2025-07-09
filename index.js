const express = require('express');
const app = express();

const pagamentoRoutes = require('./rotas/pagamento');

app.use(express.json());

app.use('/api/pagamento', pagamentoRoutes);

app.listen(3000, () => {
  console.log('🚀 Servidor backend rodando na porta 3000');
});
