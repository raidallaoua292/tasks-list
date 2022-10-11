let content = document.querySelector(".input");
let submit = document.querySelector(".add");
let list = document.querySelector(".tasks");

let tasksList = []; // Empty Arry

// check if theres in local storage
if (localStorage.getItem("tasks")) {
  tasksList = JSON.parse(localStorage.getItem("tasks"));
}
getData();
// Add tasks //
/* Keypress*/
content.onkeypress = function ()
{
  if (event.key === "Enter") {
    if (content.value.length !== 0) {
    addTasksToArry(content.value);
    content.value = "";
  }
  }
  
};

submit.onclick = function () {
  if (content.value.length !== 0) {
    addTasksToArry(content.value);
    content.value = "";
  }
};
// click on task element
list.addEventListener("click", (e) => {
  // delete button
  if (e.target.classList.contains("delete")) {
    //remove form local storage
    removeLocal(e.target.parentElement.getAttribute("data-id"));
    // remove elment from page
    e.target.parentElement.remove();
  }
  // task element
  if (e.target.classList.contains("task")) {
    updateStatus(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
  }
});
function addTasksToArry(taskName) {
  // Task Data
  const task = {
    id: Date.now(),
    title: taskName,
    status: false,
  };

  tasksList.push(task); // Add tasks in Arry

  addElements(tasksList); // Add tasks to page

  saveLocal(tasksList); // Add tasks to local storage

  /*///*/
  console.log(tasksList);
  console.log(JSON.stringify(tasksList));
}

function addElements(arryOfTasks) {
  list.innerHTML = "";
  // looping on arry of tasks
  arryOfTasks.forEach((task) => {
    // creat main div
    let div = document.createElement("div");
    div.className = "task";
    // check if task is done
    if (task.status) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    let text = document.createElement("div");
    text.textContent = task.title;
    // div.appendChild(document.createTextNode(task.title));

    let delet = document.createElement("button");
    delet.className = "delete";
    delet.textContent = "delete";
    //
    div.append(text, delet);
    list.appendChild(div);
    // styling
    div.style.cssText = `
        display: flex;
        background-color: #fff;
        padding: 10px;
        border-radius: 10px;
        flex: 1 1 100%;
        justify-content: space-between;
        align-items: center;
    `;

    delet.style.cssText = `
        background-color: #07ec07;
        padding: 5px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    `;
  });
}

function saveLocal(arryOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(tasksList));
}

function getData() {
  // get item from local storage
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElements(tasks);
  }
}

function removeLocal(taskId) {
  tasksList = tasksList.filter((task) => task.id != taskId);
  saveLocal(tasksList);
}

function updateStatus(taskId) {
  for (let i = 0; i < tasksList.length; i++) {
    if (tasksList[i].id == taskId) {
      tasksList[i].status == false
        ? (tasksList[i].status = true)
        : (tasksList[i].status = false);
    }
  }
  saveLocal(tasksList);
}
