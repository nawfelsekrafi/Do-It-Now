//*********** features ***********
// add task to tasks container
// add task to localStorage
// delete task from tasks container
// delete task from localStorage
// update task status (complete or not ) in UI
// update task status (complete or not ) in localStorage
// get all tasks from localStorage
// display all tasks in UI

let todoInput = document.querySelector(".todo__value");
let addButton = document.querySelector(".add__button");
let tasksList = document.querySelector(".tasks__container");

let arrayOfTasks = getAllTasksFromLocalStorage();

todoInput.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    addButton.click();
  }
});

function createTask() {
  if (todoInput.value !== "") {
    const task = {
      id: Date.now(),
      title: todoInput.value,
      isCompleted: false,
    };
    arrayOfTasks.push(task);
    displayTasksFrom(arrayOfTasks);
    addTasksToLocalStorage(arrayOfTasks);
    todoInput.value = "";
  }
}

function displayTasksFrom(arrayOfTasks) {
  tasksList.innerHTML = "";
  arrayOfTasks.forEach((task) => {
    // create task div
    let div = document.createElement("div");
    div.className = "task";
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    //check if task is done
    if (task.isCompleted) {
      div.classList = "task done";
    }
    // create delete button
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("delete"));
    //append del to task div
    div.appendChild(span);
    //add task div to tasks List
    tasksList.appendChild(div);
  });
}

tasksList.addEventListener("click", (e) => {
  //delete button
  if (e.target.classList.contains("del")) {
    //remove task from local Storage
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    //remove task from ui
    e.target.parentElement.remove();
  }
  //toggle complete
  if (e.target.classList.contains("task")) {
    // toggle complete in local storage
    toggleStatusTashWith(e.target.getAttribute("data-id"));
    // complete effect in ui
    e.target.classList.toggle("done");
  }
});

function getAllTasksFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let array = JSON.parse(data);
    displayTasksFrom(array);
    return array;
  }
  return [];
}

function addTasksToLocalStorage(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function deleteTaskWith(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addTasksToLocalStorage(arrayOfTasks);
}

function toggleStatusTashWith(taskId) {
  arrayOfTasks.forEach((task) => {
    if (task.id == taskId) {
      task.isCompleted = task.isCompleted ? false : true;
    }
  });
  addTasksToLocalStorage(arrayOfTasks);
}

/*
Coded By Nawfel Sekrafi
*/
