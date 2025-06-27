// Scotland Trip Website JavaScript

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
    initializeNavigation();
    initializeCardInteractions();
    initializeWeatherWidgets();
});

// Initialize the interactive map
function initializeMap() {
    // Scotland destinations with coordinates
    const destinations = [
        {
            name: 'Edinburgh',
            lat: 55.9533,
            lng: -3.1883,
            description: 'Scotland\'s historic capital with its iconic castle and Royal Mile',
            dates: 'May 21-24 (3 nights) + May 30 (1 night)',
            highlights: ['🏰 Edinburgh Castle', '👑 Royal Mile', '🏛️ Holyrood Palace']
        },
        {
            name: 'St Andrews',
            lat: 56.3398,
            lng: -2.7967,
            description: 'Historic university town and the home of golf with beautiful coastal scenery',
            dates: 'May 24 (Day Trip)',
            highlights: ['⛳ Golf', '🎓 University', '🏖️ Beaches']
        },
        {
            name: 'Inverness',
            lat: 57.4778,
            lng: -4.2247,
            description: 'The Highland capital, gateway to Loch Ness and the stunning Scottish Highlands',
            dates: 'May 24-26 (2 nights)',
            highlights: ['🏔️ Highlands', '🦕 Loch Ness', '🏰 Culloden Battlefield']
        },
        {
            name: 'Kilmarnock - Boyd Castle',
            lat: 55.6117,
            lng: -4.5019,
            description: 'Historic castle and country park in Kilmarnock with beautiful gardens and rich history',
            dates: 'May 30 (Day Trip)',
            highlights: ['🏰 Castle', '🌳 Country Park', '🏛️ History']
        },
        {
            name: 'Isle of Skye',
            lat: 57.5359,
            lng: -6.2263,
            description: 'Magical island with dramatic landscapes, fairy pools, and the iconic Old Man of Storr',
            dates: 'May 26-29 (3 nights)',
            highlights: ['🧚 Fairy Pools', '👴 Old Man of Storr', '🏔️ Quiraing']
        },
        {
            name: 'Oban',
            lat: 56.4154,
            lng: -5.4719,
            description: 'Seafood capital of Scotland with stunning coastal views and gateway to the islands',
            dates: 'May 29-30 (1 night)',
            highlights: ['🦞 Seafood', '🏝️ Islands', '🌊 Coastal Views']
        },
        {
            name: 'Dean Castle (Boyd Family)',
            lat: 55.6117,
            lng: -4.5019,
            description: 'Historic castle and country park in Kilmarnock with beautiful gardens and rich history',
            dates: 'May 30 (Day Trip)',
            highlights: ['🏰 Castle', '🌳 Country Park', '🏛️ History']
        }
    ];

    // Initialize the map centered on Scotland
    const map = L.map('scotland-map').setView([56.4907, -4.2026], 6);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add markers for each destination
    destinations.forEach(destination => {
        const marker = L.marker([destination.lat, destination.lng])
            .addTo(map)
            .bindPopup(createPopupContent(destination));
        
        // Custom marker styling
        marker.on('add', function() {
            this.getElement().style.filter = 'hue-rotate(200deg)';
        });
    });

    // Create popup content for markers
    function createPopupContent(destination) {
        return `
            <div class="map-popup">
                <h3>${destination.name}</h3>
                <p class="popup-dates">${destination.dates}</p>
                <p>${destination.description}</p>
                <div class="popup-highlights">
                    ${destination.highlights.map(highlight => `<span class="popup-highlight">${highlight}</span>`).join('')}
                </div>
            </div>
        `;
    }
}

// Initialize smooth scrolling navigation
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.main-nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add scroll effect to navigation
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('.main-nav');
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
            nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.boxShadow = 'none';
        }
    });
}

// Initialize destination card interactions
function initializeCardInteractions() {
    const destinationCards = document.querySelectorAll('.destination-card');
    
    destinationCards.forEach(card => {
        card.addEventListener('click', function() {
            const location = this.getAttribute('data-location');
            showLocationDetails(location);
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Show detailed information for a location
function showLocationDetails(location) {
    const locationData = {
        edinburgh: {
            name: 'Edinburgh',
            description: 'Scotland\'s historic capital is a UNESCO World Heritage site with its iconic castle perched on Castle Rock, the Royal Mile connecting the castle to Holyrood Palace, and the stunning Georgian New Town. You\'ll stay here twice - for 3 nights at the start and 1 night before departure.',
            highlights: [
                '🏰 Edinburgh Castle - Iconic fortress with Crown Jewels',
                '👑 Royal Mile - Historic street with shops and attractions',
                '🏛️ Holyrood Palace - Official residence of the British monarch',
                '🎭 Fringe Festival venues (if timing works)',
                '🏔️ Arthur\'s Seat - Hike for panoramic city views'
            ],
            tips: 'Don\'t miss the changing of the guard at the castle, and try haggis at a traditional pub! Perfect for both your initial exploration and final night before flying home.'
        },
        inverness: {
            name: 'Inverness',
            description: 'The Highland capital offers access to Loch Ness, the mysterious home of Nessie, and the dramatic landscapes of the Scottish Highlands.',
            highlights: [
                '🦕 Loch Ness - Search for the legendary monster',
                '🏔️ Scottish Highlands - Dramatic mountain scenery',
                '🏰 Culloden Battlefield - Historic Jacobite battle site',
                '🌊 River Ness - Beautiful river walks',
                '🏛️ Inverness Castle - Overlooking the city'
            ],
            tips: 'Take a boat tour on Loch Ness and visit the nearby Urquhart Castle ruins!'
        },
        skye: {
            name: 'Isle of Skye',
            description: 'This magical island is known for its dramatic landscapes, fairy pools, and the iconic Old Man of Storr rock formation.',
            highlights: [
                '🧚 Fairy Pools - Crystal clear pools and waterfalls',
                '👴 Old Man of Storr - Iconic rock formation',
                '🏔️ Quiraing - Dramatic mountain pass',
                '🏰 Dunvegan Castle - Historic castle and gardens',
                '🌊 Neist Point - Stunning lighthouse and cliffs'
            ],
            tips: 'Weather can change quickly - bring layers and waterproof gear!'
        },
        oban: {
            name: 'Oban',
            description: 'Known as the seafood capital of Scotland, Oban offers fresh seafood, stunning coastal views, and is a gateway to the Hebrides islands.',
            highlights: [
                '🦞 Seafood restaurants - Fresh local catch',
                '🏝️ Island ferries - Gateway to the Hebrides',
                '🌊 Coastal walks - Beautiful sea views',
                '🏰 McCaig\'s Tower - Victorian folly overlooking the bay',
                '🍺 Oban Distillery - Famous whisky production'
            ],
            tips: 'Try the local seafood, especially the famous Oban scallops!'
        },
        'st-andrews': {
            name: 'St Andrews',
            description: 'Historic university town and the home of golf, with beautiful beaches and the oldest university in Scotland. Perfect day trip from Edinburgh.',
            highlights: [
                '⛳ Old Course - The home of golf',
                '🎓 University of St Andrews - Scotland\'s oldest university',
                '🏖️ West Sands Beach - Famous beach from Chariots of Fire',
                '🏰 St Andrews Castle - Historic ruins',
                '⛪ St Andrews Cathedral - Impressive medieval ruins'
            ],
            tips: 'Even if you don\'t golf, the Old Course is worth visiting for its history! Perfect day trip from Edinburgh on May 24.'
        },
        'dean-castle': {
            name: 'Kilmarnock - Boyd Castle',
            description: 'Historic castle and country park in Kilmarnock featuring beautiful gardens, rich history, and family-friendly activities. Also known as Dean Castle.',
            highlights: [
                '🏰 Boyd Castle - Historic 14th-century castle',
                '🌳 Country Park - Beautiful gardens and woodland',
                '🏛️ Museum collections - Arms, armor, and musical instruments',
                '🦚 Peacocks - Free-roaming in the grounds',
                '☕ Tea room - Perfect for refreshments'
            ],
            tips: 'Great for families with children - the peacocks are a highlight! Perfect day trip from Edinburgh on May 30.'
        },
        'kilmarnock-boyd-castle': {
            name: 'Kilmarnock - Boyd Castle',
            description: 'Historic castle and country park in Kilmarnock featuring beautiful gardens, rich history, and family-friendly activities. Also known as Dean Castle.',
            highlights: [
                '🏰 Boyd Castle - Historic 14th-century castle',
                '🌳 Country Park - Beautiful gardens and woodland',
                '🏛️ Museum collections - Arms, armor, and musical instruments',
                '🦚 Peacocks - Free-roaming in the grounds',
                '☕ Tea room - Perfect for refreshments'
            ],
            tips: 'Great for families with children - the peacocks are a highlight! Perfect day trip from Edinburgh on May 30.'
        }
    };

    const data = locationData[location];
    if (data) {
        showModal(data);
    }
}

// Show modal with location details
function showModal(data) {
    // Remove existing modal if present
    const existingModal = document.querySelector('.location-modal');
    if (existingModal) {
        existingModal.remove();
    }

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'location-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <h2>${data.name}</h2>
            <p class="modal-description">${data.description}</p>
            <div class="modal-highlights">
                <h3>Highlights:</h3>
                <ul>
                    ${data.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                </ul>
            </div>
            <div class="modal-tips">
                <h3>Travel Tips:</h3>
                <p>${data.tips}</p>
            </div>
        </div>
    `;

    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .location-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(5px);
        }
        .modal-content {
            background: white;
            border-radius: 20px;
            padding: 2rem;
            max-width: 500px;
            width: 100%;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
            z-index: 1;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        .modal-close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: #666;
        }
        .modal-close:hover {
            color: #333;
        }
        .modal-description {
            margin: 1rem 0;
            line-height: 1.6;
        }
        .modal-highlights ul {
            list-style: none;
            padding: 0;
        }
        .modal-highlights li {
            padding: 0.5rem 0;
            border-bottom: 1px solid #eee;
        }
        .modal-tips {
            margin-top: 1.5rem;
            padding-top: 1.5rem;
            border-top: 2px solid #667eea;
        }
        .modal-tips h3 {
            color: #667eea;
        }
    `;

    document.head.appendChild(style);
    document.body.appendChild(modal);

    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    closeBtn.addEventListener('click', () => modal.remove());
    overlay.addEventListener('click', () => modal.remove());
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modal.remove();
        }
    });
}

// Add some fun animations when the page loads
window.addEventListener('load', function() {
    // Animate destination cards
    const cards = document.querySelectorAll('.destination-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        }, index * 200);
    });
});

// Initialize weather widgets for timeline destinations
function initializeWeatherWidgets() {
    const weatherWidgets = document.querySelectorAll('.weather-widget');
    
    weatherWidgets.forEach(widget => {
        const location = widget.getAttribute('data-location');
        fetchWeatherData(location, widget);
    });
}

// Fetch weather data for a location
async function fetchWeatherData(location, widget) {
    const locationCoords = {
        'edinburgh': { lat: 55.9533, lon: -3.1883 },
        'st-andrews': { lat: 56.3398, lon: -2.7967 },
        'inverness': { lat: 57.4778, lon: -4.2247 },
        'isle-of-skye': { lat: 57.5359, lon: -6.2263 },
        'oban': { lat: 56.4154, lon: -5.4719 },
        'kilmarnock': { lat: 55.6117, lon: -4.5019 }
    };
    
    const coords = locationCoords[location];
    if (!coords) {
        showWeatherError(widget, 'Location not found');
        return;
    }
    
    try {
        // Using OpenWeatherMap API (free tier)
        const apiKey = 'demo'; // You can get a free API key from openweathermap.org
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric`;
        
        // For demo purposes, we'll use mock data since we don't have an API key
        // In production, you would use the actual API call above
        const mockWeatherData = getMockWeatherData(location);
        displayWeatherData(widget, mockWeatherData);
        
    } catch (error) {
        console.error('Error fetching weather:', error);
        showWeatherError(widget, 'Weather unavailable');
    }
}

// Get mock weather data for demo purposes
function getMockWeatherData(location) {
    const weatherData = {
        'edinburgh': { temp: 12, description: 'Partly Cloudy', icon: '⛅' },
        'st-andrews': { temp: 11, description: 'Light Rain', icon: '🌧️' },
        'inverness': { temp: 9, description: 'Misty', icon: '🌫️' },
        'isle-of-skye': { temp: 8, description: 'Cloudy', icon: '☁️' },
        'oban': { temp: 10, description: 'Partly Cloudy', icon: '⛅' },
        'kilmarnock': { temp: 11, description: 'Sunny', icon: '☀️' }
    };
    
    return weatherData[location] || { temp: 10, description: 'Variable', icon: '🌤️' };
}

// Convert Celsius to Fahrenheit
function celsiusToFahrenheit(celsius) {
    return Math.round((celsius * 9/5) + 32);
}

// Display weather data in the widget
function displayWeatherData(widget, data) {
    const tempF = celsiusToFahrenheit(data.temp);
    widget.innerHTML = `
        <div class="weather-content">
            <div class="weather-icon">${data.icon}</div>
            <div class="weather-info">
                <div class="weather-temp">${tempF}°F</div>
                <div class="weather-desc">${data.description}</div>
            </div>
        </div>
    `;
}

// Show weather error
function showWeatherError(widget, message) {
    widget.innerHTML = `<div class="weather-error">${message}</div>`;
}
