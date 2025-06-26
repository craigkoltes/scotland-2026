// Game state
let gameState = {
    isActive: false,
    attempts: 0,
    found: 0,
    startTime: null,
    timer: null,
    needlePosition: { x: 0, y: 0 },
    hayPieces: []
};

// DOM elements
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const haystack = document.getElementById('haystack');
const needle = document.getElementById('needle');
const message = document.getElementById('message');
const attemptsDisplay = document.getElementById('attempts');
const timeDisplay = document.getElementById('time');
const foundDisplay = document.getElementById('found');

// Initialize the game
function init() {
    startBtn.addEventListener('click', startGame);
    resetBtn.addEventListener('click', resetGame);
    haystack.addEventListener('click', handleHaystackClick);
    needle.addEventListener('click', handleNeedleClick);
    
    // Generate initial hay pieces
    generateHayPieces();
    
    // Update displays
    updateDisplays();
}

// Generate hay pieces
function generateHayPieces() {
    haystack.innerHTML = '';
    gameState.hayPieces = [];
    
    const numPieces = 200; // Number of hay pieces
    
    for (let i = 0; i < numPieces; i++) {
        const hayPiece = document.createElement('div');
        hayPiece.className = 'hay-piece';
        
        // Random position within the haystack
        const x = Math.random() * (haystack.offsetWidth - 4);
        const y = Math.random() * (haystack.offsetHeight - 20);
        
        hayPiece.style.left = x + 'px';
        hayPiece.style.top = y + 'px';
        
        // Random rotation
        const rotation = Math.random() * 360;
        hayPiece.style.transform = `rotate(${rotation}deg)`;
        
        haystack.appendChild(hayPiece);
        gameState.hayPieces.push({ element: hayPiece, x, y });
    }
}

// Start the game
function startGame() {
    if (gameState.isActive) return;
    
    gameState.isActive = true;
    gameState.startTime = Date.now();
    gameState.attempts = 0;
    gameState.found = 0;
    
    // Hide the needle initially
    needle.classList.add('hidden');
    
    // Position the needle randomly
    positionNeedle();
    
    // Start timer
    startTimer();
    
    // Update UI
    startBtn.textContent = 'Confidence Builder Active';
    startBtn.disabled = true;
    message.textContent = 'Click anywhere in the haystack to find the needle and build your confidence!';
    message.className = 'message';
    
    updateDisplays();
}

// Position the needle randomly
function positionNeedle() {
    const container = haystack.getBoundingClientRect();
    const needleSize = 24; // Approximate needle size
    
    gameState.needlePosition = {
        x: Math.random() * (container.width - needleSize),
        y: Math.random() * (container.height - needleSize)
    };
    
    needle.style.left = gameState.needlePosition.x + 'px';
    needle.style.top = gameState.needlePosition.y + 'px';
    needle.classList.remove('hidden');
}

// Handle direct needle clicks
function handleNeedleClick(event) {
    if (!gameState.isActive) return;
    
    event.stopPropagation(); // Prevent the haystack click handler from firing
    
    // Found the needle!
    gameState.found++;
    gameState.attempts++;
    needle.classList.add('found');
    
    message.textContent = "You found me! Your confidence is growing! 🎉";
    message.className = 'message success';
    
    // Reposition needle for next round
    setTimeout(() => {
        positionNeedle();
        needle.classList.remove('found');
        message.textContent = 'Excellent! Keep building your confidence - find the next needle!';
    }, 1500);
    
    updateDisplays();
}

// Handle haystack clicks
function handleHaystackClick(event) {
    if (!gameState.isActive) return;
    
    const rect = haystack.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;
    
    gameState.attempts++;
    
    // Check if click is near the needle
    const distance = Math.sqrt(
        Math.pow(clickX - gameState.needlePosition.x, 2) + 
        Math.pow(clickY - gameState.needlePosition.y, 2)
    );
    
    if (distance < 50) { // Increased radius from 30px to 50px for easier finding
        // Found the needle!
        gameState.found++;
        needle.classList.add('found');
        
        message.textContent = "You found me! Your confidence is growing! 🎉";
        message.className = 'message success';
        
        // Reposition needle for next round
        setTimeout(() => {
            positionNeedle();
            needle.classList.remove('found');
            message.textContent = 'Excellent! Keep building your confidence - find the next needle!';
        }, 1500);
        
    } else {
        // Missed
        message.textContent = `Keep searching! Every attempt builds your confidence. Attempts: ${gameState.attempts}`;
        message.className = 'message error';
        
        // Add a visual effect for the miss
        const missEffect = document.createElement('div');
        missEffect.style.position = 'absolute';
        missEffect.style.left = (clickX - 10) + 'px';
        missEffect.style.top = (clickY - 10) + 'px';
        missEffect.style.width = '20px';
        missEffect.style.height = '20px';
        missEffect.style.border = '2px solid #e74c3c';
        missEffect.style.borderRadius = '50%';
        missEffect.style.pointerEvents = 'none';
        missEffect.style.animation = 'fadeOut 1s ease-out forwards';
        
        haystack.appendChild(missEffect);
        
        setTimeout(() => {
            haystack.removeChild(missEffect);
        }, 1000);
    }
    
    updateDisplays();
}

// Start the timer
function startTimer() {
    gameState.timer = setInterval(() => {
        if (gameState.startTime) {
            const elapsed = Date.now() - gameState.startTime;
            const minutes = Math.floor(elapsed / 60000);
            const seconds = Math.floor((elapsed % 60000) / 1000);
            timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }, 1000);
}

// Reset the game
function resetGame() {
    gameState.isActive = false;
    gameState.attempts = 0;
    gameState.found = 0;
    gameState.startTime = null;
    
    if (gameState.timer) {
        clearInterval(gameState.timer);
        gameState.timer = null;
    }
    
    needle.classList.add('hidden');
    needle.classList.remove('found');
    
    startBtn.textContent = 'Start Confidence Builder';
    startBtn.disabled = false;
    message.textContent = '';
    message.className = 'message';
    
    timeDisplay.textContent = '00:00';
    
    updateDisplays();
}

// Update all displays
function updateDisplays() {
    attemptsDisplay.textContent = gameState.attempts;
    foundDisplay.textContent = gameState.found;
}

// Add CSS animation for miss effect
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        0% { opacity: 1; transform: scale(1); }
        100% { opacity: 0; transform: scale(1.5); }
    }
`;
document.head.appendChild(style);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Handle window resize
window.addEventListener('resize', () => {
    if (gameState.isActive) {
        // Regenerate hay pieces and reposition needle on resize
        generateHayPieces();
        positionNeedle();
    }
});
