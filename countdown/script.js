// awesome sauce

// variables
let timePassed = -4; // default time in seconds
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

    timePassed += 1;

    if (timePassed >= 0){
        if (!timerReady) {
            timerText.innerHTML = timePassed.toString() + " seconds";
        }
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
    timePassed = -4;
    timerText.innerHTML = "0 seconds";
}



// button events
window.addEventListener("DOMContentLoaded", function() {
    // timer variables
    const startBtn = document.getElementById("startBtn");
    const stopBtn = document.getElementById("stopBtn");
    const resetBtn = document.getElementById("resetBtn");
    const timerText = this.document.getElementById("timerText");

    if (startBtn) { // Check if buttons loaded on browser
        // timer events
        startBtn.addEventListener("click", timerStart)
        stopBtn.addEventListener("click", timerStop)
        resetBtn.addEventListener("click", timerReset)
    }   
});
