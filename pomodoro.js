// Timer settings
const timerSettings = {
  pomodoro: 25 * 60, // 25 minutes in seconds
  shortBreak: 5 * 60, // 5 minutes in seconds
  longBreak: 15 * 60, // 15 minutes in seconds
};

// DOM Elements
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
const pomodoroBtn = document.getElementById("pomodoro");
const shortBreakBtn = document.getElementById("short-break");
const longBreakBtn = document.getElementById("long-break");
const sessionCountEl = document.getElementById("session-count");
const timerContainer = document.querySelector(".timer-container");

// Timer variables
let currentMode = "pomodoro";
let timeLeft = timerSettings[currentMode];
let timerInterval = null;
let sessionCount = 0;

// Functions
function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  minutesEl.textContent = minutes.toString().padStart(2, "0");
  secondsEl.textContent = seconds.toString().padStart(2, "0");
}

function setActiveButton(button) {
  [pomodoroBtn, shortBreakBtn, longBreakBtn].forEach((btn) => {
    btn.classList.remove("active");
  });
  button.classList.add("active");
}

function switchMode(mode) {
  currentMode = mode;
  timeLeft = timerSettings[mode];

  // Reset timer if it's running
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
    startBtn.classList.remove("hidden");
    pauseBtn.classList.add("hidden");
  }

  // Update display
  updateDisplay();

  // Set active button
  if (mode === "pomodoro") {
    setActiveButton(pomodoroBtn);
  } else if (mode === "shortBreak") {
    setActiveButton(shortBreakBtn);
  } else if (mode === "longBreak") {
    setActiveButton(longBreakBtn);
  }
}

function startTimer() {
  if (timerInterval) return;

  startBtn.classList.add("hidden");
  pauseBtn.classList.remove("hidden");

  timerInterval = setInterval(() => {
    timeLeft--;
    updateDisplay();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;

      // Play notification sound
      const audio = new Audio(
        "https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3"
      );
      audio.play();

      // Update session count if pomodoro is completed
      if (currentMode === "pomodoro") {
        sessionCount++;
        sessionCountEl.textContent = sessionCount;

        // After 4 pomodoros, take a long break
        if (sessionCount % 4 === 0) {
          switchMode("longBreak");
        } else {
          switchMode("shortBreak");
        }
      } else {
        // After break, go back to pomodoro
        switchMode("pomodoro");
      }

      startBtn.classList.remove("hidden");
      pauseBtn.classList.add("hidden");
    }
  }, 1000);
}

function pauseTimer() {
  if (!timerInterval) return;

  clearInterval(timerInterval);
  timerInterval = null;

  startBtn.classList.remove("hidden");
  pauseBtn.classList.add("hidden");
}

function resetTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  timeLeft = timerSettings[currentMode];
  updateDisplay();

  startBtn.classList.remove("hidden");
  pauseBtn.classList.add("hidden");
}

// Event Listeners
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

pomodoroBtn.addEventListener("click", () => switchMode("pomodoro"));
shortBreakBtn.addEventListener("click", () => switchMode("shortBreak"));
longBreakBtn.addEventListener("click", () => switchMode("longBreak"));

// Initialize
updateDisplay();

// Mobile menu toggle
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// Header scroll effect
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Animations
document.addEventListener("DOMContentLoaded", () => {
  // Register GSAP plugins if needed
  if (typeof gsap !== "undefined") {
    // Animate pomodoro container
    gsap.from(".pomodoro-container", {
      duration: 1,
      opacity: 0,
      y: 30,
      ease: "power3.out",
    });

    // Animate timer elements
    gsap.from(".mode-buttons", {
      duration: 0.8,
      opacity: 0,
      y: 20,
      delay: 0.3,
      ease: "power3.out",
    });

    gsap.from(".timer", {
      duration: 0.8,
      opacity: 0,
      scale: 0.95,
      delay: 0.5,
      ease: "power3.out",
    });

    gsap.from(".timer-controls button", {
      duration: 0.5,
      opacity: 0,
      y: 20,
      stagger: 0.1,
      delay: 0.7,
      ease: "power3.out",
    });

    // Animate footer without scroll trigger
    gsap.from("footer", {
      duration: 1,
      opacity: 0,
      y: 30,
      delay: 1,
      ease: "power3.out",
    });
  }
});
