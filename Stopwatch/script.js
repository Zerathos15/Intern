let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

const display = document.getElementById("display");
const lapList = document.getElementById("lapList");
const lapSound = new Audio("assets/lap.mp3");
const resetSound = new Audio("assets/reset.mp3");

function formatTime(ms) {
    let milliseconds = ms % 1000;
    let totalSeconds = Math.floor(ms / 1000);
    let seconds = totalSeconds % 60;
    let minutes = Math.floor(totalSeconds / 60) % 60;
    let hours = Math.floor(totalSeconds / 3600);

    return (
        String(hours).padStart(2, "0") + ":" +
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0") + "." +
        String(milliseconds).padStart(3, "0")
    );
}
function flipAnimation(element, newValue) {
    element.style.transform = "rotateX(90deg)";
    setTimeout(() => {
        element.textContent = newValue;
        element.style.transform = "rotateX(0deg)";
    }, 100);
}

function updateDisplay() {
    flipAnimation(display, formatTime(elapsedTime));
}

document.getElementById("startBtn").addEventListener("click", () => {
    if (!running) {
        running = true;
        startTime = Date.now() - elapsedTime;

        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);
    }
});

document.getElementById("pauseBtn").addEventListener("click", () => {
    if (running) {
        running = false;
        clearInterval(timerInterval);
    }
});

document.getElementById("resetBtn").addEventListener("click", () => {
    running = false;
    clearInterval(timerInterval);
    elapsedTime = 0;
    updateDisplay();
    lapList.innerHTML = "";

    resetSound.play();
});

document.getElementById("lapBtn").addEventListener("click", () => {
    if (running) {
        lapSound.play();

        let li = document.createElement("li");
        li.textContent = "Lap: " + formatTime(elapsedTime);
        lapList.appendChild(li);
    }
});

updateDisplay();