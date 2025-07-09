console.log("Meu script JS foi carregado com sucesso!");

// Inicializa o mapa no centro de uma localização
const map = L.map('map').setView([-20.288, -40.295], 13); // Você pode ajustar essa coordenada

// Adiciona o mapa base do OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap',
}).addTo(map);

// Ícone do motorista
const motoristaIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

// Simula a posição do motorista (depois você pode integrar com dados reais via backend ou socket)
let motorista = L.marker([-20.288, -40.295], { icon: motoristaIcon }).addTo(map);
motorista.bindPopup("Motorista em movimento").openPopup();

// Simula o movimento do motorista a cada 3 segundos
setInterval(() => {
  const lat = motorista.getLatLng().lat + (Math.random() - 0.5) * 0.001;
  const lng = motorista.getLatLng().lng + (Math.random() - 0.5) * 0.001;
  motorista.setLatLng([lat, lng]);
  map.panTo([lat, lng]);
}, 3000);
