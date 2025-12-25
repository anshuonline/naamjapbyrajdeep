// Maya Escape - Spiritual Game
// Avoid Maya's illusions and collect Om symbols

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Fullscreen state
let isFullscreen = false;
let canvasContainer = null;

// Mobile touch state
let touchControls = {
    left: false,
    right: false,
    jump: false
};

// Game state
let gameState = {
    isRunning: false,
    isPaused: false,
    score: 0,
    lives: 3,
    level: 1,
    gameSpeed: 1.5,
    highScores: []
};

// Player
const player = {
    x: 100,
    y: canvas.height - 100,
    width: 40,
    height: 40,
    velocityY: 0,
    jumping: false,
    speed: 5
};

// Arrays
let obstacles = [];
let collectibles = [];
let particles = [];

// Keys
const keys = {};

// Colors
const colors = {
    player: '#667eea',
    obstacle: '#ef4444',
    collectible: '#fbbf24',
    ground: '#10b981'
};

// Initialize
function init() {
    loadHighScores();
    updateHighScoresDisplay();
    setupControls();
    loadDarkMode();
}

// Setup controls
function setupControls() {
    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        keys[e.key] = true;
        
        // Prevent spacebar from scrolling the page
        if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            e.preventDefault();
        }
        
        if (e.key === ' ' && gameState.isRunning && !player.jumping) {
            jump();
        }
        
        if (e.key === 'p' || e.key === 'P') {
            togglePause();
        }
        
        if (e.key === 'f' || e.key === 'F') {
            toggleFullscreen();
        }
    });
    
    document.addEventListener('keyup', (e) => {
        keys[e.key] = false;
    });
    
    // Touch controls for mobile
    setupTouchControls();
    
    // Button controls
    document.getElementById('startBtn').addEventListener('click', startGame);
    document.getElementById('pauseBtn').addEventListener('click', togglePause);
    document.getElementById('playAgainBtn').addEventListener('click', resetGame);
    document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);
    document.getElementById('fullscreenBtn').addEventListener('click', toggleFullscreen);
}

// Start game
function startGame() {
    gameState.isRunning = true;
    gameState.score = 0;
    gameState.lives = 3;
    gameState.level = 1;
    gameState.gameSpeed = 1.5;
    
    player.x = 100;
    player.y = canvas.height - 100;
    player.velocityY = 0;
    player.jumping = false;
    
    obstacles = [];
    collectibles = [];
    particles = [];
    
    document.getElementById('startBtn').classList.add('hidden');
    document.getElementById('pauseBtn').classList.remove('hidden');
    document.getElementById('gameOverModal').classList.add('hidden');
    
    gameLoop();
}

// Reset game
function resetGame() {
    document.getElementById('gameOverModal').classList.add('hidden');
    startGame();
}

// Toggle pause
function togglePause() {
    gameState.isPaused = !gameState.isPaused;
    const btn = document.getElementById('pauseBtn');
    btn.textContent = gameState.isPaused ? '▶️ Resume' : '⏸️ Pause';
}

// Jump
function jump() {
    if (!player.jumping) {
        player.velocityY = -15;
        player.jumping = true;
    }
}

// Create obstacle
function createObstacle() {
    const types = ['💰', '😠', '🎭', '😴'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    obstacles.push({
        x: canvas.width,
        y: canvas.height - 80,
        width: 40,
        height: 40,
        emoji: type,
        speed: gameState.gameSpeed
    });
    
    // From level 2+, occasionally spawn double obstacles for extra challenge
    if (gameState.level >= 2 && Math.random() < 0.3) {
        const type2 = types[Math.floor(Math.random() * types.length)];
        obstacles.push({
            x: canvas.width + 80, // Slightly offset
            y: canvas.height - 80,
            width: 40,
            height: 40,
            emoji: type2,
            speed: gameState.gameSpeed
        });
    }
}

// Create collectible
function createCollectible() {
    let collectible;
    
    // Special power-ups only from level 2+
    if (gameState.level >= 2) {
        const rand = Math.random();
        
        if (rand < 0.02) {
            // 🕉️ Om - 10 lives (very rare, medium height)
            collectible = {
                x: canvas.width,
                y: canvas.height - 230, // Medium jump (easier to reach)
                width: 35,
                height: 35,
                emoji: '🕉️',
                lives: 10,
                points: 10,
                speed: gameState.gameSpeed
            };
        } else if (rand < 0.08) {
            // 3️⃣ - 3 lives (uncommon, high)
            collectible = {
                x: canvas.width,
                y: canvas.height - 280, // High jump needed
                width: 32,
                height: 32,
                emoji: '3️⃣',
                lives: 3,
                points: 10,
                speed: gameState.gameSpeed
            };
        } else if (rand < 0.20) {
            // 2️⃣ - 2 lives (common, medium)
            collectible = {
                x: canvas.width,
                y: canvas.height - 220, // Medium jump needed
                width: 30,
                height: 30,
                emoji: '2️⃣',
                lives: 2,
                points: 10,
                speed: gameState.gameSpeed
            };
        } else {
            // 1️⃣ - 1 life (most common, low)
            collectible = {
                x: canvas.width,
                y: Math.random() * (canvas.height - 250 - (canvas.height - 150)) + (canvas.height - 150),
                width: 28,
                height: 28,
                emoji: '1️⃣',
                lives: 1,
                points: 10,
                speed: gameState.gameSpeed
            };
        }
    } else {
        // Level 1 - Only 1️⃣ symbols
        collectible = {
            x: canvas.width,
            y: Math.random() * (canvas.height - 250 - (canvas.height - 150)) + (canvas.height - 150),
            width: 28,
            height: 28,
            emoji: '1️⃣',
            lives: 1,
            points: 10,
            speed: gameState.gameSpeed
        };
    }
    
    collectibles.push(collectible);
}

// Create particle effect
function createParticles(x, y, color) {
    for (let i = 0; i < 10; i++) {
        particles.push({
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 5,
            vy: (Math.random() - 0.5) * 5,
            life: 30,
            color: color
        });
    }
}

// Update particles
function updateParticles() {
    particles.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        
        if (p.life <= 0) {
            particles.splice(index, 1);
        }
    });
}

// Draw particles
function drawParticles() {
    particles.forEach(p => {
        ctx.globalAlpha = p.life / 30;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, 5, 5);
        ctx.globalAlpha = 1;
    });
}

// Update game
function update() {
    if (!gameState.isRunning || gameState.isPaused) return;
    
    // Player movement (keyboard or touch)
    if (keys['ArrowLeft'] || keys['a'] || keys['A'] || touchControls.left) {
        player.x = Math.max(0, player.x - player.speed);
    }
    if (keys['ArrowRight'] || keys['d'] || keys['D'] || touchControls.right) {
        player.x = Math.min(canvas.width - player.width, player.x + player.speed);
    }
    
    // Gravity
    player.velocityY += 0.8;
    player.y += player.velocityY;
    
    // Ground collision
    if (player.y >= canvas.height - 100) {
        player.y = canvas.height - 100;
        player.velocityY = 0;
        player.jumping = false;
    }
    
    // Create obstacles (more frequent from level 2+)
    let obstacleSpawnRate = 0.012; // Default for level 1
    if (gameState.level >= 2) {
        obstacleSpawnRate = 0.025; // Double spawn rate from level 2+
    }
    if (Math.random() < obstacleSpawnRate) {
        createObstacle();
    }
    
    // Create collectibles (increased spawn rate)
    if (Math.random() < 0.015) {
        createCollectible();
    }
    
    // Update obstacles
    obstacles.forEach((obs, index) => {
        obs.x -= obs.speed;
        
        // Remove off-screen obstacles
        if (obs.x + obs.width < 0) {
            obstacles.splice(index, 1);
            gameState.score += 5; // Survived an obstacle
        }
        
        // Collision detection
        if (checkCollision(player, obs)) {
            gameState.lives--;
            createParticles(obs.x, obs.y, '#ef4444');
            obstacles.splice(index, 1);
            
            if (gameState.lives <= 0) {
                gameOver();
            }
        }
    });
    
    // Update collectibles
    collectibles.forEach((col, index) => {
        col.x -= col.speed;
        
        // Remove off-screen collectibles
        if (col.x + col.width < 0) {
            collectibles.splice(index, 1);
        }
        
        // Collection detection
        if (checkCollision(player, col)) {
            gameState.score += col.points;
            // Restore lives based on collectible type (max 50)
            if (gameState.lives < 50) {
                const newLives = gameState.lives + col.lives;
                gameState.lives = Math.min(newLives, 50);
            }
            createParticles(col.x, col.y, '#fbbf24');
            collectibles.splice(index, 1);
            playCollectSound();
        }
    });
    
    // Update particles
    updateParticles();
    
    // Level up (even slower progression - every 300 points instead of 200)
    if (gameState.score > 0 && gameState.score % 300 === 0 && gameState.score !== 0) {
        levelUp();
    }
    
    // Update displays
    updateDisplays();
}

// Check collision
function checkCollision(a, b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}

// Level up
function levelUp() {
    gameState.level++;
    gameState.gameSpeed += 0.08; // Very slow speed increase (was 0.15)
    createParticles(canvas.width / 2, canvas.height / 2, '#10b981');
}

// Draw game
function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#e0e7ff');
    gradient.addColorStop(1, '#c7d2fe');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Ground
    ctx.fillStyle = '#10b981';
    ctx.fillRect(0, canvas.height - 40, canvas.width, 40);
    
    // Draw player (seeker)
    ctx.font = `${player.width}px Arial`;
    ctx.fillText('🧘', player.x, player.y + player.height);
    
    // Draw obstacles (Maya)
    obstacles.forEach(obs => {
        ctx.font = `${obs.width}px Arial`;
        ctx.fillText(obs.emoji, obs.x, obs.y + obs.height);
    });
    
    // Draw collectibles (Om)
    collectibles.forEach(col => {
        ctx.font = `${col.width}px Arial`;
        ctx.fillText(col.emoji, col.x, col.y + col.height);
    });
    
    // Draw particles
    drawParticles();
    
    // Draw game stats on canvas
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 24px Poppins';
    ctx.textAlign = 'left';
    
    // Score
    ctx.fillText(`🎯 Score: ${gameState.score}`, 20, 35);
    
    // Lives
    ctx.fillText(`❤️ Lives: ${gameState.lives}`, 20, 70);
    
    // Level
    ctx.fillText(`🏆 Level: ${gameState.level}`, 20, 105);
    
    ctx.textAlign = 'left';
}

// Game loop
function gameLoop() {
    if (!gameState.isRunning) return;
    
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Update displays
function updateDisplays() {
    document.getElementById('scoreDisplay').textContent = gameState.score;
    document.getElementById('livesDisplay').textContent = gameState.lives;
    document.getElementById('levelDisplay').textContent = gameState.level;
}

// Game over
function gameOver() {
    gameState.isRunning = false;
    
    // Save high score
    saveHighScore(gameState.score);
    
    // Show modal
    document.getElementById('finalScore').textContent = gameState.score;
    document.getElementById('finalLevel').textContent = gameState.level;
    document.getElementById('gameOverModal').classList.remove('hidden');
    document.getElementById('startBtn').classList.remove('hidden');
    document.getElementById('pauseBtn').classList.add('hidden');
    
    updateHighScoresDisplay();
}

// Play collect sound
function playCollectSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
        console.log('Audio not supported');
    }
}

// High scores
function loadHighScores() {
    const saved = localStorage.getItem('mayaEscapeHighScores');
    if (saved) {
        gameState.highScores = JSON.parse(saved);
    }
}

function saveHighScore(score) {
    gameState.highScores.push({
        score: score,
        level: gameState.level,
        date: new Date().toISOString()
    });
    
    // Sort and keep top 5
    gameState.highScores.sort((a, b) => b.score - a.score);
    gameState.highScores = gameState.highScores.slice(0, 5);
    
    localStorage.setItem('mayaEscapeHighScores', JSON.stringify(gameState.highScores));
}

function updateHighScoresDisplay() {
    const list = document.getElementById('highScoresList');
    
    if (gameState.highScores.length === 0) {
        list.innerHTML = '<p class="text-gray-600 dark:text-gray-300 text-center">Play to set your first score!</p>';
        return;
    }
    
    list.innerHTML = gameState.highScores.map((hs, i) => `
        <div class="flex justify-between items-center bg-purple-50 dark:bg-purple-900/30 rounded-lg p-3">
            <div class="flex items-center gap-3">
                <span class="text-2xl">${i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '🏆'}</span>
                <div>
                    <p class="font-bold text-gray-800 dark:text-white">${hs.score} points</p>
                    <p class="text-xs text-gray-600 dark:text-gray-300">Level ${hs.level} • ${new Date(hs.date).toLocaleDateString()}</p>
                </div>
            </div>
        </div>
    `).join('');
}

// Dark mode
function loadDarkMode() {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'true') {
        document.documentElement.classList.add('dark');
        updateDarkModeIcons(true);
    } else {
        updateDarkModeIcons(false);
    }
}

function toggleDarkMode() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', isDark);
    updateDarkModeIcons(isDark);
}

function updateDarkModeIcons(isDark) {
    const sunIcon = document.getElementById('sunIcon');
    const moonIcon = document.getElementById('moonIcon');
    
    if (isDark) {
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    } else {
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    }
}

// Initialize on load
window.addEventListener('DOMContentLoaded', init);

// Fullscreen functions
function toggleFullscreen() {
    canvasContainer = document.getElementById('canvasContainer');
    const fullscreenIcon = document.getElementById('fullscreenIcon');
    const exitFullscreenIcon = document.getElementById('exitFullscreenIcon');
    
    if (!isFullscreen) {
        // Enter fullscreen
        if (canvasContainer.requestFullscreen) {
            canvasContainer.requestFullscreen();
        } else if (canvasContainer.webkitRequestFullscreen) {
            canvasContainer.webkitRequestFullscreen();
        } else if (canvasContainer.mozRequestFullScreen) {
            canvasContainer.mozRequestFullScreen();
        } else if (canvasContainer.msRequestFullscreen) {
            canvasContainer.msRequestFullscreen();
        }
        
        canvasContainer.classList.add('active');
        fullscreenIcon.classList.add('hidden');
        exitFullscreenIcon.classList.remove('hidden');
        isFullscreen = true;
        
        // Resize canvas for fullscreen
        resizeCanvas();
    } else {
        // Exit fullscreen
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        
        canvasContainer.classList.remove('active');
        fullscreenIcon.classList.remove('hidden');
        exitFullscreenIcon.classList.add('hidden');
        isFullscreen = false;
        
        // Reset canvas size
        canvas.width = 800;
        canvas.height = 500;
    }
}

// Resize canvas for fullscreen
function resizeCanvas() {
    if (!isFullscreen) return;
    
    const maxWidth = window.innerWidth - 40;
    const maxHeight = window.innerHeight - 40;
    const aspectRatio = 800 / 500;
    
    let newWidth = maxWidth;
    let newHeight = newWidth / aspectRatio;
    
    if (newHeight > maxHeight) {
        newHeight = maxHeight;
        newWidth = newHeight * aspectRatio;
    }
    
    canvas.style.width = newWidth + 'px';
    canvas.style.height = newHeight + 'px';
}

// Listen for fullscreen changes
document.addEventListener('fullscreenchange', handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
document.addEventListener('mozfullscreenchange', handleFullscreenChange);
document.addEventListener('MSFullscreenChange', handleFullscreenChange);

function handleFullscreenChange() {
    if (!document.fullscreenElement && 
        !document.webkitFullscreenElement && 
        !document.mozFullScreenElement && 
        !document.msFullscreenElement) {
        // Exited fullscreen
        const canvasContainer = document.getElementById('canvasContainer');
        const fullscreenIcon = document.getElementById('fullscreenIcon');
        const exitFullscreenIcon = document.getElementById('exitFullscreenIcon');
        
        canvasContainer.classList.remove('active');
        fullscreenIcon.classList.remove('hidden');
        exitFullscreenIcon.classList.add('hidden');
        isFullscreen = false;
        
        canvas.width = 800;
        canvas.height = 500;
        canvas.style.width = '';
        canvas.style.height = '';
    }
}

// Setup touch controls for mobile
function setupTouchControls() {
    const moveLeftBtn = document.getElementById('moveLeftBtn');
    const moveRightBtn = document.getElementById('moveRightBtn');
    const jumpBtn = document.getElementById('jumpBtn');
    
    // Left button
    moveLeftBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        touchControls.left = true;
    });
    moveLeftBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        touchControls.left = false;
    });
    
    // Right button
    moveRightBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        touchControls.right = true;
    });
    moveRightBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        touchControls.right = false;
    });
    
    // Jump button
    jumpBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        if (gameState.isRunning && !player.jumping) {
            jump();
        }
    });
    
    // Also support mouse for testing
    moveLeftBtn.addEventListener('mousedown', () => touchControls.left = true);
    moveLeftBtn.addEventListener('mouseup', () => touchControls.left = false);
    moveRightBtn.addEventListener('mousedown', () => touchControls.right = true);
    moveRightBtn.addEventListener('mouseup', () => touchControls.right = false);
    jumpBtn.addEventListener('mousedown', () => {
        if (gameState.isRunning && !player.jumping) jump();
    });
}

// Resize canvas on window resize
window.addEventListener('resize', () => {
    if (isFullscreen) {
        resizeCanvas();
    }
});
