document.getElementById('startGame').addEventListener('click', () => {
    const playerName = document.getElementById('playerName').value;
    if (playerName) {
        localStorage.setItem('playerName', playerName);
        window.location.href = 'game.html';
    } else {
        alert('Please enter your name.');
    }
});