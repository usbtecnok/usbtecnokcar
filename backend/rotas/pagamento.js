const express = require('express');
const router = express.Router();
const mercadopago = require('mercadopago');

// Inicializa o cliente Mercado Pago com token
const mp = new mercadopago.MercadoPagoConfig({
  accessToken: 'link.mercadopago.com.br/plataformausbtecnokc'
});

router.post('/pix', async (req, res) => {
  const { descricao, valor } = req.body;

  try {
    const pagamento = await mp.payment.create({
      body: {
        transaction_amount: Number(valor),
        description: descricao,
        payment_method_id: 'pix',
        payer: {
          email: 'comprador@email.com'
        }
      }
    });

    res.json({
      idPagamento: pagamento.id,
      qrCode: pagamento.point_of_interaction.transaction_data.qr_code,
      qrCodeBase64: pagamento.point_of_interaction.transaction_data.qr_code_base64
    });
  } catch (error) {
    console.error('Erro ao gerar pagamento:', error);
    res.status(500).json({ erro: 'Erro ao gerar pagamento' });
  }
});

module.exports = router;

