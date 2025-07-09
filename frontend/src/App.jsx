import React from 'react';
import PagamentoPix from './components/PagamentoPix';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-6">
      {/* Logo */}
      <img
        src="/logo-usb-tecnok.png"
        alt="USB-TECNOK Logo"
        className="w-40 h-auto mb-6"
      />

      {/* Título */}
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
        Pagamento via Pix - USB-TECNOKCAR
      </h1>

      {/* Componente de pagamento */}
      <PagamentoPix />

      {/* Botão de voltar */}
      <button
        onClick={() => window.history.back()}
        className="mt-6 text-sm text-blue-600 hover:underline"
      >
        ← Voltar
      </button>
    </div>
  );
}

export default App;
