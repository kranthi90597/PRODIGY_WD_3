let startTime;
let updatedTime;
let difference;
let tInterval;
let savedTime = 0;
let running = false;

const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const display = document.getElementById('display');
const laps = document.getElementById('laps');

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - savedTime;
        tInterval = setInterval(updateTime, 1);
        running = true;
        startStopBtn.innerText = 'Stop';
    } else {
        clearInterval(tInterval);
        savedTime = new Date().getTime() - startTime;
        running = false;
        startStopBtn.innerText = 'Start';
    }
}

function reset() {
    clearInterval(tInterval);
    savedTime = 0;
    running = false;
    display.innerText = '00:00:00.000';
    laps.innerHTML = '';
    startStopBtn.innerText = 'Start';
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    display.innerText = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function recordLap() {
    if (running) {
        const lapTime = display.innerText;
        const lapItem = document.createElement('li');
        lapItem.innerText = lapTime;
        laps.appendChild(lapItem);
    }
}
