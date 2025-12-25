// Naam Jaap Application
// All data stored in browser's localStorage

// Global State
let userData = {
    userName: '',
    ishtName: '',
    totalCount: 0,
    todayCount: 0,
    monthCount: 0,
    lastCountDate: '',
    lastCountMonth: '',
    createdAt: '',
    lastUpdated: '',
    currentChallenge: 108,
    challengeLevel: 1
};

let soundEnabled = true;
let vibrationEnabled = true;
let nameRainEnabled = true; // Name raining effect toggle
let selectedKey = 'Enter'; // Default keyboard shortcut

// Cooldown to prevent fast counting
let isCountingAllowed = true;
const COOLDOWN_TIME = 100; // 0.1 second cooldown between counts

// Audio Context for sound
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// DOM Elements
const setupScreen = document.getElementById('setupScreen');
const jaapScreen = document.getElementById('jaapScreen');

// Setup elements
const userNameInput = document.getElementById('userNameInput');
const ishtNameInput = document.getElementById('ishtNameInput');
const startBtn = document.getElementById('startBtn');
const setupError = document.getElementById('setupError');

// Jaap elements
const displayUserName = document.getElementById('displayUserName');
const displayIshtName = document.getElementById('displayIshtName');
const counterDisplay = document.getElementById('counterDisplay');
const jaapBtn = document.getElementById('jaapBtn');
const todayCount = document.getElementById('todayCount');
const monthCount = document.getElementById('monthCount');
const lastUpdate = document.getElementById('lastUpdate');

// Control buttons
const soundToggleBtn = document.getElementById('soundToggleBtn');
const soundStatus = document.getElementById('soundStatus');
const vibrationToggleBtn = document.getElementById('vibrationToggleBtn');
const vibrationStatus = document.getElementById('vibrationStatus');
const nameRainToggleBtn = document.getElementById('nameRainToggleBtn');
const nameRainStatus = document.getElementById('nameRainStatus');
const keyboardShortcutBtn = document.getElementById('keyboardShortcutBtn');
const selectedKeyDisplay = document.getElementById('selectedKeyDisplay');
const resetCountBtn = document.getElementById('resetCountBtn');
const resetUserBtn = document.getElementById('resetUserBtn');
const exportBtn = document.getElementById('exportBtn');
const importBtn = document.getElementById('importBtn');

// Mala elements
const malaBeadsContainer = document.getElementById('malaBeads');
const malaProgress = document.getElementById('malaProgress');
const malaCount = document.getElementById('malaCount');

// Live activity elements
const liveUsersEl = document.getElementById('liveUsers');
const totalMalasGlobalEl = document.getElementById('totalMalasGlobal');
const totalChantsGlobalEl = document.getElementById('totalChantsGlobal');
const onlineNowEl = document.getElementById('onlineNow');
const activeMalasEl = document.getElementById('activeMalas');
const completedTodayEl = document.getElementById('completedToday');
const streakUsersEl = document.getElementById('streakUsers');

// Modals
const resetModal = document.getElementById('resetModal');
const cancelResetBtn = document.getElementById('cancelResetBtn');
const confirmResetBtn = document.getElementById('confirmResetBtn');
const importModal = document.getElementById('importModal');
const importFileInput = document.getElementById('importFileInput');
const cancelImportBtn = document.getElementById('cancelImportBtn');
const confirmImportBtn = document.getElementById('confirmImportBtn');
const importError = document.getElementById('importError');
const keyboardModal = document.getElementById('keyboardModal');
const closeKeyboardModal = document.getElementById('closeKeyboardModal');
const darkModeToggle = document.getElementById('darkModeToggle');
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');

// Challenge elements
const challengeLevel = document.getElementById('challengeLevel');
const currentGoal = document.getElementById('currentGoal');
const progressBar = document.getElementById('progressBar');
const progressPercent = document.getElementById('progressPercent');
const currentProgress = document.getElementById('currentProgress');
const targetProgress = document.getElementById('targetProgress');
const congratsModal = document.getElementById('congratsModal');
const completedGoal = document.getElementById('completedGoal');
const nextGoal = document.getElementById('nextGoal');
const closeCongrats = document.getElementById('closeCongrats');

// Initialize app
function init() {
    loadSettings();
    loadUserData();
    loadDarkMode();
    initializeMala();
    startLiveActivityCounter();
    
    if (userData.userName && userData.ishtName) {
        showScreen('jaap');
        updateDisplay();
    } else {
        showScreen('setup');
    }
}

// Screen Management
function showScreen(screen) {
    setupScreen.classList.add('hidden');
    jaapScreen.classList.add('hidden');
    
    if (screen === 'setup') {
        setupScreen.classList.remove('hidden');
    } else if (screen === 'jaap') {
        jaapScreen.classList.remove('hidden');
    }
}

// LocalStorage Functions
function saveUserData() {
    try {
        localStorage.setItem('naamJaapData', JSON.stringify(userData));
        updateLastUpdateTime();
    } catch (error) {
        console.error('Error saving data:', error);
        alert('डेटा सेव करने में त्रुटि!');
    }
}

function loadUserData() {
    try {
        const saved = localStorage.getItem('naamJaapData'); 
        if (saved) {
            userData = JSON.parse(saved);
            checkAndResetCounters();
        }
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

function saveSettings() {
    localStorage.setItem('soundEnabled', soundEnabled);
    localStorage.setItem('vibrationEnabled', vibrationEnabled);
    localStorage.setItem('nameRainEnabled', nameRainEnabled);
    localStorage.setItem('selectedKey', selectedKey);
}

function loadSettings() {
    const savedSound = localStorage.getItem('soundEnabled');
    const savedVibration = localStorage.getItem('vibrationEnabled');
    const savedNameRain = localStorage.getItem('nameRainEnabled');
    const savedKey = localStorage.getItem('selectedKey');
    
    if (savedSound !== null) soundEnabled = savedSound === 'true';
    if (savedVibration !== null) vibrationEnabled = savedVibration === 'true';
    if (savedNameRain !== null) nameRainEnabled = savedNameRain === 'true';
    if (savedKey !== null) selectedKey = savedKey;
    
    updateSettingsDisplay();
}

function updateSettingsDisplay() {
    soundStatus.textContent = soundEnabled ? 'ON' : 'OFF';
    vibrationStatus.textContent = vibrationEnabled ? 'ON' : 'OFF';
    nameRainStatus.textContent = nameRainEnabled ? 'ON' : 'OFF';
    selectedKeyDisplay.textContent = getKeyDisplayName(selectedKey);
}

// Check and reset daily/monthly counters
function checkAndResetCounters() {
    const today = new Date().toISOString().split('T')[0];
    const currentMonth = new Date().toISOString().substring(0, 7);
    
    // Reset today count if new day
    if (userData.lastCountDate !== today) {
        userData.todayCount = 0;
        userData.lastCountDate = today;
    }
    
    // Reset month count if new month
    if (userData.lastCountMonth !== currentMonth) {
        userData.monthCount = 0;
        userData.lastCountMonth = currentMonth;
    }
}

// Setup Screen Handler
startBtn.addEventListener('click', () => {
    const userName = userNameInput.value.trim();
    const ishtName = ishtNameInput.value.trim();
    
    if (!userName || !ishtName) {
        showError(setupError, 'Please fill all fields');
        return;
    }
    
    // Initialize user data
    const now = new Date().toISOString();
    userData = {
        userName: userName,
        ishtName: ishtName,
        totalCount: 0,
        todayCount: 0,
        monthCount: 0,
        lastCountDate: new Date().toISOString().split('T')[0],
        lastCountMonth: new Date().toISOString().substring(0, 7),
        createdAt: now,
        lastUpdated: now,
        currentChallenge: 108,
        challengeLevel: 1
    };
    
    saveUserData();
    showScreen('jaap');
    updateDisplay();
});

// Display Functions
function updateDisplay() {
    displayUserName.textContent = userData.userName;
    displayIshtName.textContent = userData.ishtName;
    updateCounterDisplay(userData.totalCount);
    updateMalaDisplay(userData.totalCount);
    todayCount.textContent = userData.todayCount.toLocaleString('en-US');
    monthCount.textContent = userData.monthCount.toLocaleString('en-US');
    
    // Update background watermark name
    const backgroundName = document.querySelector('#backgroundName p');
    if (backgroundName) {
        backgroundName.textContent = userData.ishtName;
    }
    
    // Update challenge progress
    updateChallengeProgress();
}

function updateCounterDisplay(count) {
    // Display normal number with commas
    counterDisplay.textContent = count.toLocaleString('en-US');
    counterDisplay.classList.add('pulse-count');
    setTimeout(() => {
        counterDisplay.classList.remove('pulse-count');
    }, 300);
}

function updateLastUpdateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    lastUpdate.textContent = `${hours}:${minutes}`;
}

// Naam Jaap Button Handler
jaapBtn.addEventListener('click', () => {
    // Check if counting is allowed (cooldown check)
    if (!isCountingAllowed) {
        return; // Ignore clicks during cooldown
    }
    
    // Disable counting temporarily
    isCountingAllowed = false;
    
    // Realistic press animation
    jaapBtn.classList.add('pressing');
    
    // Create press wave effect
    const wave = document.createElement('div');
    wave.className = 'press-wave';
    jaapBtn.appendChild(wave);
    
    // Remove wave after animation
    setTimeout(() => {
        wave.remove();
    }, 600);
    
    // Release press effect
    setTimeout(() => {
        jaapBtn.classList.remove('pressing');
    }, 150);
    
    // Play sound
    if (soundEnabled) {
        playBeep();
    }
    
    // Vibrate
    if (vibrationEnabled && 'vibrate' in navigator) {
        navigator.vibrate(50);
    }
    
    // Create name drop animation (only if enabled)
    if (nameRainEnabled) {
        createNameDrop();
    }
    
    // Increment counters
    userData.totalCount++;
    userData.todayCount++;
    userData.monthCount++;
    userData.lastUpdated = new Date().toISOString();
    
    // Check if challenge completed
    checkChallengeCompletion();
    
    // Update display
    updateDisplay();
    
    // Save to localStorage
    saveUserData();
    
    // Re-enable counting after cooldown
    setTimeout(() => {
        isCountingAllowed = true;
    }, COOLDOWN_TIME);
});

// Sound Function
function playBeep() {
    try {
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
    } catch (error) {
        console.error('Sound error:', error);
    }
}

// Settings Toggles
soundToggleBtn.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    updateSettingsDisplay();
    saveSettings();
    if (soundEnabled) playBeep();
});

vibrationToggleBtn.addEventListener('click', () => {
    vibrationEnabled = !vibrationEnabled;
    updateSettingsDisplay();
    saveSettings();
    if (vibrationEnabled && 'vibrate' in navigator) {
        navigator.vibrate(50);
    }
});

nameRainToggleBtn.addEventListener('click', () => {
    nameRainEnabled = !nameRainEnabled;
    updateSettingsDisplay();
    saveSettings();
});

// Keyboard Shortcut Button Handler
keyboardShortcutBtn.addEventListener('click', () => {
    keyboardModal.classList.remove('hidden');
});

closeKeyboardModal.addEventListener('click', () => {
    keyboardModal.classList.add('hidden');
});

// Key selection handlers
function selectKey(key) {
    selectedKey = key;
    updateSettingsDisplay();
    saveSettings();
    keyboardModal.classList.add('hidden');
}

// Helper function to get display name for keys
function getKeyDisplayName(key) {
    const keyNames = {
        'Enter': 'Enter',
        'Space': 'Space',
        'KeyA': 'A',
        'KeyS': 'S',
        'KeyD': 'D',
        'KeyJ': 'J',
        'KeyK': 'K',
        'KeyL': 'L',
        'Digit0': '0',
        'Digit1': '1',
        'Digit2': '2',
        'Digit3': '3',
        'Digit4': '4',
        'Digit5': '5',
        'ArrowUp': '↑',
        'ArrowDown': '↓',
        'ArrowLeft': '←',
        'ArrowRight': '→'
    };
    return keyNames[key] || key;
}

// Reset Counter Handler
resetCountBtn.addEventListener('click', () => {
    resetModal.classList.remove('hidden');
});

cancelResetBtn.addEventListener('click', () => {
    resetModal.classList.add('hidden');
});

confirmResetBtn.addEventListener('click', () => {
    userData.totalCount = 0;
    userData.todayCount = 0;
    userData.monthCount = 0;
    userData.currentChallenge = 108;
    userData.challengeLevel = 1;
    userData.lastUpdated = new Date().toISOString();
    
    updateDisplay();
    saveUserData();
    resetModal.classList.add('hidden');
});

// Reset User Handler
resetUserBtn.addEventListener('click', () => {
    if (confirm('Do you want to start with a new user? All data will be deleted!')) {
        localStorage.removeItem('naamJaapData');
        userNameInput.value = '';
        ishtNameInput.value = '';
        showScreen('setup');
    }
});

// Export Data Handler
exportBtn.addEventListener('click', () => {
    try {
        const dataStr = JSON.stringify(userData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(dataBlob);
        downloadLink.download = `naam-jaap-data-${new Date().toISOString().split('T')[0]}.json`;
        downloadLink.click();
        
        alert('✅ Data exported! File is downloading.');
    } catch (error) {
        console.error('Export error:', error);
        alert('❌ Export error!');
    }
});

// Import Data Handler
importBtn.addEventListener('click', () => {
    importModal.classList.remove('hidden');
    importFileInput.value = '';
    importError.classList.add('hidden');
});

cancelImportBtn.addEventListener('click', () => {
    importModal.classList.add('hidden');
});

confirmImportBtn.addEventListener('click', () => {
    const file = importFileInput.files[0];
    
    if (!file) {
        showError(importError, 'Please choose a file');
        return;
    }
    
    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);
            
            // Validate data
            if (!importedData.userName || !importedData.ishtName) {
                showError(importError, 'Invalid data file!');
                return;
            }
            
            // Confirm import
            if (confirm(`Import ${importedData.userName}'s data? Current data will be replaced.`)) {
                userData = importedData;
                checkAndResetCounters();
                saveUserData();
                updateDisplay();
                importModal.classList.add('hidden');
                alert('✅ Data imported successfully!');
            }
        } catch (error) {
            console.error('Import error:', error);
            showError(importError, 'Error reading file! Choose correct JSON file.');
        }
    };
    
    reader.readAsText(file);
});

// Error Display Helper
function showError(element, message) {
    element.textContent = message;
    element.classList.remove('hidden');
    setTimeout(() => {
        element.classList.add('hidden');
    }, 5000);
}

// Keyboard Shortcuts - Enter key for single count (no auto-repeat)
let enterKeyPressed = false;

document.addEventListener('keydown', (e) => {
    // Selected key to increment counter (only on jaap screen, no auto-repeat)
    if (e.code === selectedKey && !jaapScreen.classList.contains('hidden') && !enterKeyPressed) {
        e.preventDefault();
        enterKeyPressed = true;
        jaapBtn.click();
    }
});

document.addEventListener('keyup', (e) => {
    // Reset key flag when released
    if (e.code === selectedKey) {
        enterKeyPressed = false;
    }
});

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    init();
});

// Auto-save before page unload
window.addEventListener('beforeunload', () => {
    if (userData.userName) {
        saveUserData();
    }
});

// Dark Mode Functions
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
    if (isDark) {
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    } else {
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    }
}

// Dark Mode Toggle Event
darkModeToggle.addEventListener('click', toggleDarkMode);

// Name Drop Animation Function
function createNameDrop() {
    // Create a div element for the dropping name
    const nameElement = document.createElement('div');
    nameElement.classList.add('name-drop');
    nameElement.textContent = userData.ishtName;
    
    // Random horizontal position (avoid edges)
    const randomX = Math.random() * (window.innerWidth - 200) + 50;
    nameElement.style.left = randomX + 'px';
    nameElement.style.top = '-50px'; // Start above viewport
    
    // Add slight random rotation and color variation
    const colors = ['#7c3aed', '#a855f7', '#c084fc', '#e9d5ff'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    nameElement.style.color = randomColor;
    
    // Add to body
    document.body.appendChild(nameElement);
    
    // Remove element after animation completes
    setTimeout(() => {
        nameElement.remove();
    }, 2000);
}

// Challenge Progress Functions
function updateChallengeProgress() {
    // Initialize challenge if not set
    if (!userData.currentChallenge) {
        userData.currentChallenge = 108;
        userData.challengeLevel = 1;
    }
    
    // Calculate progress
    const progress = userData.totalCount % userData.currentChallenge;
    const percentage = (progress / userData.currentChallenge) * 100;
    
    // Update UI
    challengeLevel.textContent = `Level ${userData.challengeLevel}`;
    currentGoal.textContent = userData.currentChallenge.toLocaleString();
    targetProgress.textContent = userData.currentChallenge.toLocaleString();
    currentProgress.textContent = progress.toLocaleString();
    
    // Update progress bar
    progressBar.style.width = `${Math.min(percentage, 100)}%`;
    progressPercent.textContent = `${Math.floor(percentage)}%`;
}

function checkChallengeCompletion() {
    if (userData.totalCount > 0 && userData.totalCount % userData.currentChallenge === 0) {
        // Challenge completed!
        showCongratulations();
        
        // Move to next challenge (double the goal)
        userData.currentChallenge *= 2;
        userData.challengeLevel++;
    }
}

function showCongratulations() {
    const completedChallenge = userData.currentChallenge;
    const nextChallenge = userData.currentChallenge * 2;
    
    completedGoal.textContent = completedChallenge.toLocaleString();
    nextGoal.textContent = nextChallenge.toLocaleString();
    
    congratsModal.classList.remove('hidden');
    
    // Play celebration sound
    if (soundEnabled) {
        playCelebrationSound();
    }
    
    // Vibrate celebration pattern
    if (vibrationEnabled && 'vibrate' in navigator) {
        navigator.vibrate([100, 50, 100, 50, 100]);
    }
}

function playCelebrationSound() {
    try {
        const notes = [523, 659, 784, 1047]; // C, E, G, High C
        let delay = 0;
        
        notes.forEach((freq, index) => {
            setTimeout(() => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.value = freq;
                oscillator.type = 'sine';
                
                gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.3);
            }, delay);
            delay += 150;
        });
    } catch (error) {
        console.error('Celebration sound error:', error);
    }
}

// Close congratulations modal
closeCongrats.addEventListener('click', () => {
    congratsModal.classList.add('hidden');
});

// Live Activity Fake Counter System
let liveActivityData = {
    liveUsers: 124847,        // 1.24 Lakh users chanting
    totalMalas: 458932,       // 4.58 Lakh malas completed today
    totalChants: 49564656,    // 4.95 Crore chants (malas * 108)
    onlineNow: 245678,        // 2.45 Lakh online
    activeMalas: 8932,        // 8932 malas in progress
    completedToday: 56789,    // 56k completed 108+
    streakUsers: 12345        // 12k on streak
};

function startLiveActivityCounter() {
    // Update every 2-4 seconds with random increments
    setInterval(() => {
        // Live users chanting: 1-2 lakh range
        const userChange = Math.random() > 0.5 ? Math.floor(Math.random() * 200) + 50 : -Math.floor(Math.random() * 150);
        liveActivityData.liveUsers = Math.max(100000, Math.min(200000, liveActivityData.liveUsers + userChange));
        
        // Total malas completed: always increasing
        const malaIncrease = Math.floor(Math.random() * 50) + 20;
        liveActivityData.totalMalas += malaIncrease;
        
        // Total chants = malas * 108 (auto calculated)
        liveActivityData.totalChants = liveActivityData.totalMalas * 108;
        
        // Online globally: 2-3 lakh range
        const onlineChange = Math.random() > 0.5 ? Math.floor(Math.random() * 300) + 100 : -Math.floor(Math.random() * 200);
        liveActivityData.onlineNow = Math.max(200000, Math.min(350000, liveActivityData.onlineNow + onlineChange));
        
        // Active malas in progress: fluctuates
        const activeMalaChange = Math.random() > 0.6 ? Math.floor(Math.random() * 50) : -Math.floor(Math.random() * 30);
        liveActivityData.activeMalas = Math.max(5000, Math.max(15000, liveActivityData.activeMalas + activeMalaChange));
        
        // Completed 108+ today: slowly increases
        if (Math.random() > 0.6) {
            liveActivityData.completedToday += Math.floor(Math.random() * 10) + 5;
        }
        
        // Streak users: very slow increase
        if (Math.random() > 0.85) {
            liveActivityData.streakUsers += Math.floor(Math.random() * 3) + 1;
        }
        
        // Update DOM
        updateLiveActivity();
    }, 2500); // Every 2.5 seconds
}

function updateLiveActivity() {
    if (liveUsersEl) liveUsersEl.textContent = liveActivityData.liveUsers.toLocaleString('en-IN');
    if (totalMalasGlobalEl) totalMalasGlobalEl.textContent = liveActivityData.totalMalas.toLocaleString('en-IN');
    if (totalChantsGlobalEl) totalChantsGlobalEl.textContent = liveActivityData.totalChants.toLocaleString('en-IN');
    if (onlineNowEl) onlineNowEl.textContent = liveActivityData.onlineNow.toLocaleString('en-IN');
    if (activeMalasEl) activeMalasEl.textContent = liveActivityData.activeMalas.toLocaleString('en-IN');
    if (completedTodayEl) completedTodayEl.textContent = liveActivityData.completedToday.toLocaleString('en-IN');
    if (streakUsersEl) streakUsersEl.textContent = liveActivityData.streakUsers.toLocaleString('en-IN');
}

// Mala (Rosary) Animation Functions
function initializeMala() {
    // Create 108 beads in a circle
    const totalBeads = 108;
    const radius = 80;
    const centerX = 100;
    const centerY = 100;
    
    for (let i = 0; i < totalBeads; i++) {
        const angle = (i / totalBeads) * 2 * Math.PI - Math.PI / 2; // Start from top
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        const bead = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        bead.setAttribute('cx', x);
        bead.setAttribute('cy', y);
        bead.setAttribute('r', '2.5');
        bead.setAttribute('fill', '#d1d5db'); // Gray for unfilled
        bead.setAttribute('class', 'mala-bead transition-all duration-300');
        bead.setAttribute('data-index', i);
        
        malaBeadsContainer.appendChild(bead);
    }
}

function updateMalaDisplay(totalCount) {
    const currentMalaProgress = totalCount % 108;
    const completedMalas = Math.floor(totalCount / 108);
    
    // Update text
    malaProgress.textContent = `${currentMalaProgress}/108`;
    malaCount.textContent = completedMalas;
    
    // Update bead colors
    const beads = malaBeadsContainer.querySelectorAll('.mala-bead');
    beads.forEach((bead, index) => {
        if (index < currentMalaProgress) {
            // Filled bead - gradient colors
            const hue = (index / 108) * 360;
            bead.setAttribute('fill', `hsl(${hue}, 70%, 60%)`);
            bead.setAttribute('r', '3'); // Slightly larger
        } else {
            // Unfilled bead
            bead.setAttribute('fill', '#d1d5db');
            bead.setAttribute('r', '2.5');
        }
    });
    
    // Animate the latest bead
    if (currentMalaProgress > 0) {
        const latestBead = beads[currentMalaProgress - 1];
        if (latestBead) {
            // Pulse animation
            latestBead.setAttribute('r', '4');
            setTimeout(() => {
                latestBead.setAttribute('r', '3');
            }, 200);
        }
    }
    
    // Show celebration when mala completes
    if (currentMalaProgress === 0 && totalCount > 0) {
        celebrateMalaCompletion();
    }
}

function celebrateMalaCompletion() {
    // Flash all beads
    const beads = malaBeadsContainer.querySelectorAll('.mala-bead');
    beads.forEach((bead, index) => {
        setTimeout(() => {
            bead.setAttribute('fill', '#fbbf24'); // Gold color
            bead.setAttribute('r', '4');
            setTimeout(() => {
                bead.setAttribute('fill', '#d1d5db');
                bead.setAttribute('r', '2.5');
            }, 200);
        }, index * 5); // Staggered animation
    });
}
