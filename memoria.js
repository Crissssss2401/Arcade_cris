// Variables del juego
const emojis = ['🎮', '🎯', '🎲', '🎪', '🎨', '🎭', '🎬', '🎸'];
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let attempts = 0;
let canFlip = true;

// Inicializar el juego
function initGame() {
    // Duplicar emojis para crear pares y mezclarlos
    cards = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
    
    const grid = document.getElementById('memoryGrid');
    grid.innerHTML = '';
    
    // Crear las cartas en el DOM
    cards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.emoji = emoji;
        card.dataset.index = index;
        card.textContent = emoji;
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
    });
    
    // Reiniciar variables
    flippedCards = [];
    matchedPairs = 0;
    attempts = 0;
    canFlip = true;
    updateStats();
    document.getElementById('message').textContent = '';
}

// Voltear carta
function flipCard() {
    if (!canFlip) return;
    
    const card = this;
    
    // No permitir voltear la misma carta dos veces o cartas ya emparejadas
    if (card.classList.contains('flipped') || card.classList.contains('matched')) {
        return;
    }
    
    // Voltear la carta
    card.classList.add('flipped');
    flippedCards.push(card);
    
    // Si se han volteado dos cartas
    if (flippedCards.length === 2) {
        canFlip = false;
        attempts++;
        updateStats();
        checkMatch();
    }
}

// Verificar si las cartas coinciden
function checkMatch() {
    const [card1, card2] = flippedCards;
    const emoji1 = card1.dataset.emoji;
    const emoji2 = card2.dataset.emoji;
    
    if (emoji1 === emoji2) {
        // ¡Coincidencia!
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        updateStats();
        showMessage('¡Excelente! 🎉');
        
        flippedCards = [];
        canFlip = true;
        
        // Verificar si se completó el juego
        if (matchedPairs === emojis.length) {
            setTimeout(() => {
                showMessage(`🏆 ¡Ganaste! Completaste el juego en ${attempts} intentos`);
            }, 500);
        }
    } else {
        // No coinciden
        showMessage('Intenta de nuevo 🤔');
        
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
            canFlip = true;
            document.getElementById('message').textContent = '';
        }, 1000);
    }
}

// Actualizar estadísticas
function updateStats() {
    document.getElementById('attempts').textContent = attempts;
    document.getElementById('pairs').textContent = `${matchedPairs} / ${emojis.length}`;
}

// Mostrar mensaje
function showMessage(text) {
    document.getElementById('message').textContent = text;
}

// Reiniciar juego
function resetGame() {
    initGame();
}

// Iniciar el juego cuando se carga la página
window.addEventListener('load', initGame);