// awesome sauce

// variables
let timeRemaining = 124; // default time in seconds
let timerReady = true; // debounce for start button
let switchSoundsEnabled = false;
//audio
let startSound = new Audio("audio/VEX IQ countdown.mp3");
let endSound = new Audio("https://www.studentroboticseducation.com/wp-content/uploads/2022/07/Match-end-sound.mp3");
let switchSound = new Audio("https://www.studentroboticseducation.com/wp-content/uploads/2022/07/Match-driver-switch-sound.mp3");
switchSound.volume = 0.7; // volume
let shortBeep = new Audio("https://www.studentroboticseducation.com/wp-content/uploads/2022/07/Short-beep.mp3");
let lastCount = new Audio("audio/final countdown.mp3");

// functions

//Match timer
var interval = 1000; // ms
var expected = Date.now() + interval;
let timeoutId;

function timerCount() {
    var dt = Date.now() - expected; // the drift (positive for overshooting)

    if ((timeRemaining == 61) && switchSoundsEnabled) {
        switchSound.play(); // Play switch side sounds
    }
    if (timeRemaining <= 1) { // Regular countdown
        timerStop();
        timerText.innerHTML = "TIME UP";
        timerReady = true;
    }

    timeRemaining -= 1;
    if (timeRemaining <= 120) {
        if (!timerReady) {
            timerText.innerHTML = timeRemaining.toString() + " seconds";
        }
    }
    if (timeRemaining == 10) {
        lastCount.play(); // Play end countdown
    }
    expected += interval;
    timeoutId = setTimeout(timerCount, Math.max(0, interval - dt));
}

function timerStart() {
    if (timerReady) {
        startSound.play();
        timerReady = false;
        expected = Date.now() + interval; // Reset the expected time
        timerCount();
    }
}

function timerStop() {
    if (!timerReady) {
        timerReady = true;
        clearTimeout(timeoutId); // stop calling timerCount
    }
}

function timerReset() {
    timerReady = true;
    clearTimeout(timeoutId);
    timeRemaining = 124;
    if (timeRemaining <= 120) {
        timerText.innerHTML = timeRemaining.toString() + " seconds";
    } else if (timeRemaining >= 120) {
        timerText.innerHTML = "120 seconds";
    }
}



function switchCountdown() {
    if (timerReady) {
        switchSoundsEnabled = switchSoundsEnabled ? false : true;
        if (switchSoundsEnabled) {
            countdownSwitch.innerHTML = "Disable Sound at Halfway"
        } else {
            countdownSwitch.innerHTML = "Enable Sound at Halfway"
        }
    }
}


// button events
window.addEventListener("DOMContentLoaded", function() {
    // timer variables
    const startBtn = document.getElementById("startBtn");
    const stopBtn = document.getElementById("stopBtn");
    const resetBtn = document.getElementById("resetBtn");
    const countdownSwitch = document.getElementById("countdownSwitch");
    const scoreSwitch = document.getElementById("scoreSwitch");
    const timerText = this.document.getElementById("timerText");

    if (startBtn) { // Check if buttons loaded on browser
        // timer events
        startBtn.addEventListener("click", timerStart)
        stopBtn.addEventListener("click", timerStop)
        resetBtn.addEventListener("click", timerReset)
        countdownSwitch.addEventListener("click", switchCountdown)
        scoreSwitch.addEventListener("click", showScore)
    }   
});
