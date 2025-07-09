import React, { useState } from 'react';
import axios from 'axios';

function PagamentoPix() {
  const [valor, setValor] = useState('');
  const [qrCode, setQrCode] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  const gerarPix = async () => {
    setCarregando(true);
    setErro('');
    setQrCode(null);

    try {
      const response = await axios.post('http://localhost:3000/api/pagamento/pix', {
        descricao: 'Pagamento de corrida',
        valor: parseFloat(valor)
      });

      setQrCode(response.data.qrCodeBase64);
    } catch (err) {
      console.error(err);
      setErro('Erro ao gerar Pix');
    }

    setCarregando(false);
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold">Pagamento via Pix</h2>
      <input
        type="number"
        placeholder="Digite o valor da corrida"
        className="w-full border p-2 rounded"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
      />
      <button
        onClick={gerarPix}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
      >
        Gerar QR Code Pix
      </button>

      {carregando && <p>Gerando Pix...</p>}
      {erro && <p className="text-red-500">{erro}</p>}

      {qrCode && (
        <div className="mt-4 text-center">
          <p>Escaneie com seu app bancário:</p>
          <img src={`data:image/png;base64,${qrCode}`} alt="QR Code Pix" className="mx-auto mt-2" />
        </div>
      )}
    </div>
  );
}

export default PagamentoPix;
