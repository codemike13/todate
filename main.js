const addButton = document.querySelector(".add-todo");
const completeButton = document.querySelector(".mark-todo-complete");
const delCompleteButton = document.querySelector(".delete-completed-todos");
let toDoInput = document.querySelector(".todo-input");
let numberInput = document.querySelector(".number-input");

function getCurrentDateAndTime() {
  return new Date().toLocaleString();
}

// let todos = [
//   [`Be able to mark todos "done".`, false, getCurrentDateAndTime()],
//   [`Allow user interaction through the DOM`, false, getCurrentDateAndTime()],
//   [`Add dates to todos.`, false, getCurrentDateAndTime()]
// ];
let todos = [];

function printToDom(todo, todoDate) {
  let ol = document.querySelector(".todo-list");
  let li = document.createElement("li");
  let task = (document.createElement("p").innerText = "Task: " + todo);
  let date = (document.createElement("p").innerText =
    " \tAdded on : " + todoDate);
  li.innerText = task + date;
  ol.appendChild(li);

  let olArr = Array.from(ol.childNodes);

  li.addEventListener("click", event => {
    markComplete(parseInt(olArr.indexOf(event.target)));
    // console.log(parseInt(olArr.indexOf(event.target)))
  });
}

function printList() {
  let i = 0;
  while (i < todos.length) {
    printToDom(todos[i][0], todos[i][2]);
    i = i + 1;
  }
}
function addToDo(todo) {
  todos.push([todo, false, getCurrentDateAndTime()]);
}
function removeTodo(index) {
  todos.splice([index][0], 1);
}

function incinerate() {
  let ol = document.querySelector(".todo-list");
  while (ol.hasChildNodes()) {
    ol.removeChild(ol.firstChild);
  }
}

function markComplete(index) {
  let ol = document.querySelector(".todo-list");
  todos[index][1] = true;
  ol.childNodes[index].style.textDecoration = "line-through";
}

function deleteComplete() {
  for (i = 0; i < todos.length; i++) {
    if (todos[i][1] === true) {
      removeTodo(i);
      i--;
    }
  }
}
addButton.addEventListener("click", () => {
  if (!toDoInput.value) {
    return;
  }
  addToDo(toDoInput.value);
  printToDom(toDoInput.value, getCurrentDateAndTime());
  toDoInput.value = "";
});
delCompleteButton.addEventListener("click", () => {
  deleteComplete();
  incinerate();
  printList();
});
