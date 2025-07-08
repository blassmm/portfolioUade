const previousOperandElement = document.querySelector(".previous-operand");
const currentOperandElement = document.querySelector(".current-operand");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");

let currentOperand = "0";
let previousOperand = "";
let operation = undefined;
let shouldResetScreen = false;
let lastButtonWasEquals = false;

function formatNumber(number) {
  const stringNumber = number.toString();

  const integerDigits = parseFloat(stringNumber.split(".")[0]);
  const decimalDigits = stringNumber.split(".")[1];

  let integerDisplay;

  if (isNaN(integerDigits)) {
    integerDisplay = "0";
  } else {
    integerDisplay = integerDigits.toLocaleString("es", {
      maximumFractionDigits: 0,
    });
  }

  if (decimalDigits != null) {
    return `${integerDisplay}.${decimalDigits}`;
  } else {
    return integerDisplay;
  }
}

function updateDisplay() {
  currentOperandElement.textContent = formatNumber(currentOperand);

  if (operation != null) {
    previousOperandElement.textContent = `${formatNumber(
      previousOperand
    )} ${operation}`;
  } else {
    previousOperandElement.textContent = previousOperand;
  }

  animateDisplay();
}

function animateDisplay() {
  currentOperandElement.classList.add("updated");

  setTimeout(() => {
    currentOperandElement.classList.remove("updated");
  }, 150);
}

function appendNumber(number) {
  if (lastButtonWasEquals) {
    currentOperand = "0";
    lastButtonWasEquals = false;
  }

  if (currentOperand === "0" || shouldResetScreen) {
    if (number === ".") {
      currentOperand = "0.";
    } else {
      currentOperand = number;
    }
    shouldResetScreen = false;
    return;
  }

  if (number === "." && currentOperand.includes(".")) return;

  if (currentOperand.replace(/[^0-9]/g, "").length >= 12) return;

  currentOperand += number;
}

function chooseOperation(op) {
  if (currentOperand === "") return;

  lastButtonWasEquals = false;

  if (previousOperand !== "") {
    compute();
  }

  operation = op;
  previousOperand = currentOperand;
  shouldResetScreen = true;
}

function compute() {
  let computation;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  if (isNaN(prev) || isNaN(current)) return;

  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "×":
      computation = prev * current;
      break;
    case "÷":
      if (current === 0) {
        currentOperand = "Error";
        operation = undefined;
        previousOperand = "";
        shouldResetScreen = true;
        return;
      }
      computation = prev / current;
      break;
    default:
      return;
  }

  if (computation.toString().includes(".")) {
    const decimalPart = computation.toString().split(".")[1];
    if (decimalPart && decimalPart.length > 10) {
      computation = parseFloat(computation.toFixed(10));
    }
  }

  if (Math.abs(computation) > 999999999999) {
    currentOperand = computation.toExponential(6);
  } else if (Math.abs(computation) < 0.000001 && computation !== 0) {
    currentOperand = computation.toExponential(6);
  } else {
    currentOperand = computation.toString();
  }

  operation = undefined;
  previousOperand = "";
  shouldResetScreen = true;
}

function clear() {
  currentOperand = "0";
  previousOperand = "";
  operation = undefined;
  lastButtonWasEquals = false;
}

function deleteDigit() {
  if (lastButtonWasEquals) return;

  if (
    currentOperand.length === 1 ||
    (currentOperand.length === 2 && currentOperand.startsWith("-"))
  ) {
    currentOperand = "0";
  } else {
    currentOperand = currentOperand.slice(0, -1);
  }
}

function addClickEffect(button) {
  button.classList.add("active");
  setTimeout(() => {
    button.classList.remove("active");
  }, 100);
}

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    addClickEffect(button);
    appendNumber(button.textContent);
    updateDisplay();
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    addClickEffect(button);
    chooseOperation(button.textContent);
    updateDisplay();
  });
});

equalsButton.addEventListener("click", () => {
  addClickEffect(equalsButton);
  compute();
  lastButtonWasEquals = true;
  updateDisplay();
});

clearButton.addEventListener("click", () => {
  addClickEffect(clearButton);
  clear();
  updateDisplay();
});

deleteButton.addEventListener("click", () => {
  addClickEffect(deleteButton);
  deleteDigit();
  updateDisplay();
});

document.addEventListener("keydown", (e) => {
  if ((e.key >= "0" && e.key <= "9") || e.key === ".") {
    const button = [...numberButtons].find((btn) => btn.textContent === e.key);
    if (button) addClickEffect(button);

    appendNumber(e.key);
    updateDisplay();
  }

  if (e.key === "+" || e.key === "-") {
    const button = [...operatorButtons].find(
      (btn) => btn.textContent === e.key
    );
    if (button) addClickEffect(button);

    chooseOperation(e.key);
    updateDisplay();
  }
  if (e.key === "*") {
    const button = [...operatorButtons].find((btn) => btn.textContent === "×");
    if (button) addClickEffect(button);

    chooseOperation("×");
    updateDisplay();
  }

  if (e.key === "/") {
    e.preventDefault(); 
    const button = [...operatorButtons].find((btn) => btn.textContent === "÷");
    if (button) addClickEffect(button);

    chooseOperation("÷");
    updateDisplay();
  }

  // Igual
  if (e.key === "Enter" || e.key === "=") {
    e.preventDefault(); 
    addClickEffect(equalsButton);

    compute();
    lastButtonWasEquals = true;
    updateDisplay();
  }

  // Limpiar
  if (e.key === "Escape") {
    addClickEffect(clearButton);

    clear();
    updateDisplay();
  }

  if (e.key === "Backspace") {
    addClickEffect(deleteButton);

    deleteDigit();
    updateDisplay();
  }
});

// Inicializar display
updateDisplay();

class Calculator {
  constructor(previousOperandElement, currentOperandElement) {
    this.previousOperandElement = previousOperandElement;
    this.currentOperandElement = currentOperandElement;
    this.clear();
  }

  clear() {
    this.currentOperand = "0";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
    if (this.currentOperand === "") {
      this.currentOperand = "0";
    }
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    if (this.currentOperand === "0" && number !== ".") {
      this.currentOperand = number.toString();
    } else {
      this.currentOperand = this.currentOperand.toString() + number.toString();
    }
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "×":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandElement.innerText = "";
    }
  }
}

const calculator = new Calculator(
  previousOperandElement,
  currentOperandElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

clearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

document.addEventListener("keydown", (event) => {
  if (event.key >= "0" && event.key <= "9") {
    calculator.appendNumber(event.key);
  } else if (event.key === ".") {
    calculator.appendNumber(".");
  } else if (event.key === "+" || event.key === "-") {
    calculator.chooseOperation(event.key);
  } else if (event.key === "*") {
    calculator.chooseOperation("×");
  } else if (event.key === "/") {
    calculator.chooseOperation("÷");
  } else if (event.key === "Enter" || event.key === "=") {
    calculator.compute();
  } else if (event.key === "Backspace") {
    calculator.delete();
  } else if (event.key === "Escape") {
    calculator.clear();
  }
  calculator.updateDisplay();
});

const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

document.addEventListener("DOMContentLoaded", () => {

  if (typeof gsap !== "undefined") {
    gsap.from(".calculator-container", {
      duration: 1,
      opacity: 0,
      y: 30,
      ease: "power3.out",
    });

    gsap.from("button", {
      duration: 0.5,
      opacity: 0,
      y: 20,
      stagger: 0.03,
      delay: 0.5,
      ease: "power3.out",
    });

    gsap.from("footer", {
      duration: 1,
      opacity: 0,
      y: 30,
      delay: 1,
      ease: "power3.out",
    });
  }
});
