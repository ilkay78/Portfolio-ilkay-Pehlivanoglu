const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");

const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const filterInput = document.querySelector("#todoSearch");
//const addList =document.querySelector(".list-group")
//let todos = localStorage.getItem("todos");
let todos = [];
runEvent();

function runEvent() {
  form.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded", pageLoaded);
  secondCardBody.addEventListener("click",editTodoToUI);
  secondCardBody.addEventListener("click", removeTodoToUI);
  clearButton.addEventListener("click", allTodosEverywhere);
  filterInput.addEventListener("keyup", filter);
}

function pageLoaded() {
  checkTodosFromStorage();
  todos.forEach(function (todo) {
    addTodoToUI(todo);
  });
}
function filter(e) {
  const filterValue = e.target.value.toLowerCase().trim();
  
  const todoListesi = document.querySelectorAll(".list-group-item");
  if (todoListesi.length > 0) {
    todoListesi.forEach(function(todo){
      if (todo.textContent.toLowerCase().trim().includes(filterValue)) {
        todo.setAttribute("style", "display : block");
      } else {
        todo.setAttribute("style", "display : none !important");
      }
    });
  } else {
    showAlert("warning", "Für den Filtervorgang muss mindestens ein To-do vorhanden sein.");
  }
}
function allTodosEverywhere() {
  const todoListesi = document.querySelectorAll(".list-group-item");
  if (todoListesi.length > 0) {
    todoListesi.forEach(function (todo) {
      
      todo.remove();
    });

    //storage alles löschen
    todos = [];
    localStorage.setItem("todos", JSON.stringify(todos));
    showAlert("succsess", "Erfolgreich gelöscht");
  } else {
    showAlert("warning", "Zum Löschen muss mindestens eine Aktivität vorhanden sein");
  }
}


function editTodoToUI(e) {
  if (e.target.classList.contains("fa-pen-to-square")) {
    const li = e.target.closest("li");
    const todoText = li.firstChild.textContent.trim();

    if (li.querySelector(".edit-input")) return;

    li.firstChild.textContent = "";

    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.className = "form-control edit-input";
    editInput.value = todoText;

    const saveBtn = document.createElement("button");
    saveBtn.className = "btn btn-success btn-sm ml-2 save-btn";
    saveBtn.textContent = "Speichern";

    const editContainer = document.createElement("div");
    editContainer.className = "d-flex align-items-center";
    editContainer.appendChild(editInput);
    editContainer.appendChild(saveBtn);

    li.insertBefore(editContainer, li.querySelector(".edit-erase-container"));

    saveBtn.addEventListener("click", function () {
      const newTodoText = editInput.value.trim();
      if (!newTodoText) {
        showAlert("warning", "Das Todo darf nicht leer sein");
        return;
      }
      li.firstChild.textContent = newTodoText;
      editContainer.remove();
      updateTodoInStorage(todoText, newTodoText);
      showAlert("success", "Todo erfolgreich bearbeitet");
    });
  }
}






function updateTodoStorage(oldValue,newValue){
  checkTodosFromStorage();
  const index = todos.indexOf(oldValue);
  if(index!== -1){
    todos[index] = newValue;
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}


function removeTodoToUI(e) {
  if (e.target.className === "fa-solid fa-eraser") {
    //UI löschen
    const todo = e.target.parentElement.parentElement.parentElement;
    console.log(todo.textContent);
    todo.remove();
    //from Storage löschen
    removeTodoToStorage(todo.textContent);
    
    showAlert("success", "To-do erfolgreich gelöscht");
  }
}
function removeTodoToStorage(removeTodo) {
  checkTodosFromStorage();
  todos.forEach(function (todo, index) {
    if (removeTodo === todo) {
      todos.splice(index, 1);
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodo(e) {
  const inputText = addInput.value.trim();
  //console.log(inputText);
  if (inputText == null || inputText == "") {
    showAlert("warning", "Bitte lassen Sie dieses Feld nicht leer");
  } else {
    //UI hizufügen
    addTodoToUI(inputText);
    addTodoToStorage(inputText);
    showAlert("success", "To-do hinzugefügt");
  }
  //storage hinzufü+gen
  addInput.value = "";
  e.preventDefault();
}
function addTodoToUI(newTodo) {
  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between";
  li.textContent = newTodo;

  const div = document.createElement("div");
  div.className = "edit-erase-container";

  // Edit-Button
  const aEditItem = document.createElement("a");
  aEditItem.href = "#";
  aEditItem.className = "edit-item";
  const iEdit = document.createElement("i");
  iEdit.className = "fa-regular fa-pen-to-square";
  aEditItem.appendChild(iEdit);

  // Delete-Button
  const aDeleteItem = document.createElement("a");
  aDeleteItem.href = "#";
  aDeleteItem.className = "delete-item";
  const iDelete = document.createElement("i");
  iDelete.className = "fa-solid fa-eraser";
  aDeleteItem.appendChild(iDelete);

  div.appendChild(aEditItem);
  div.appendChild(aDeleteItem);
  li.appendChild(div);
  todoList.appendChild(li);
}
// function addTodoToUI(newTodo) {
//   const li = document.createElement("li");
//   li.className = "list-group-item d-flex justify-content-between";
//   li.textContent = newTodo;

//   const div = document.createElement("div");
//   div.className = "edit-erase-container"

// const aEditItem = document.createElement("a");
// aEditItem.href= "#";
// aEditItem.className = "edit-item";
// const iEdit = document.createElement("i");
// iEdit.className = "fa-regular fa-pen-to-square";
// aEditItem.appendChild(iEdit);


//   const aDeleteItem = document.createElement("a");
//   aDeleteItem.href = "#";
//   aDeleteItem.className = "delete-item";
  
// const iDelete = document.createElement("i");
//   iDelete.className = "fa-solid fa-eraser";
//   aDeleteItem.appendChild(iDelete);

// div.appendChild(aEditItem);
// div.appendChild(aDeleteItem);

//   li.appendChild(div);
//   todoList.appendChild(li);
//   addInput.value = "";
// }
function addTodoToStorage(newTodo) {
  checkTodosFromStorage();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function checkTodosFromStorage() {
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
}
function showAlert(type, message) {
  const div = document.createElement("div");
  div.className = `alert alert-${type}`;
  div.textContent = message;

  firstCardBody.appendChild(div);
  setTimeout(() => {
    div.remove();
  }, 2500);
}
