let level = 1;
let attempts = 20;
let correctAnswers = 0;
let wrongAnswers = 0;

document.addEventListener('DOMContentLoaded', (event) => {
    const playerName = localStorage.getItem('playerName');
    if (!playerName) {
        alert('Player name not found. Please enter your name.');
        window.location.href = 'index.html';
        return;
    }

    const levelDisplay = document.getElementById("level");
    const numberDisplay = document.getElementById("number");
    const feedbackDisplay = document.getElementById("feedback");
    const attemptsDisplay = document.getElementById("attempts");
    const correctDisplay = document.getElementById("correct");
    const wrongDisplay = document.getElementById("wrong");
    const inputField = document.getElementById("input");
    const submitButton = document.getElementById("submit");
    const recordsButton = document.getElementById("button");
    const correctSound = document.getElementById("correctSound");
    const incorrectSound = document.getElementById("incorrectSound");
    const winningSound= document.getElementById("winningSound");
    const losingSound = document.getElementById("losingSound");
    recordsButton.onclick = () => window.location.href = 'records.html';


    submitButton.addEventListener("click", checkAnswer);

    let timer = 3;
    let countdown = setInterval(() => {
        feedbackDisplay.textContent = "Game starts in " + timer;
        timer--;
        if (timer < 0) {
            clearInterval(countdown);
            feedbackDisplay.textContent = "";
            startGame();
        }
    }, 1000);

    function startGame() {
        
        nextLevel();
    }

    function nextLevel() {
        if (attempts <= 0) {
            feedbackDisplay.textContent = "Game over!";
            saveRecord();
            return;
        }

        levelDisplay.textContent = `Level: ${level}`;
        let numberLength = level;
        let displayDuration = getDisplayDuration(level);
        let randomNumber = generateRandomNumber(numberLength);

        numberDisplay.textContent = randomNumber;
        setTimeout(() => {
            numberDisplay.textContent = "";
        }, displayDuration);

        inputField.value = "";
        inputField.focus();

        submitButton.dataset.expected = randomNumber;
    }

    function getDisplayDuration(level) {
        if (level <= 2) {
            return 1000;
        } else if (level <= 4) {
            return 2000;
        } else if (level <= 6) {
            return 3000;
        } else if (level <= 8) {
            return 4000;
        } else {
            return 5000;
        }
    }

    function generateRandomNumber(length) {
        let number = "";
        for (let i = 0; i < length; i++) {
            number += Math.floor(Math.random() * 10);
        }
        return number;
    }

    function checkAnswer() {
        if (attempts <= 0) {
            feedbackDisplay.textContent = "Game over!";
            losingSound.play();
            saveRecord();
            return;
        }

        let userAnswer = inputField.value;
        let expectedAnswer = submitButton.dataset.expected;

        attempts--;
        attemptsDisplay.textContent = attempts;

        if (userAnswer === expectedAnswer) {
            feedbackDisplay.textContent = "Correct!";
            correctAnswers++;
            correctDisplay.textContent = correctAnswers;
            correctSound.play();

            level++;
            if (level > 10) {
                feedbackDisplay.textContent = "Congratulations! You completed the game!";
                winningSound.play();
                saveRecord();
                return;
            }
        } else {
            feedbackDisplay.textContent = "Wrong!";
            wrongAnswers++;
            wrongDisplay.textContent = wrongAnswers;
            incorrectSound.play();


            if (level > 1) {
                level--;
            }
        }

        nextLevel();
    }

    function saveRecord() {
        const now = new Date();
        const record = {
            player: playerName,
            correct: correctAnswers,
            wrong: wrongAnswers,
            attemptsUsed: 20 - attempts,
            date:
            now.toLocaleDateString(),
            time: now.toLocaleTimeString()
        };

        const records = JSON.parse(localStorage.getItem('gameRecords')) || [];
        records.push(record);
        localStorage.setItem('gameRecords', JSON.stringify(records));
    }
});