// Seleccionar elementos
const previousOperandElement = document.querySelector(".previous-operand");
const currentOperandElement = document.querySelector(".current-operand");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");

// Variables de estado
let currentOperand = "0";
let previousOperand = "";
let operation = undefined;
let shouldResetScreen = false;
let lastButtonWasEquals = false;

// Funciones
function formatNumber(number) {
  // Convertir a string si es un número
  const stringNumber = number.toString();

  // Separar parte entera y decimal
  const integerDigits = parseFloat(stringNumber.split(".")[0]);
  const decimalDigits = stringNumber.split(".")[1];

  let integerDisplay;

  // Manejar NaN
  if (isNaN(integerDigits)) {
    integerDisplay = "0";
  } else {
    // Formatear con separador de miles
    integerDisplay = integerDigits.toLocaleString("es", {
      maximumFractionDigits: 0,
    });
  }

  // Devolver el número formateado con decimales si existen
  if (decimalDigits != null) {
    return `${integerDisplay}.${decimalDigits}`;
  } else {
    return integerDisplay;
  }
}

function updateDisplay() {
  // Formatear el número actual para mostrarlo
  currentOperandElement.textContent = formatNumber(currentOperand);

  // Mostrar la operación anterior si existe
  if (operation != null) {
    previousOperandElement.textContent = `${formatNumber(
      previousOperand
    )} ${operation}`;
  } else {
    previousOperandElement.textContent = previousOperand;
  }

  // Animar el cambio de número
  animateDisplay();
}

function animateDisplay() {
  // Añadir clase para la animación
  currentOperandElement.classList.add("updated");

  // Eliminar la clase después de la animación
  setTimeout(() => {
    currentOperandElement.classList.remove("updated");
  }, 150);
}

function appendNumber(number) {
  // Si se acaba de pulsar igual, reiniciar la calculadora
  if (lastButtonWasEquals) {
    currentOperand = "0";
    lastButtonWasEquals = false;
  }

  // Reiniciar pantalla si es necesario
  if (currentOperand === "0" || shouldResetScreen) {
    // Caso especial: si es un punto decimal, mantener el cero
    if (number === ".") {
      currentOperand = "0.";
    } else {
      currentOperand = number;
    }
    shouldResetScreen = false;
    return;
  }

  // Evitar múltiples puntos decimales
  if (number === "." && currentOperand.includes(".")) return;

  // Limitar la longitud para evitar desbordamiento
  if (currentOperand.replace(/[^0-9]/g, "").length >= 12) return;

  // Añadir el número
  currentOperand += number;
}

function chooseOperation(op) {
  // Si no hay número actual, no hacer nada
  if (currentOperand === "") return;

  // Resetear el flag de equals
  lastButtonWasEquals = false;

  // Si ya hay una operación pendiente, calcularla primero
  if (previousOperand !== "") {
    compute();
  }

  // Configurar la nueva operación
  operation = op;
  previousOperand = currentOperand;
  shouldResetScreen = true;
}

function compute() {
  let computation;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  // Validar operandos
  if (isNaN(prev) || isNaN(current)) return;

  // Realizar la operación correspondiente
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
        // Mostrar error de división por cero
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

  // Limitar a 10 decimales para evitar problemas de precisión
  if (computation.toString().includes(".")) {
    const decimalPart = computation.toString().split(".")[1];
    if (decimalPart && decimalPart.length > 10) {
      computation = parseFloat(computation.toFixed(10));
    }
  }

  // Manejar números muy grandes o muy pequeños
  if (Math.abs(computation) > 999999999999) {
    currentOperand = computation.toExponential(6);
  } else if (Math.abs(computation) < 0.000001 && computation !== 0) {
    currentOperand = computation.toExponential(6);
  } else {
    currentOperand = computation.toString();
  }

  // Resetear estado
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
  // Si se acaba de pulsar igual, no hacer nada
  if (lastButtonWasEquals) return;

  // Si solo queda un dígito, poner 0
  if (
    currentOperand.length === 1 ||
    (currentOperand.length === 2 && currentOperand.startsWith("-"))
  ) {
    currentOperand = "0";
  } else {
    // Eliminar el último carácter
    currentOperand = currentOperand.slice(0, -1);
  }
}

// Función para dar feedback visual al presionar un botón
function addClickEffect(button) {
  button.classList.add("active");
  setTimeout(() => {
    button.classList.remove("active");
  }, 100);
}

// Event Listeners
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

// Soporte para teclado
document.addEventListener("keydown", (e) => {
  // Números y punto decimal
  if ((e.key >= "0" && e.key <= "9") || e.key === ".") {
    // Buscar y animar el botón correspondiente
    const button = [...numberButtons].find((btn) => btn.textContent === e.key);
    if (button) addClickEffect(button);

    appendNumber(e.key);
    updateDisplay();
  }

  // Operadores
  if (e.key === "+" || e.key === "-") {
    const button = [...operatorButtons].find(
      (btn) => btn.textContent === e.key
    );
    if (button) addClickEffect(button);

    chooseOperation(e.key);
    updateDisplay();
  }

  // Multiplicación
  if (e.key === "*") {
    const button = [...operatorButtons].find((btn) => btn.textContent === "×");
    if (button) addClickEffect(button);

    chooseOperation("×");
    updateDisplay();
  }

  // División
  if (e.key === "/") {
    e.preventDefault(); // Evitar que se abra la búsqueda rápida en algunos navegadores
    const button = [...operatorButtons].find((btn) => btn.textContent === "÷");
    if (button) addClickEffect(button);

    chooseOperation("÷");
    updateDisplay();
  }

  // Igual
  if (e.key === "Enter" || e.key === "=") {
    e.preventDefault(); // Evitar que se envíe un formulario si está dentro de uno
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

  // Borrar
  if (e.key === "Backspace") {
    addClickEffect(deleteButton);

    deleteDigit();
    updateDisplay();
  }
});

// Inicializar display
updateDisplay();

// Calculator Class
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

// Initialize Calculator
const calculator = new Calculator(
  previousOperandElement,
  currentOperandElement
);

// Event Listeners
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

// Keyboard support
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

// Animate calculator container
document.addEventListener("DOMContentLoaded", () => {
  // Register GSAP plugins if needed
  if (typeof gsap !== "undefined") {
    // Animate calculator container
    gsap.from(".calculator-container", {
      duration: 1,
      opacity: 0,
      y: 30,
      ease: "power3.out",
    });

    // Animate calculator buttons with stagger
    gsap.from("button", {
      duration: 0.5,
      opacity: 0,
      y: 20,
      stagger: 0.03,
      delay: 0.5,
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
