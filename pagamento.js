const express = require('express');
const router = express.Router();
const mercadopago = require('mercadopago');

// Substitua por sua access token de teste
mercadopago.configure({
  access_token: "link.mercadopago.com.br/plataformausbtecnokc"
});

router.post('/pix', async (req, res) => {
  const { descricao, valor } = req.body;

  try {
    const pagamento = await mercadopago.payment.create({
      transaction_amount: Number(valor),
      description: descricao,
      payment_method_id: "pix",
      payer: {
        email: "comprador@email.com"
      }
    });

    res.json({
      idPagamento: pagamento.body.id,
      qrCode: pagamento.body.point_of_interaction.transaction_data.qr_code,
      qrCodeBase64: pagamento.body.point_of_interaction.transaction_data.qr_code_base64
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao gerar Pix" });
  }
});

module.exports = router;
