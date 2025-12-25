// Brahmacharya Challenge Application
// All data stored in browser's localStorage

// Challenge levels and goals
const CHALLENGE_GOALS = {
    level1: [2, 4, 7, 14, 20, 30, 35, 45, 65, 80, 100],
    level2: [100, 120, 150, 180, 200, 220, 250, 280, 300, 330, 340, 365],
    level3: [365, 400, 430, 460, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1095, 1460, 1825, 2190, 2555, 2920, 3285, 3650] // Up to 10 years
};

// Flatten all goals into a single array
const ALL_GOALS = [...CHALLENGE_GOALS.level1, ...CHALLENGE_GOALS.level2, ...CHALLENGE_GOALS.level3];

// Emotional journey and messages for each day
const EMOTIONAL_JOURNEY = {
    // Level 1: Foundation (0-100 Days)
    2: { emoji: '💪', title: 'Little Confidence Gained', message: 'You took the first step! Small wins build big victories.', emotion: 'Confident' },
    4: { emoji: '🔥', title: 'More Confidence Rising', message: 'You\'re building momentum! The fire within grows stronger.', emotion: 'Energized' },
    7: { emoji: '😤', title: 'First Challenge - Frustration', message: 'Week 1 complete! Feeling tested? This is where warriors are made.', emotion: 'Determined' },
    14: { emoji: '😌', title: 'Calm & Centered', message: '2 weeks strong! Finding your inner peace and balance.', emotion: 'Peaceful' },
    20: { emoji: '🙏', title: 'Spiritual Awakening', message: 'Feeling the divine connection! Your dedication is transforming you.', emotion: 'Spiritual' },
    30: { emoji: '⚡', title: 'Power & Discipline', message: '1 month milestone! You\'re mastering self-control.', emotion: 'Powerful' },
    35: { emoji: '🌟', title: 'Inner Clarity', message: 'Mental fog is lifting! Your mind is becoming sharper.', emotion: 'Clear' },
    45: { emoji: '💎', title: 'Pressure Creates Diamonds', message: 'Challenges are polishing you into a gem. Keep shining!', emotion: 'Resilient' },
    65: { emoji: '🦅', title: 'Rising Above', message: 'Soaring high! Old temptations seem small from up here.', emotion: 'Elevated' },
    80: { emoji: '🛡️', title: 'Warrior Spirit', message: 'You\'re a warrior now! Unstoppable and unshakeable.', emotion: 'Strong' },
    100: { emoji: '🏆', title: 'LEVEL 1 COMPLETE!', message: '100 DAYS! Foundation solidified. You\'re ready for greater heights!', emotion: 'Victorious' },
    
    // Level 2: Intermediate (100-365 Days)
    120: { emoji: '🌊', title: 'Flow State', message: 'You\'re in the rhythm! Living with natural discipline.', emotion: 'Flowing' },
    150: { emoji: '🔮', title: 'Heightened Awareness', message: '5 months! Your intuition and awareness are expanding.', emotion: 'Aware' },
    180: { emoji: '🎭', title: 'Identity Shift', message: 'Half a year! You\'re becoming who you were meant to be.', emotion: 'Transformed' },
    200: { emoji: '⚔️', title: 'Battle-Tested', message: 'Temptations tried, but you prevailed! A true warrior.', emotion: 'Tested' },
    220: { emoji: '🕉️', title: 'Divine Connection', message: 'Feeling closer to the divine. Your practice is paying off.', emotion: 'Connected' },
    250: { emoji: '🌸', title: 'Inner Bloom', message: 'Your inner self is blossoming beautifully. Grace flows through you.', emotion: 'Blossoming' },
    280: { emoji: '🧘', title: 'Deep Meditation', message: 'Your mind is still like a calm lake. Peace surrounds you.', emotion: 'Meditative' },
    300: { emoji: '✨', title: 'Radiant Energy', message: '10 months! Others notice your glow and magnetic presence.', emotion: 'Radiant' },
    330: { emoji: '🎯', title: 'Laser Focus', message: 'Nothing can distract you now. Your willpower is unbreakable.', emotion: 'Focused' },
    340: { emoji: '🌙', title: 'Night Before Dawn', message: 'So close to 1 year! Final test before major milestone.', emotion: 'Anticipating' },
    365: { emoji: '👑', title: 'LEVEL 2 COMPLETE - 1 YEAR!', message: 'ONE FULL YEAR! You\'re crowned with discipline. Legendary status!', emotion: 'Royal' },
    
    // Level 3+: Master (1-10 Years)
    400: { emoji: '🌞', title: 'New Dawn', message: 'Beyond 1 year! Each day is a new blessing.', emotion: 'Blessed' },
    430: { emoji: '💫', title: 'Cosmic Alignment', message: 'You\'re aligned with universal energies. Pure consciousness.', emotion: 'Aligned' },
    460: { emoji: '🦁', title: 'Lion\'s Strength', message: 'You walk with the strength of a lion. Fearless and dignified.', emotion: 'Majestic' },
    500: { emoji: '🔱', title: 'Trishul of Discipline', message: '500 DAYS! Body, Mind, Spirit - all three aligned perfectly.', emotion: 'Trinity' },
    550: { emoji: '🌺', title: 'Lotus Rising', message: 'Like a lotus from mud, you\'ve risen pure and beautiful.', emotion: 'Pure' },
    600: { emoji: '🕊️', title: 'Freedom & Peace', message: 'True freedom achieved! Peace is your permanent state.', emotion: 'Liberated' },
    650: { emoji: '⭐', title: 'Guiding Star', message: 'You\'re now a beacon for others. Lead by example.', emotion: 'Inspiring' },
    700: { emoji: '🔥', title: 'Eternal Flame', message: 'Your inner fire burns eternal. Nothing can extinguish it.', emotion: 'Eternal' },
    750: { emoji: '🌈', title: 'Rainbow of Virtues', message: '2+ years! You embody all virtues - a complete being.', emotion: 'Complete' },
    800: { emoji: '🎼', title: 'Life Symphony', message: 'Your life plays like divine music. Perfect harmony.', emotion: 'Harmonious' },
    850: { emoji: '💝', title: 'Overflowing Love', message: 'Your heart overflows with divine love for all beings.', emotion: 'Loving' },
    900: { emoji: '🌍', title: 'Universal Consciousness', message: 'You feel one with everything. Boundaries dissolved.', emotion: 'Universal' },
    950: { emoji: '🎨', title: 'Living Masterpiece', message: 'Your life is a masterpiece in progress. Art of living mastered.', emotion: 'Artistic' },
    1000: { emoji: '💎', title: '1000 DAYS - DIAMOND STATUS', message: '1000 DAYS! You\'re rare and precious like a diamond!', emotion: 'Priceless' },
    1095: { emoji: '🎊', title: '3 YEARS - MASTER LEVEL', message: 'THREE FULL YEARS! You\'ve achieved master status!', emotion: 'Masterful' },
    1460: { emoji: '🌟', title: '4 YEARS - LEGENDARY', message: 'FOUR YEARS! Legendary discipline achieved!', emotion: 'Legendary' },
    1825: { emoji: '👼', title: '5 YEARS - ANGELIC', message: 'FIVE YEARS! Your transformation is angelic!', emotion: 'Angelic' },
    2190: { emoji: '🦚', title: '6 YEARS - DIVINE GRACE', message: 'SIX YEARS! Divine grace flows through you!', emotion: 'Graceful' },
    2555: { emoji: '🌠', title: '7 YEARS - COSMIC POWER', message: 'SEVEN YEARS! You possess cosmic power!', emotion: 'Cosmic' },
    2920: { emoji: '🔆', title: '8 YEARS - ENLIGHTENED', message: 'EIGHT YEARS! You\'re walking enlightenment!', emotion: 'Enlightened' },
    3285: { emoji: '🏔️', title: '9 YEARS - PEAK CONSCIOUSNESS', message: 'NINE YEARS! Standing at the peak of consciousness!', emotion: 'Peak' },
    3650: { emoji: '🕉️', title: '10 YEARS - SELF-REALIZED', message: 'TEN FULL YEARS! SELF-REALIZATION ACHIEVED! 🙏', emotion: 'Self-Realized' }
};

// Global state
let challengeData = {
    currentStreak: 0,
    bestStreak: 0,
    totalCheckIns: 0,
    completedGoals: [],
    checkInDates: [],
    lastCheckInDate: null,
    startDate: null
};

// DOM Elements
const currentStreak = document.getElementById('currentStreak');
const currentLevel = document.getElementById('currentLevel');
const nextGoal = document.getElementById('nextGoal');
const checkInBtn = document.getElementById('checkInBtn');
const checkInStatus = document.getElementById('checkInStatus');
const timeRemaining = document.getElementById('timeRemaining');
const totalCheckIns = document.getElementById('totalCheckIns');
const bestStreak = document.getElementById('bestStreak');
const goalsCompleted = document.getElementById('goalsCompleted');
const daysSinceStart = document.getElementById('daysSinceStart');

// Modals
const successModal = document.getElementById('successModal');
const closeSuccessModal = document.getElementById('closeSuccessModal');
const goalAchievedText = document.getElementById('goalAchievedText');
const goalEmoji = document.getElementById('goalEmoji');
const goalTitle = document.getElementById('goalTitle');
const emotionalState = document.getElementById('emotionalState');
const motivationalMessage = document.getElementById('motivationalMessage');
const resetModal = document.getElementById('resetModal');
const cancelResetBtn = document.getElementById('cancelResetBtn');
const confirmResetBtn = document.getElementById('confirmResetBtn');
const importModal = document.getElementById('importModal');
const importFileInput = document.getElementById('importFileInput');
const cancelImportBtn = document.getElementById('cancelImportBtn');
const confirmImportBtn = document.getElementById('confirmImportBtn');
const importError = document.getElementById('importError');

// Buttons
const exportDataBtn = document.getElementById('exportDataBtn');
const importDataBtn = document.getElementById('importDataBtn');
const resetProgressBtn = document.getElementById('resetProgressBtn');
const testModeBtn = document.getElementById('testModeBtn');
const testModeModal = document.getElementById('testModeModal');
const closeTestModeBtn = document.getElementById('closeTestModeBtn');
const darkModeToggle = document.getElementById('darkModeToggle');
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');

// Initialize app
function init() {
    loadChallengeData();
    loadDarkMode();
    renderGoals();
    updateDisplay();
    updateTimeRemaining();
    
    // Update time remaining every minute
    setInterval(updateTimeRemaining, 60000);
}

// Load data from localStorage
function loadChallengeData() {
    try {
        const saved = localStorage.getItem('brahmacharyaChallenge');
        if (saved) {
            challengeData = JSON.parse(saved);
            // Check if streak broke (more than 1 day since last check-in)
            checkStreakValidity();
        }
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

// Save data to localStorage
function saveChallengeData() {
    try {
        localStorage.setItem('brahmacharyaChallenge', JSON.stringify(challengeData));
    } catch (error) {
        console.error('Error saving data:', error);
        alert('❌ Error saving data!');
    }
}

// Check if streak is still valid
function checkStreakValidity() {
    if (!challengeData.lastCheckInDate) return;
    
    const lastDate = new Date(challengeData.lastCheckInDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    lastDate.setHours(0, 0, 0, 0);
    
    const daysDiff = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));
    
    // If more than 1 day has passed, streak is broken
    if (daysDiff > 1) {
        challengeData.currentStreak = 0;
        saveChallengeData();
    }
}

// Render all goal cards
function renderGoals() {
    renderLevelGoals('level1Goals', CHALLENGE_GOALS.level1);
    renderLevelGoals('level2Goals', CHALLENGE_GOALS.level2);
    renderLevelGoals('level3Goals', CHALLENGE_GOALS.level3);
}

// Render goals for a specific level
function renderLevelGoals(containerId, goals) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    goals.forEach(goal => {
        const goalCard = document.createElement('div');
        goalCard.className = 'goal-card p-4 rounded-xl text-white text-center font-bold shadow-lg';
        
        const isCompleted = challengeData.completedGoals.includes(goal);
        const isCurrent = !isCompleted && goal === getNextGoal();
        const isLocked = !isCompleted && !isCurrent;
        
        if (isCompleted) {
            goalCard.classList.add('goal-completed');
            goalCard.innerHTML = `
                <div class="text-3xl mb-1">✅</div>
                <div class="text-xl">${goal} Days</div>
            `;
        } else if (isCurrent) {
            goalCard.classList.add('goal-current');
            goalCard.innerHTML = `
                <div class="text-3xl mb-1">🎯</div>
                <div class="text-xl">${goal} Days</div>
                <div class="text-xs mt-1">${challengeData.currentStreak}/${goal}</div>
            `;
        } else {
            goalCard.classList.add('goal-locked');
            goalCard.innerHTML = `
                <div class="text-3xl mb-1">🔒</div>
                <div class="text-xl">${goal} Days</div>
            `;
        }
        
        container.appendChild(goalCard);
    });
}

// Get next goal
function getNextGoal() {
    for (let goal of ALL_GOALS) {
        if (!challengeData.completedGoals.includes(goal)) {
            return goal;
        }
    }
    return ALL_GOALS[ALL_GOALS.length - 1]; // Return max goal if all completed
}

// Get current level
function getCurrentLevel() {
    const nextGoal = getNextGoal();
    
    if (nextGoal <= 100) return 1;
    if (nextGoal <= 365) return 2;
    return 3;
}

// Update emotional state banner based on current streak
function updateEmotionalBanner() {
    const emotionalBanner = document.getElementById('emotionalBanner');
    const currentEmoji = document.getElementById('currentEmoji');
    const currentEmotion = document.getElementById('currentEmotion');
    const currentMessage = document.getElementById('currentMessage');
    
    // Only show if user has checked in at least once
    if (challengeData.currentStreak === 0 || !emotionalBanner) {
        if (emotionalBanner) emotionalBanner.classList.add('hidden');
        return;
    }
    
    // Find the most recent completed goal or current journey phase
    let emotionalData = null;
    
    // Check if current streak matches a goal exactly
    if (EMOTIONAL_JOURNEY[challengeData.currentStreak]) {
        emotionalData = EMOTIONAL_JOURNEY[challengeData.currentStreak];
    } else {
        // Find the last completed goal
        const completedGoals = ALL_GOALS.filter(g => g <= challengeData.currentStreak).sort((a, b) => b - a);
        if (completedGoals.length > 0 && EMOTIONAL_JOURNEY[completedGoals[0]]) {
            emotionalData = EMOTIONAL_JOURNEY[completedGoals[0]];
        }
    }
    
    // Show emotional state if available
    if (emotionalData) {
        emotionalBanner.classList.remove('hidden');
        currentEmoji.textContent = emotionalData.emoji;
        currentEmotion.textContent = emotionalData.emotion;
        currentMessage.textContent = emotionalData.message;
    } else {
        emotionalBanner.classList.add('hidden');
    }
}

// Update display
function updateDisplay() {
    // Update streak
    currentStreak.textContent = `${challengeData.currentStreak} Days`;
    
    // Update level
    const level = getCurrentLevel();
    currentLevel.textContent = `Level ${level}`;
    
    // Update next goal
    const goal = getNextGoal();
    nextGoal.textContent = `${goal} Days`;
    
    // Update statistics
    totalCheckIns.textContent = challengeData.totalCheckIns;
    bestStreak.textContent = challengeData.bestStreak;
    goalsCompleted.textContent = challengeData.completedGoals.length;
    
    // Update current emotional state banner
    updateEmotionalBanner();
    
    // Update days since start
    if (challengeData.startDate) {
        const start = new Date(challengeData.startDate);
        const today = new Date();
        const days = Math.floor((today - start) / (1000 * 60 * 60 * 24));
        daysSinceStart.textContent = days;
    } else {
        daysSinceStart.textContent = '0';
    }
    
    // Update check-in status
    if (challengeData.lastCheckInDate) {
        const lastDate = new Date(challengeData.lastCheckInDate);
        const formattedDate = lastDate.toLocaleDateString('en-IN');
        const formattedTime = lastDate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
        checkInStatus.textContent = `Last check-in: ${formattedDate} at ${formattedTime}`;
        
        // Check if already checked in today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        lastDate.setHours(0, 0, 0, 0);
        
        if (today.getTime() === lastDate.getTime()) {
            checkInBtn.disabled = true;
            checkInBtn.textContent = '✅ Already Checked In Today';
            checkInBtn.classList.add('opacity-50', 'cursor-not-allowed');
        } else {
            checkInBtn.disabled = false;
            checkInBtn.textContent = '✅ Today\'s Check-in';
            checkInBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        }
    } else {
        checkInStatus.textContent = 'Last check-in: Never';
    }
    
    // Re-render goals to update current goal progress
    renderGoals();
}

// Update time remaining until midnight
function updateTimeRemaining() {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    
    const diff = midnight - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    timeRemaining.textContent = `⏰ Time remaining: ${hours}h ${minutes}m until midnight`;
}

// Check-in button handler
checkInBtn.addEventListener('click', () => {
    if (checkInBtn.disabled) return;
    
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    // Check if already checked in today
    if (challengeData.lastCheckInDate) {
        const lastDate = new Date(challengeData.lastCheckInDate);
        const lastDateStr = lastDate.toISOString().split('T')[0];
        
        if (todayStr === lastDateStr) {
            alert('⚠️ You have already checked in today!');
            return;
        }
    }
    
    // Initialize start date if first check-in
    if (!challengeData.startDate) {
        challengeData.startDate = today.toISOString();
    }
    
    // Increment streak
    challengeData.currentStreak++;
    challengeData.totalCheckIns++;
    
    // Update best streak
    if (challengeData.currentStreak > challengeData.bestStreak) {
        challengeData.bestStreak = challengeData.currentStreak;
    }
    
    // Add to check-in dates
    challengeData.checkInDates.push(today.toISOString());
    challengeData.lastCheckInDate = today.toISOString();
    
    // Check if goal completed
    const nextGoalValue = getNextGoal();
    if (challengeData.currentStreak === nextGoalValue) {
        challengeData.completedGoals.push(nextGoalValue);
        showSuccessModal(nextGoalValue);
    }
    
    // Save and update
    saveChallengeData();
    updateDisplay();
    
    // Play celebration sound
    playCelebrationSound();
    
    // Vibrate
    if ('vibrate' in navigator) {
        navigator.vibrate([100, 50, 100]);
    }
});

// Show success modal
function showSuccessModal(goalValue) {
    // Get emotional journey data for this goal
    const journeyData = EMOTIONAL_JOURNEY[goalValue];
    
    if (journeyData) {
        // Update modal with emotional journey data
        goalEmoji.textContent = journeyData.emoji;
        goalTitle.textContent = journeyData.title;
        goalAchievedText.textContent = `You completed ${goalValue} Days!`;
        emotionalState.textContent = `${journeyData.emoji} ${journeyData.emotion}`;
        motivationalMessage.textContent = `"${journeyData.message}"`;
    } else {
        // Fallback for goals without specific journey data
        goalEmoji.textContent = '🎉';
        goalTitle.textContent = 'Goal Achieved!';
        goalAchievedText.textContent = `You completed ${goalValue} Days!`;
        emotionalState.textContent = '💪 Strong & Determined';
        motivationalMessage.textContent = '"Every day you grow stronger. Keep going!"';
    }
    
    successModal.classList.remove('hidden');
}

// Close success modal
closeSuccessModal.addEventListener('click', () => {
    successModal.classList.add('hidden');
});

// Play celebration sound
function playCelebrationSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const notes = [523, 659, 784, 1047]; // C, E, G, High C
        let delay = 0;
        
        notes.forEach((freq) => {
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
        console.error('Sound error:', error);
    }
}

// Export data
exportDataBtn.addEventListener('click', () => {
    try {
        const dataStr = JSON.stringify(challengeData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(dataBlob);
        downloadLink.download = `brahmacharya-progress-${new Date().toISOString().split('T')[0]}.json`;
        downloadLink.click();
        
        alert('✅ Progress exported! File is downloading.');
    } catch (error) {
        console.error('Export error:', error);
        alert('❌ Export error!');
    }
});

// Import data
importDataBtn.addEventListener('click', () => {
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
            if (typeof importedData.currentStreak === 'undefined') {
                showError(importError, 'Invalid data file!');
                return;
            }
            
            // Confirm import
            if (confirm('Import progress? Current progress will be replaced.')) {
                challengeData = importedData;
                checkStreakValidity();
                saveChallengeData();
                updateDisplay();
                importModal.classList.add('hidden');
                alert('✅ Progress imported successfully!');
            }
        } catch (error) {
            console.error('Import error:', error);
            showError(importError, 'Error reading file! Choose correct JSON file.');
        }
    };
    
    reader.readAsText(file);
});

// Reset progress
resetProgressBtn.addEventListener('click', () => {
    resetModal.classList.remove('hidden');
});

cancelResetBtn.addEventListener('click', () => {
    resetModal.classList.add('hidden');
});

confirmResetBtn.addEventListener('click', () => {
    challengeData = {
        currentStreak: 0,
        bestStreak: 0,
        totalCheckIns: 0,
        completedGoals: [],
        checkInDates: [],
        lastCheckInDate: null,
        startDate: null
    };
    
    saveChallengeData();
    updateDisplay();
    resetModal.classList.add('hidden');
    alert('✅ Progress reset successfully!');
});

// Error display helper
function showError(element, message) {
    element.textContent = message;
    element.classList.remove('hidden');
    setTimeout(() => {
        element.classList.add('hidden');
    }, 5000);
}

// Dark mode functions
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

darkModeToggle.addEventListener('click', toggleDarkMode);

// Test Mode functionality
testModeBtn.addEventListener('click', () => {
    testModeModal.classList.remove('hidden');
});

closeTestModeBtn.addEventListener('click', () => {
    testModeModal.classList.add('hidden');
});

// Test day function - accessible globally for onclick handlers
window.testDay = function(day) {
    // Set test data
    challengeData.currentStreak = day;
    challengeData.totalCheckIns = day;
    challengeData.bestStreak = Math.max(challengeData.bestStreak, day);
    
    // Mark all goals up to this day as completed
    challengeData.completedGoals = ALL_GOALS.filter(g => g <= day);
    
    // Set dates
    const today = new Date();
    if (!challengeData.startDate) {
        challengeData.startDate = new Date(today - (day * 24 * 60 * 60 * 1000)).toISOString();
    }
    challengeData.lastCheckInDate = today.toISOString();
    
    // Save and update
    saveChallengeData();
    updateDisplay();
    
    // Show the emotional journey modal for this day
    showSuccessModal(day);
    
    // Close test mode modal
    testModeModal.classList.add('hidden');
};

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    init();
});

// Auto-save before page unload
window.addEventListener('beforeunload', () => {
    saveChallengeData();
});
