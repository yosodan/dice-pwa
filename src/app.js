import { rollDice } from "./dice.js";

const diceEl = document.getElementById("dice");

function showDice(num) {
  diceEl.textContent = num;
  diceEl.classList.add("rolling");
  setTimeout(() => diceEl.classList.remove("rolling"), 300);
}

function rollAndDisplay() {
  const num = rollDice();
  showDice(num);
}

const enableMotionBtn = document.getElementById("enable-motion");

function handlerFunction(event) {
  let { x, y, z } = event.accelerationIncludingGravity;
  let acc = Math.abs(x) + Math.abs(y) + Math.abs(z);
  let now = Date.now();
  if (acc > 15 && now - lastTime > 1000) {
    rollAndDisplay();
    lastTime = now;
  }
}

if (
  typeof DeviceMotionEvent !== "undefined" &&
  typeof DeviceMotionEvent.requestPermission === "function"
) {
  enableMotionBtn.style.display = "block";
  enableMotionBtn.addEventListener("click", () => {
    DeviceMotionEvent.requestPermission().then((response) => {
      if (response === "granted") {
        window.addEventListener("devicemotion", handlerFunction);
        enableMotionBtn.style.display = "none";
      }
    });
  });
} else {
  window.addEventListener("devicemotion", handlerFunction);
}

// Detect scroll on desktop
let isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
if (!isTouch) {
  window.addEventListener(
    "wheel",
    function (e) {
      if (Math.abs(e.deltaY) > 10) {
        rollAndDisplay();
      }
    },
    { passive: true }
  );
}

// Initial roll
showDice("-");
