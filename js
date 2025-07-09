// backend/pagamento/pix.js
const mercadopago = require("mercadopago");

// Coloque sua access token de testes aqui:
mercadopago.configure({
  access_token: "TESTE-ACCESS-TOKEN"
});

async function gerarPagamentoPix(req, res) {
  try {
    const { descricao, valor, idUsuario } = req.body;

    const pagamento = await mercadopago.payment.create({
      transaction_amount: parseFloat(valor),
      description: descricao,
      payment_method_id: "pix",
      payer: {
        email: "comprador@email.com", // obrigatório para Pix no modo sandbox
      }
    });

    res.json({
      idPagamento: pagamento.body.id,
      qrCode: pagamento.body.point_of_interaction.transaction_data.qr_code,
      qrCodeBase64: pagamento.body.point_of_interaction.transaction_data.qr_code_base64
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao gerar pagamento Pix" });
  }
}

module.exports = gerarPagamentoPix;
