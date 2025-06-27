// Confidence Builder Game
class ConfidenceBuilder {
    constructor() {
        this.attempts = 0;
        this.found = 0;
        this.startTime = null;
        this.timer = null;
        this.gameActive = false;
        this.needlePosition = { x: 0, y: 0 };
        
        // DOM elements
        this.attemptsElement = document.getElementById('attempts');
        this.timeElement = document.getElementById('time');
        this.foundElement = document.getElementById('found');
        this.startBtn = document.getElementById('startBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.messageElement = document.getElementById('message');
        this.haystackElement = document.getElementById('haystack');
        this.needleElement = document.getElementById('needle');
        
        this.initializeEventListeners();
        this.updateDisplay();
    }
    
    initializeEventListeners() {
        this.startBtn.addEventListener('click', () => this.startGame());
        this.resetBtn.addEventListener('click', () => this.resetGame());
        this.needleElement.addEventListener('click', () => this.findNeedle());
        this.haystackElement.addEventListener('click', (e) => this.handleHaystackClick(e));
    }
    
    startGame() {
        if (this.gameActive) return;
        
        this.gameActive = true;
        this.startTime = Date.now();
        this.startBtn.textContent = 'Game Active';
        this.startBtn.disabled = true;
        this.messageElement.textContent = 'Find the needle in the haystack!';
        this.messageElement.className = 'message';
        
        this.generateHaystack();
        this.hideNeedle();
        this.startTimer();
        
        // Add some delay before showing the needle
        setTimeout(() => {
            this.showNeedle();
        }, 1000);
    }
    
    resetGame() {
        this.gameActive = false;
        this.attempts = 0;
        this.found = 0;
        this.startTime = null;
        this.stopTimer();
        
        this.startBtn.textContent = 'Start Confidence Builder';
        this.startBtn.disabled = false;
        this.messageElement.textContent = '';
        this.messageElement.className = 'message';
        
        this.hideNeedle();
        this.clearHaystack();
        this.updateDisplay();
    }
    
    generateHaystack() {
        this.clearHaystack();
        
        // Generate random hay pieces
        const hayCount = 150 + Math.floor(Math.random() * 100);
        
        for (let i = 0; i < hayCount; i++) {
            const hayPiece = document.createElement('div');
            hayPiece.className = 'hay-piece';
            hayPiece.style.left = Math.random() * 100 + '%';
            hayPiece.style.top = Math.random() * 100 + '%';
            hayPiece.style.transform = `rotate(${Math.random() * 360}deg)`;
            hayPiece.style.animationDelay = Math.random() * 3 + 's';
            
            this.haystackElement.appendChild(hayPiece);
        }
    }
    
    clearHaystack() {
        this.haystackElement.innerHTML = '';
    }
    
    showNeedle() {
        if (!this.gameActive) return;
        
        const container = this.haystackElement.getBoundingClientRect();
        const maxX = container.width - 60;
        const maxY = container.height - 60;
        
        this.needlePosition = {
            x: Math.random() * maxX,
            y: Math.random() * maxY
        };
        
        this.needleElement.style.left = this.needlePosition.x + 'px';
        this.needleElement.style.top = this.needlePosition.y + 'px';
        this.needleElement.classList.remove('hidden');
    }
    
    hideNeedle() {
        this.needleElement.classList.add('hidden');
    }
    
    findNeedle() {
        if (!this.gameActive) return;
        
        this.found++;
        this.gameActive = false;
        this.stopTimer();
        
        const timeElapsed = this.getTimeElapsed();
        const timeString = this.formatTime(timeElapsed);
        
        this.needleElement.classList.add('found');
        this.messageElement.textContent = `🎉 Congratulations! You found the needle in ${timeString}! Your confidence is growing!`;
        this.messageElement.className = 'message success';
        
        this.startBtn.textContent = 'Start Confidence Builder';
        this.startBtn.disabled = false;
        
        this.updateDisplay();
        
        // Reset needle after a delay
        setTimeout(() => {
            this.needleElement.classList.remove('found');
            this.hideNeedle();
        }, 2000);
    }
    
    handleHaystackClick(e) {
        if (!this.gameActive) return;
        
        this.attempts++;
        this.updateDisplay();
        
        // Check if click is near the needle
        const clickX = e.clientX - this.haystackElement.getBoundingClientRect().left;
        const clickY = e.clientY - this.haystackElement.getBoundingClientRect().top;
        
        const distance = Math.sqrt(
            Math.pow(clickX - this.needlePosition.x, 2) + 
            Math.pow(clickY - this.needlePosition.y, 2)
        );
        
        if (distance > 50) {
            this.messageElement.textContent = 'Keep looking! The needle is somewhere in the haystack.';
            this.messageElement.className = 'message error';
            
            // Clear message after 2 seconds
            setTimeout(() => {
                if (this.gameActive) {
                    this.messageElement.textContent = 'Find the needle in the haystack!';
                    this.messageElement.className = 'message';
                }
            }, 2000);
        }
    }
    
    startTimer() {
        this.timer = setInterval(() => {
            this.updateDisplay();
        }, 1000);
    }
    
    stopTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }
    
    getTimeElapsed() {
        if (!this.startTime) return 0;
        return Date.now() - this.startTime;
    }
    
    formatTime(milliseconds) {
        const seconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        
        if (minutes > 0) {
            return `${minutes}m ${remainingSeconds}s`;
        } else {
            return `${remainingSeconds}s`;
        }
    }
    
    updateDisplay() {
        this.attemptsElement.textContent = this.attempts;
        this.foundElement.textContent = this.found;
        
        if (this.gameActive && this.startTime) {
            const timeElapsed = this.getTimeElapsed();
            this.timeElement.textContent = this.formatTime(timeElapsed);
        } else {
            this.timeElement.textContent = '00:00';
        }
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ConfidenceBuilder();
});

// Add some additional interactive features
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effects for better user experience
    const haystackContainer = document.querySelector('.haystack-container');
    
    haystackContainer.addEventListener('mouseenter', () => {
        if (document.querySelector('.needle:not(.hidden)')) {
            haystackContainer.style.cursor = 'pointer';
        }
    });
    
    haystackContainer.addEventListener('mouseleave', () => {
        haystackContainer.style.cursor = 'crosshair';
    });
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const startBtn = document.getElementById('startBtn');
            if (!startBtn.disabled) {
                startBtn.click();
            }
        }
        
        if (e.key === 'r' || e.key === 'R') {
            const resetBtn = document.getElementById('resetBtn');
            resetBtn.click();
        }
    });
    
    // Add some motivational messages
    const motivationalMessages = [
        "Every attempt builds your confidence!",
        "You're getting closer with each try!",
        "Focus and persistence lead to success!",
        "Your determination is impressive!",
        "Keep going - you've got this!",
        "Each challenge makes you stronger!",
        "Success is just around the corner!",
        "Your confidence is growing with every search!"
    ];
    
    // Show random motivational message every 10 seconds during active game
    setInterval(() => {
        const gameActive = document.querySelector('#startBtn').disabled;
        const messageElement = document.getElementById('message');
        
        if (gameActive && messageElement.textContent.includes('Find the needle')) {
            const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
            messageElement.textContent = randomMessage;
            
            // Reset to original message after 3 seconds
            setTimeout(() => {
                if (gameActive) {
                    messageElement.textContent = 'Find the needle in the haystack!';
                }
            }, 3000);
        }
    }, 10000);
});
