const startMusic = document.getElementById('startMusic');
const correctMusic = document.getElementById('correctMusic');
const wrongMusic = document.getElementById('wrongMusic');
const menu = document.getElementById('menuDom');
const gameDom = document.getElementById('gameDom');
const howToPlayDom = document.getElementById('howToPlay');
const playButton = document.getElementById('play');
const howToPlayButton = document.getElementById('howToPlayButton');
const settingsDom = document.getElementById('settings');
const settingsButton = document.getElementById('settingsButton');
const soundButton = document.getElementById('soundSettings');
const start = document.getElementById('start');
const logo = document.getElementById('logo');
const text = document.getElementById('text');
const label = document.getElementById('label');
const input = document.getElementById('input');
const back = document.querySelectorAll('.back');
let sound = true;

function showMenuDom(){
    menu.classList.remove('hide');
    gameDom.classList.add('hide');
    howToPlay.classList.add('hide');
    settingsDom.classList.add('hide');
    localStorage.setItem("currentPage", "menuDom");
}

function showGameDom(){
    menu.classList.add('hide');
    gameDom.classList.remove('hide');
    howToPlayDom.classList.add('hide');
    settingsDom.classList.add('hide');
    localStorage.setItem("currentPage", "gameDom");
}

function showHowToPlay(){
    menu.classList.add('hide');
    gameDom.classList.add('hide');
    howToPlayDom.classList.remove('hide');
    settingsDom.classList.add('hide');
    localStorage.setItem("currentPage", "howToPlay");
}

function showSettings(){
    menu.classList.add('hide');
    gameDom.classList.add('hide');
    howToPlayDom.classList.add('hide');
    settingsDom.classList.remove('hide');
    localStorage.setItem("currentPage", "settings");
}

function setPage() {
    let currentPage = localStorage.getItem("currentPage");
    if (currentPage === "menuDom") {
        showMenuDom();
    } else if (currentPage === "gameDom") {
        showGameDom();
    } else if (currentPage === "howToPlay") {
        showHowToPlay();
    } else if (currentPage === "settings") {
        showSettings();
    }
}

function  celebrate() {
     // start

     const start = () => {
        setTimeout(function() {
            confetti.start()
        }, 1000); // 1000 is time that after 1 second start the confetti ( 1000 = 1 sec)
    };

    //  Stop

    const stop = () => {
        setTimeout(function() {
            confetti.stop()
        }, 5000); // 5000 is time that after 5 second stop the confetti ( 5000 = 5 sec)
    };

    start();
    stop();
}