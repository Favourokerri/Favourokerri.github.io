window.onload = setPage()

playButton.addEventListener('click', () => {
    showGameDom();
})

howToPlayButton.addEventListener('click', () => {
    showHowToPlay();
})

settingsButton.addEventListener('click', () => {
    showSettings();
})

soundButton.addEventListener('change', (event) => {
    if (event.target.checked === true) {
        sound = true
    } else {
        event.target.removeAttribute('checked');
        sound = false;
    }
})

start.addEventListener('click', startGame);

back.forEach(button => {
    button.addEventListener('click', () => {
        showMenuDom();
    })
});

function startGame() {
    logo.classList.add('rotate');
    text.innerHTML = 'generating......';
    setTimeout(function() {
        text.innerHTML = 'Guess the number range 1 to 10';
        label.classList.remove('hide')
        input.classList.remove('hide');
        logo.classList.remove('rotate');

        // Generate a random integer between 1 and 10 (inclusive)
        randomNumber = Math.floor(Math.random() * 10) + 1;
        localStorage.setItem("randomNumber", randomNumber)

    }, 2000);
}


function checkAnswer(event) {
    if (event.key === "Enter") {
        label.classList.add('hide')
        input.classList.add('hide');
        inputValue = event.target.value
        if (inputValue === localStorage.getItem("randomNumber")) {
            celebrate()
            text.innerHTML = `congratulations i picked ${localStorage.getItem('randomNumber')}`;
            if (sound) {
                correctMusic.play();
            }
        } else {
            text.innerHTML = `Wrong. i picked ${localStorage.getItem('randomNumber')} you are gonna get booed`;
            if (sound) {
                wrongMusic.play();
            }
        }
    }
}

