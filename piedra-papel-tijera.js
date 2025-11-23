// Variables del juego
let playerScore = 0;
let computerScore = 0;
let tiesScore = 0;

// Mapeo de opciones a emojis
const choiceEmojis = {
    'piedra': '✊',
    'papel': '✋',
    'tijera': '✌️'
};

// Función principal del juego
function play(playerChoice) {
    // Generar elección aleatoria de la computadora
    const choices = ['piedra', 'papel', 'tijera'];
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    
    // Mostrar las elecciones
    displayChoices(playerChoice, computerChoice);
    
    // Determinar el ganador
    const result = determineWinner(playerChoice, computerChoice);
    
    // Actualizar puntuación
    updateScore(result);
    
    // Mostrar resultado
    displayResult(result, playerChoice, computerChoice);
    
    // Verificar si hay un ganador final
    checkFinalWinner();
}

// Mostrar las elecciones en pantalla
function displayChoices(playerChoice, computerChoice) {
    const battleArea = document.getElementById('battleArea');
    battleArea.style.display = 'flex';
    
    document.getElementById('playerChoice').textContent = choiceEmojis[playerChoice];
    document.getElementById('computerChoice').textContent = choiceEmojis[computerChoice];
}

// Determinar el ganador de la ronda
function determineWinner(player, computer) {
    if (player === computer) {
        return 'tie';
    }
    
    const winConditions = {
        'piedra': 'tijera',
        'papel': 'piedra',
        'tijera': 'papel'
    };
    
    if (winConditions[player] === computer) {
        return 'win';
    } else {
        return 'lose';
    }
}

// Actualizar la puntuación
function updateScore(result) {
    if (result === 'win') {
        playerScore++;
        document.getElementById('playerScore').textContent = playerScore;
    } else if (result === 'lose') {
        computerScore++;
        document.getElementById('computerScore').textContent = computerScore;
    } else {
        tiesScore++;
        document.getElementById('tiesScore').textContent = tiesScore;
    }
}

// Mostrar el resultado de la ronda
function displayResult(result, playerChoice, computerChoice) {
    const resultMessage = document.getElementById('resultMessage');
    resultMessage.className = 'result-message ' + result;
    
    const choiceNames = {
        'piedra': 'Piedra',
        'papel': 'Papel',
        'tijera': 'Tijera'
    };
    
    if (result === 'win') {
        resultMessage.textContent = `¡Ganaste! ${choiceNames[playerChoice]} vence a ${choiceNames[computerChoice]} 🎉`;
    } else if (result === 'lose') {
        resultMessage.textContent = `Perdiste. ${choiceNames[computerChoice]} vence a ${choiceNames[playerChoice]} 😢`;
    } else {
        resultMessage.textContent = `¡Empate! Ambos eligieron ${choiceNames[playerChoice]} 🤝`;
    }
}

// Verificar si hay un ganador final
function checkFinalWinner() {
    if (playerScore === 5) {
        setTimeout(() => {
            alert('🏆 ¡FELICIDADES! ¡Ganaste el juego con 5 victorias!');
            resetGame();
        }, 1000);
    } else if (computerScore === 5) {
        setTimeout(() => {
            alert('😢 La computadora ganó el juego con 5 victorias. ¡Inténtalo de nuevo!');
            resetGame();
        }, 1000);
    }
}

// Reiniciar el juego
function resetGame() {
    playerScore = 0;
    computerScore = 0;
    tiesScore = 0;
    
    document.getElementById('playerScore').textContent = '0';
    document.getElementById('computerScore').textContent = '0';
    document.getElementById('tiesScore').textContent = '0';
    document.getElementById('resultMessage').textContent = '';
    document.getElementById('battleArea').style.display = 'none';
    
    document.getElementById('resultMessage').className = 'result-message';
}