let timer;
let startTime;
let elapsedTime = 0;
let running = false;
let lapNumber = 0;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

function formatTime(ms) {
    let date = new Date(ms);
    let minutes = String(date.getUTCMinutes()).padStart(2, '0');
    let seconds = String(date.getUTCSeconds()).padStart(2, '0');
    let milliseconds = String(Math.floor(date.getUTCMilliseconds() / 10)).padStart(2, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
}

function updateDisplay(time) {
    display.textContent = formatTime(time);
}

function startStop() {
    if (running) {
        clearInterval(timer);
        elapsedTime += Date.now() - startTime;
        startStopBtn.textContent = 'Start';
    } else {
        startTime = Date.now();
        timer = setInterval(() => {
            updateDisplay(Date.now() - startTime + elapsedTime);
        }, 10);
        startStopBtn.textContent = 'Stop';
    }
    running = !running;
}

function reset() {
    clearInterval(timer);
    elapsedTime = 0;
    running = false;
    startStopBtn.textContent = 'Start';
    updateDisplay(elapsedTime);
    lapsList.innerHTML = '';
    lapNumber = 0;
}

function addLap() {
    if (running) {
        if (lapNumber < 10) {
            lapNumber++;
            let lapTime = formatTime(Date.now() - startTime + elapsedTime);
            let lapElement = document.createElement('li');
            lapElement.textContent = `Lap ${lapNumber}: ${lapTime}`;
            lapsList.appendChild(lapElement);
        } else {
            alert('Maximum of 10 laps reached.');
        }
    }
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', addLap);

updateDisplay(elapsedTime);
