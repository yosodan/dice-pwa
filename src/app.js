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

// Detect mobile shake gesture
if (window.DeviceMotionEvent) {
  let threshold = 15;
  let lastTime = 0;
  window.addEventListener("devicemotion", function (event) {
    let { x, y, z } = event.accelerationIncludingGravity;
    let acc = Math.abs(x) + Math.abs(y) + Math.abs(z);

    let now = Date.now();
    if (acc > threshold && now - lastTime > 1000) {
      rollAndDisplay();
      lastTime = now;
    }
  });
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
