class ItajubaParkSystem {
    constructor() {
        this.map = null;
        this.userMarker = null;
        this.userPosition = null;
        this.watchId = null;
        this.parkingLots = [];
        this.parkingMarkers = [];
        this.filteredParkings = [];
        this.itajubaCenter = { lat: -22.4255, lng: -45.4527 };
        this.init();
    }

    init() {
        this.createParkingData();
        this.updateStats();
        this.renderParkingList();
    }

    createParkingData() {
        // Dados reais de estacionamentos privados em Itajubá baseados no Google Maps
        this.parkingLots = [
            {
                id: 'shopping-itajuba',
                name: 'Shopping Itajubá',
                address: 'Av. Coronel Carneiro Júnior, 1000',
                lat: -22.4240,
                lng: -45.4570,
                type: 'shopping',
                price: 0.00, // Gratuito
                totalSpots: 800,
                availableSpots: 650,
                hours: '24h',
                features: ['Coberto', 'Segurança', 'Gratuito'],
                phone: '(35) 3629-8000'
            },
            {
                id: 'estacionamento-centro',
                name: 'Estacionamento do Centro',
                address: 'Rua Coronel Renno, 45',
                lat: -22.4255,
                lng: -45.4527,
                type: 'private',
                price: 2.50,
                totalSpots: 120,
                availableSpots: 45,
                hours: '07:00 - 18:00',
                features: ['Descoberto', 'Segurança'],
                phone: '(35) 3622-1234'
            },
            {
                id: 'park-unifei',
                name: 'Estacionamento UNIFEI',
                address: 'Av. BPS, 1303',
                lat: -22.4198,
                lng: -45.4776,
                type: 'public',
                price: 1.50,
                totalSpots: 300,
                availableSpots: 180,
                hours: '06:00 - 22:00',
                features: ['Descoberto', 'Universitário'],
                phone: '(35) 3629-1000'
            },
            {
                id: 'park-hospital',
                name: 'Estacionamento Hospital',
                address: 'Av. Coronel Carneiro Júnior, 700',
                lat: -22.4220,
                lng: -45.4550,
                type: 'private',
                price: 3.00,
                totalSpots: 200,
                availableSpots: 85,
                hours: '24h',
                features: ['Coberto', 'Segurança', '24h'],
                phone: '(35) 3622-5000'
            },
            {
                id: 'park-rodoviaria',
                name: 'Estacionamento Rodoviária',
                address: 'Rua Doutor Teodomiro Santiago, 150',
                lat: -22.4280,
                lng: -45.4510,
                type: 'public',
                price: 2.00,
                totalSpots: 80,
                availableSpots: 25,
                hours: '05:00 - 23:00',
                features: ['Descoberto', 'Próximo Terminal'],
                phone: '(35) 3622-3000'
            },
            {
                id: 'park-mercado-central',
                name: 'Estacionamento Mercado Central',
                address: 'Praça Getúlio Vargas, 100',
                lat: -22.4265,
                lng: -45.4535,
                type: 'private',
                price: 1.80,
                totalSpots: 60,
                availableSpots: 20,
                hours: '07:00 - 19:00',
                features: ['Descoberto', 'Centro Comercial'],
                phone: '(35) 3622-2500'
            },
            {
                id: 'park-prefeitura',
                name: 'Estacionamento Prefeitura',
                address: 'Av. Jerson Dias, 500',
                lat: -22.4245,
                lng: -45.4515,
                type: 'public',
                price: 1.00,
                totalSpots: 100,
                availableSpots: 70,
                hours: '07:00 - 17:00',
                features: ['Descoberto', 'Público'],
                phone: '(35) 3629-1400'
            },
            {
                id: 'park-banco-brasil',
                name: 'Estacionamento Banco do Brasil',
                address: 'Av. Coronel Carneiro Júnior, 300',
                lat: -22.4250,
                lng: -45.4540,
                type: 'private',
                price: 4.00,
                totalSpots: 40,
                availableSpots: 15,
                hours: '08:00 - 16:00',
                features: ['Coberto', 'Segurança', 'Bancário'],
                phone: '(35) 3622-4000'
            }
        ];
        
        this.filteredParkings = [...this.parkingLots];
        
        // Simular mudanças de disponibilidade
        this.startAvailabilityUpdates();
    }

    renderParkingMarkers() {
        // Limpar marcadores existentes
        this.parkingMarkers.forEach(marker => {
            if (this.mapType === 'mapbox') {
                marker.remove();
            } else {
                this.map.removeLayer(marker);
            }
        });
        this.parkingMarkers = [];

        this.filteredParkings.forEach(parking => {
            const availability = parking.availableSpots / parking.totalSpots;
            let color = '#3498db';
            
            if (availability < 0.2) {
                color = '#e74c3c';
            } else if (availability < 0.5) {
                color = '#f39c12';
            }

            const popupContent = `
                <div style="min-width: 200px;">
                    <h4>${parking.name}</h4>
                    <p><strong>Endereço:</strong> ${parking.address}</p>
                    <p><strong>Preço:</strong> ${parking.price === 0 ? 'Gratuito' : `R$ ${parking.price.toFixed(2)}/hora`}</p>
                    <p><strong>Vagas:</strong> ${parking.availableSpots}/${parking.totalSpots} disponíveis</p>
                    <p><strong>Horário:</strong> ${parking.hours}</p>
                    <p><strong>Características:</strong> ${parking.features.join(', ')}</p>
                    <button onclick="getDirections('${parking.id}')" style="background: #3498db; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; margin-top: 5px;">Como Chegar</button>
                </div>
            `;

            if (this.mapType === 'mapbox') {
                const el = document.createElement('div');
                el.className = 'parking-marker';
                el.style.backgroundColor = color;
                el.innerHTML = 'P';

                const marker = new mapboxgl.Marker(el)
                    .setLngLat([parking.lng, parking.lat])
                    .setPopup(new mapboxgl.Popup().setHTML(popupContent))
                    .addTo(this.map);
                
                this.parkingMarkers.push(marker);
            } else {
                const marker = L.circleMarker([parking.lat, parking.lng], {
                    color: color,
                    fillColor: color,
                    fillOpacity: 0.8,
                    radius: 10
                }).addTo(this.map);
                
                marker.bindPopup(popupContent);
                this.parkingMarkers.push(marker);
            }
        });
    }

    startAvailabilityUpdates() {
        setInterval(() => {
            this.parkingLots.forEach(parking => {
                const change = Math.floor(Math.random() * 21) - 10; // -10 a +10
                parking.availableSpots = Math.max(0, Math.min(parking.totalSpots, parking.availableSpots + change));
            });
            
            this.renderParkingMarkers();
            this.updateStats();
            this.renderParkingList();
        }, 15000);
    }





    updateStats() {
        const totalParkings = this.filteredParkings.length;
        const totalAvailableSpots = this.filteredParkings.reduce((sum, p) => sum + p.availableSpots, 0);
        const avgPrice = this.filteredParkings.reduce((sum, p) => sum + p.price, 0) / totalParkings;
        
        document.getElementById('totalSpots').textContent = totalParkings;
        document.getElementById('freeSpots').textContent = totalAvailableSpots;
        document.getElementById('avgPrice').textContent = `R$ ${avgPrice.toFixed(2)}`;
    }

    renderParkingList() {
        const container = document.getElementById('parkingListContainer');
        container.innerHTML = '';
        
        this.filteredParkings.forEach(parking => {
            const availability = parking.availableSpots / parking.totalSpots;
            let availabilityClass = 'high';
            let availabilityText = 'Alta disponibilidade';
            
            if (availability < 0.2) {
                availabilityClass = 'low';
                availabilityText = 'Baixa disponibilidade';
            } else if (availability < 0.5) {
                availabilityClass = 'medium';
                availabilityText = 'Média disponibilidade';
            }
            
            const parkingItem = document.createElement('div');
            parkingItem.className = 'parking-item';
            parkingItem.innerHTML = `
                <div class="parking-header">
                    <div class="parking-name">${parking.name}</div>
                    <div class="parking-price">${parking.price === 0 ? 'Gratuito' : `R$ ${parking.price.toFixed(2)}/h`}</div>
                </div>
                <div class="parking-details">
                    <div class="detail-item">
                        <span>📍</span>
                        <span>${parking.address}</span>
                    </div>
                    <div class="detail-item">
                        <span>🚗</span>
                        <span>${parking.availableSpots}/${parking.totalSpots} vagas</span>
                    </div>
                    <div class="detail-item">
                        <span>🕒</span>
                        <span>${parking.hours}</span>
                    </div>
                    <div class="detail-item">
                        <span>📞</span>
                        <span>${parking.phone}</span>
                    </div>
                </div>
                <div style="margin-bottom: 10px;">
                    <span class="availability ${availabilityClass}">${availabilityText}</span>
                </div>
                <div class="parking-actions">
                    <button class="btn-primary" onclick="showOnMap('${parking.id}')">Ver no Mapa</button>
                    <button class="btn-primary" onclick="getDirections('${parking.id}')">Como Chegar</button>
                    <button class="btn-secondary" onclick="callParking('${parking.phone}')">Ligar</button>
                </div>
            `;
            
            container.appendChild(parkingItem);
        });
    }



    initMap() {
        // Tentar usar Mapbox primeiro
        if (this.isValidMapboxToken(MAPBOX_ACCESS_TOKEN)) {
            this.initMapbox();
        } else {
            console.warn('Token Mapbox inválido, usando OpenStreetMap');
            this.initLeaflet();
        }
    }

    isValidMapboxToken(token) {
        return token && token.startsWith('pk.') && !token.includes('test');
    }

    initMapbox() {
        mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
        
        this.map = new mapboxgl.Map({
            container: 'map',
            style: MAPBOX_STYLES.streets,
            center: [this.itajubaCenter.lng, this.itajubaCenter.lat],
            zoom: 14
        });
        
        this.map.on('load', () => {
            this.renderParkingMarkers();
        });
        
        this.mapType = 'mapbox';
    }

    initLeaflet() {
        this.map = L.map('map', {
            tap: true,
            touchZoom: true,
            zoomControl: true
        }).setView([this.itajubaCenter.lat, this.itajubaCenter.lng], 14);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 18
        }).addTo(this.map);
        
        this.mapType = 'leaflet';
        this.renderParkingMarkers();
    }

    findUserLocation() {
        if (!navigator.geolocation) {
            document.getElementById('userLocation').textContent = 'GPS não suportado';
            return;
        }

        // Vibração para feedback tátil (mobile)
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }

        document.getElementById('userLocation').textContent = 'Localizando...';
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.userPosition = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                this.updateUserMarker();
                this.findNearestParking();
                document.getElementById('userLocation').textContent = 'Localizado';
                
                // Vibração de sucesso
                if (navigator.vibrate) {
                    navigator.vibrate([100, 50, 100]);
                }
            },
            (error) => {
                let errorMsg = 'Erro na localização';
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        errorMsg = 'Acesso negado';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMsg = 'Indisponível';
                        break;
                    case error.TIMEOUT:
                        errorMsg = 'Tempo esgotado';
                        break;
                }
                document.getElementById('userLocation').textContent = errorMsg;
                
                // Vibração de erro
                if (navigator.vibrate) {
                    navigator.vibrate(200);
                }
            },
            { 
                enableHighAccuracy: true, 
                timeout: 15000, 
                maximumAge: 60000 
            }
        );
    }

    updateUserMarker() {
        if (this.userMarker) {
            if (this.mapType === 'mapbox') {
                this.userMarker.remove();
            } else {
                this.map.removeLayer(this.userMarker);
            }
        }

        if (this.mapType === 'mapbox') {
            const el = document.createElement('div');
            el.className = 'user-marker';

            this.userMarker = new mapboxgl.Marker(el)
                .setLngLat([this.userPosition.lng, this.userPosition.lat])
                .setPopup(new mapboxgl.Popup().setHTML('📍 Sua localização'))
                .addTo(this.map);

            this.map.flyTo({
                center: [this.userPosition.lng, this.userPosition.lat],
                zoom: 15
            });
        } else {
            this.userMarker = L.marker([this.userPosition.lat, this.userPosition.lng])
                .addTo(this.map)
                .bindPopup('📍 Sua localização');

            this.map.setView([this.userPosition.lat, this.userPosition.lng], 15);
        }
    }

    findNearestParking() {
        if (!this.userPosition) return;
        
        let nearest = null;
        let minDistance = Infinity;
        
        this.parkingLots.forEach(parking => {
            const distance = this.calculateDistance(
                this.userPosition.lat, this.userPosition.lng,
                parking.lat, parking.lng
            );
            
            if (distance < minDistance) {
                minDistance = distance;
                nearest = parking;
            }
        });
        
        if (nearest) {
            document.getElementById('nearestParking').textContent = 
                `${nearest.name} (${minDistance.toFixed(1)} km)`;
        }
    }

    calculateDistance(lat1, lng1, lat2, lng2) {
        const R = 6371; // Raio da Terra em km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLng = (lng2 - lng1) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng/2) * Math.sin(dLng/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }
    
    applyFilters() {
        const priceFilter = document.getElementById('priceFilter').value;
        const typeFilter = document.getElementById('typeFilter').value;
        
        this.filteredParkings = this.parkingLots.filter(parking => {
            let priceMatch = true;
            let typeMatch = true;
            
            if (priceFilter !== 'all') {
                switch(priceFilter) {
                    case 'low':
                        priceMatch = parking.price <= 3.00;
                        break;
                    case 'medium':
                        priceMatch = parking.price > 3.00 && parking.price <= 5.00;
                        break;
                    case 'high':
                        priceMatch = parking.price > 5.00;
                        break;
                }
            }
            
            if (typeFilter !== 'all') {
                typeMatch = parking.type === typeFilter;
            }
            
            return priceMatch && typeMatch;
        });
        
        this.renderParkingMarkers();
        this.renderParkingList();
        this.updateStats();
    }
    
    searchLocation() {
        const query = document.getElementById('searchInput').value.toLowerCase();
        if (!query) {
            this.filteredParkings = [...this.parkingLots];
        } else {
            this.filteredParkings = this.parkingLots.filter(parking => 
                parking.name.toLowerCase().includes(query) ||
                parking.address.toLowerCase().includes(query)
            );
        }
        
        this.renderParkingMarkers();
        this.renderParkingList();
        this.updateStats();
    }
    
    showOnMap(parkingId) {
        const parking = this.parkingLots.find(p => p.id === parkingId);
        if (parking) {
            if (this.mapType === 'mapbox') {
                this.map.flyTo({
                    center: [parking.lng, parking.lat],
                    zoom: 17
                });
                
                const marker = this.parkingMarkers.find(m => {
                    const lngLat = m.getLngLat();
                    return lngLat.lat === parking.lat && lngLat.lng === parking.lng;
                });
                if (marker) {
                    marker.togglePopup();
                }
            } else {
                this.map.setView([parking.lat, parking.lng], 17);
                
                const marker = this.parkingMarkers.find(m => {
                    const latlng = m.getLatLng();
                    return latlng.lat === parking.lat && latlng.lng === parking.lng;
                });
                if (marker) {
                    marker.openPopup();
                }
            }
        }
    }
    
    getDirections(parkingId) {
        const parking = this.parkingLots.find(p => p.id === parkingId);
        if (parking) {
            const url = `https://www.google.com/maps/dir/?api=1&destination=${parking.lat},${parking.lng}&travelmode=driving`;
            window.open(url, '_blank');
        }
    }
    
    callParking(phone) {
        window.open(`tel:${phone}`);
    }
    
    showNearestParking() {
        if (!this.userPosition) {
            alert('Primeiro permita o acesso à sua localização');
            return;
        }
        
        let nearest = null;
        let minDistance = Infinity;
        
        this.parkingLots.forEach(parking => {
            const distance = this.calculateDistance(
                this.userPosition.lat, this.userPosition.lng,
                parking.lat, parking.lng
            );
            
            if (distance < minDistance) {
                minDistance = distance;
                nearest = parking;
            }
        });
        
        if (nearest) {
            this.showOnMap(nearest.id);
        }
    }
}

// Inicializar o sistema
const itajubaPark = new ItajubaParkSystem();

// Funções globais
function findMyLocation() {
    // Animação do botão
    const icon = document.getElementById('locationIcon');
    icon.style.animation = 'spin 1s linear infinite';
    
    itajubaPark.findUserLocation();
    
    // Parar animação após 3 segundos
    setTimeout(() => {
        icon.style.animation = 'none';
    }, 3000);
}

function showNearestParking() {
    itajubaPark.showNearestParking();
}

function refreshData() {
    itajubaPark.renderParkingMarkers();
    itajubaPark.renderParkingList();
    itajubaPark.updateStats();
}

function searchLocation() {
    itajubaPark.searchLocation();
}

function applyFilters() {
    itajubaPark.applyFilters();
}

function showOnMap(parkingId) {
    itajubaPark.showOnMap(parkingId);
}

function getDirections(parkingId) {
    itajubaPark.getDirections(parkingId);
}

function callParking(phone) {
    itajubaPark.callParking(phone);
}

// Inicializar quando a página carregar
window.onload = function() {
    // Mostrar loading
    document.getElementById('loadingOverlay').style.display = 'flex';
    
    // Inicializar mapa após pequeno delay
    setTimeout(() => {
        itajubaPark.initMap();
        
        // Esconder loading após inicialização
        setTimeout(() => {
            document.getElementById('loadingOverlay').style.display = 'none';
        }, 1000);
    }, 500);
    
    // Adicionar event listeners
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchLocation();
        }
    });
    
    // Detectar se é mobile e ajustar comportamento
    if (window.innerWidth <= 768) {
        // Auto-localizar em mobile após carregar
        setTimeout(() => {
            itajubaPark.findUserLocation();
        }, 2000);
    }
};

// Tornar as funções globalmente acessíveis
window.showOnMap = showOnMap;
window.getDirections = getDirections;
window.callParking = callParking;