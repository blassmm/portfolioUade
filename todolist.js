// DOM Elements
const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const filterBtns = document.querySelectorAll(".filter-btn");
const tasksCounter = document.getElementById("tasks-counter");
const clearCompletedBtn = document.getElementById("clear-completed");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function createTaskElement(task) {
  const taskElement = document.createElement("div");
  taskElement.classList.add("todo-item");
  if (task.completed) {
    taskElement.classList.add("completed");
  }
  taskElement.dataset.id = task.id;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("todo-checkbox");
  checkbox.checked = task.completed;
  checkbox.addEventListener("change", () => toggleTaskStatus(task.id));

  const taskText = document.createElement("span");
  taskText.classList.add("todo-text");
  taskText.textContent = task.text;

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
  deleteBtn.addEventListener("click", () => deleteTask(task.id));

  taskElement.appendChild(checkbox);
  taskElement.appendChild(taskText);
  taskElement.appendChild(deleteBtn);

  return taskElement;
}

function renderTasks() {
  todoList.innerHTML = "";

  const filteredTasks = tasks.filter((task) => {
    if (currentFilter === "active") return !task.completed;
    if (currentFilter === "completed") return task.completed;
    return true;
  });

  if (filteredTasks.length === 0) {
    const emptyMessage = document.createElement("div");
    emptyMessage.classList.add("empty-message");
    emptyMessage.textContent =
      currentFilter === "all"
        ? "No tasks yet. Add a new task above!"
        : currentFilter === "active"
        ? "No active tasks!"
        : "No completed tasks!";
    todoList.appendChild(emptyMessage);
  } else {
    filteredTasks.forEach((task) => {
      todoList.appendChild(createTaskElement(task));
    });
  }

  updateTasksCounter();
}

function addTask(text) {
  if (!text.trim()) return;

  const newTask = {
    id: Date.now().toString(),
    text: text.trim(),
    completed: false,
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();
  taskInput.value = "";
}

function toggleTaskStatus(id) {
  tasks = tasks.map((task) => {
    if (task.id === id) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });

  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  saveTasks();
  renderTasks();
}

function updateTasksCounter() {
  const activeTasks = tasks.filter((task) => !task.completed).length;
  tasksCounter.textContent = `${activeTasks} pending task${
    activeTasks !== 1 ? "s" : ""
  }`;
}

function clearCompletedTasks() {
  tasks = tasks.filter((task) => !task.completed);
  saveTasks();
  renderTasks();
}

function setFilter(filter) {
  currentFilter = filter;

  filterBtns.forEach((btn) => {
    btn.classList.remove("active");
    if (btn.dataset.filter === filter) {
      btn.classList.add("active");
    }
  });

  renderTasks();
}

addBtn.addEventListener("click", () => addTask(taskInput.value));

taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask(taskInput.value);
  }
});

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => setFilter(btn.dataset.filter));
});

clearCompletedBtn.addEventListener("click", clearCompletedTasks);

renderTasks();

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
    gsap.from(".todo-container", {
      duration: 1,
      opacity: 0,
      y: 30,
      ease: "power3.out"
    });
    
    gsap.from(".todo-header", {
      duration: 0.8,
      opacity: 0,
      y: 20,
      delay: 0.3,
      ease: "power3.out"
    });
    
    gsap.from(".filters", {
      duration: 0.8,
      opacity: 0,
      y: 20,
      delay: 0.5,
      ease: "power3.out"
    });
    
    if (document.querySelectorAll(".todo-item").length > 0) {
      gsap.from(".todo-item", {
        duration: 0.5,
        opacity: 0,
        y: 20,
        stagger: 0.1,
        delay: 0.7,
        ease: "power3.out"
      });
    }
    
    gsap.from(".todo-footer", {
      duration: 0.8,
      opacity: 0,
      y: 20,
      delay: 0.9,
      ease: "power3.out"
    });
    
    gsap.from("footer", {
      duration: 1,
      opacity: 0,
      y: 30,
      delay: 1,
      ease: "power3.out"
    });
  }
});
