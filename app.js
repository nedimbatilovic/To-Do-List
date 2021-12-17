// selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".todo-filter");

// event listeners
document.addEventListener(
    "DOMContentLoaded",
    (getTodos = () => {
        let todos;
        if (localStorage.getItem("todos") === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem("todos"));
        }

        todos.forEach((todo) => {
            // create div
            const todoDiv = document.createElement("div");
            todoDiv.classList.add("todo");

            // create li
            const newTodo = document.createElement("li");
            newTodo.innerText = todo;
            newTodo.classList.add("todo-item");
            todoDiv.appendChild(newTodo);

            // completed btn
            const completedButton = document.createElement("button");
            completedButton.innerHTML = "<i class='fas fa-check'></i>";
            completedButton.classList.add("complete-button");
            todoDiv.appendChild(completedButton);

            // trash btn
            const trashButton = document.createElement("button");
            trashButton.innerHTML = "<i class='fas fa-trash'></i>";
            trashButton.classList.add("trash-button");
            todoDiv.appendChild(trashButton);

            // aoppend onto list
            todoList.appendChild(todoDiv);
        });
    })
);

todoButton.addEventListener(
    "click",
    (addTodo = (event) => {
        event.preventDefault();
        // create div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        // create li
        const newTodo = document.createElement("li");
        newTodo.innerText = todoInput.value;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        // add todo to local storage
        saveLocalTodos(todoInput.value);

        // completed btn
        const completedButton = document.createElement("button");
        completedButton.innerHTML = "<i class='fas fa-check'></i>";
        completedButton.classList.add("complete-button");
        todoDiv.appendChild(completedButton);

        // trash btn
        const trashButton = document.createElement("button");
        trashButton.innerHTML = "<i class='fas fa-trash'></i>";
        trashButton.classList.add("trash-button");
        todoDiv.appendChild(trashButton);

        // aoppend onto list
        todoList.appendChild(todoDiv);

        // clear input
        todoInput.value = "";
    })
);

todoList.addEventListener(
    "click",
    (deleteCheck = (event) => {
        const item = event.target;
        // delete
        if (item.classList[0] === "trash-button") {
            const todo = item.parentElement;
            // animation
            todo.classList.add("fall");
            // todo.remove();
            todo.addEventListener("transitionend", () => todo.remove());
        }
        // complete
        if (item.classList[0] === "complete-button") {
            const todo = item.parentElement;
            todo.classList.toggle("completed");
        }
    })
);

filterOption.addEventListener(
    "click",
    (filterTodo = (event) => {
        const todos = todoList.childNodes;
        todos.forEach((todo) => {
            switch (event.target.value) {
                case "all":
                    todo.style.display = "flex";
                    break;
                case "completed":
                    if (todo.classList.contains("completed")) {
                        todo.style.display = "flex";
                    } else {
                        todo.style.display = "none";
                    }
                    break;
                case "uncompleted":
                    if (!todo.classList.contains("completed")) {
                        todo.style.display = "flex";
                    } else {
                        todo.style.display = "none";
                    }
                    break;
            }
        });
    })
);

// functions
function saveLocalTodos(todo) {
    // check for existing todos
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify("todos"));
}
