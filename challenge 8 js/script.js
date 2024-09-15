// Display current date on top of the screen
document.addEventListener("DOMContentLoaded", () => {
    const currentDateElement = document.getElementById("currentDate");
    const currentDate = new Date().toLocaleDateString();
    currentDateElement.textContent = `Current Date: ${currentDate}`;
  
    // Load tasks from localStorage
    ngarkoDetyrat();
  });
  
  // Function to add a task
  function shtoDetyre() {
    const taskDescription = document.getElementById("taskDescription").value;
    const taskTime = document.getElementById("taskTime").value;
    const taskDate = document.getElementById("taskDate").value;
  
    if (!taskDescription || !taskTime || !taskDate) {
      alert("Ju lutem plotesoni te gjitha fushat.");
      return;
    }
  
    const task = {
      description: taskDescription,
      time: taskTime,
      date: taskDate
    };
  
    shtoDetyreNeDOM(task);
    ruajDetyreNeLocalStorage(task);
  
    document.getElementById("taskDescription").value = "";
    document.getElementById("taskTime").value = "";
    document.getElementById("taskDate").value = "";
  }
  
  // Function to add task to DOM
  function shtoDetyreNeDOM(task) {
    const taskList = document.getElementById("taskList");
  
    const taskItem = document.createElement("li");
    taskItem.classList.add("list-group-item");
    taskItem.dataset.date = task.date;
  
    const taskContent = document.createElement("div");
    taskContent.innerHTML = `<strong>${task.time}</strong> - ${task.description} (${task.date})`;
  
    const removeButton = document.createElement("button");
    removeButton.classList.add("btn", "btn-danger", "btn-sm", "float-right");
    removeButton.textContent = "Hiq";
    removeButton.onclick = () => {
      hiqDetyre(taskItem);
    };
  
    taskItem.appendChild(taskContent);
    taskItem.appendChild(removeButton);
    taskList.appendChild(taskItem);
  
    theksoDetyratPerDatenAktuale();
  }
  
  // Function to remove a task
  function hiqDetyre(taskItem) {
    const taskList = document.getElementById("taskList");
    taskList.removeChild(taskItem);
    hiqDetyreNgaLocalStorage(taskItem);
  }
  
  // Function to highlight tasks with the current date
  function theksoDetyratPerDatenAktuale() {
    const currentDate = new Date().toISOString().split("T")[0];
    const taskItems = document.querySelectorAll("#taskList li");
  
    taskItems.forEach(taskItem => {
      if (taskItem.dataset.date === currentDate) {
        taskItem.classList.add("highlight-current-date");
      } else {
        taskItem.classList.remove("highlight-current-date");
      }
    });
  }
  
  // Function to save a task to localStorage
  function ruajDetyreNeLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  
  // Function to load tasks from localStorage
  function ngarkoDetyrat() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
      shtoDetyreNeDOM(task);
    });
  }
  
  // Function to remove a task from localStorage
  function hiqDetyreNgaLocalStorage(taskItem) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskDescription = taskItem.querySelector("div").textContent.split(" - ")[1].split(" (")[0];
    const taskTime = taskItem.querySelector("strong").textContent;
    const taskDate = taskItem.dataset.date;
  
    tasks = tasks.filter(task => !(task.description === taskDescription && task.time === taskTime && task.date === taskDate));
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  