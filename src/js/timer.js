"use strict";

const stopBtn = document.querySelector(".stop-btn");
const pauseBtn = document.querySelector(".pause-btn");
const startBtn = document.querySelector(".start-btn");
const continueBtn = document.querySelector(".continue-btn");
const timer = document.querySelector(".time");

let timerStop = false;
let timerPause = false;
let pauseValue = 0;

function start(startValue) {
  let startTime = Date.now();
  const run = () => {
    let localStartTime = 0;
    if (startValue) {
      localStartTime = Date.now()+startValue*1000;
    } else {
      localStartTime = Date.now();
    }
    const time = (localStartTime - startTime) / 1000;

    let seconds = (time % 60).toFixed(3);
    let minutes = Math.trunc(time / 60);
    let hours = Math.trunc(time / 3600);

    const res = `${hours < 10 ? `0${hours}` : hours}:${
      minutes < 10 ? `0${minutes}` : minutes
    }:${Math.trunc(seconds) < 10 ? `0${seconds}` : seconds}`;

    timer.innerText = res;
    if (timerPause) {
      clearTimeout(run);
      pauseValue = time;
    } else if (timerStop) {
      clearTimeout(run);
      timer.innerText = "00:00:00.000";
    } else {
      setTimeout(run, 10);
    }
  };
  return run;
}

startBtn.addEventListener("click", () => {
  timerStop = false;
  setTimeout(start(), 10);
  startBtn.classList.add("hidden");
  pauseBtn.classList.remove("hidden");
  stopBtn.classList.remove("hidden");
});

stopBtn.addEventListener("click", () => {
  timerStop = true;
  startBtn.classList.remove("hidden");
  pauseBtn.classList.add("hidden");
  stopBtn.classList.add("hidden");
});

pauseBtn.addEventListener("click", () => {
  timerPause = true;
  pauseBtn.classList.add("hidden");
  continueBtn.classList.remove("hidden");
});

continueBtn.addEventListener("click", () => {
  timerPause = false;
  setTimeout(start(pauseValue), 10);
  pauseBtn.classList.remove("hidden");
  continueBtn.classList.add("hidden");
});
