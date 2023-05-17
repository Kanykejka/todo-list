const taskInput = document.querySelector('#task__input');
const todoList = document.querySelector('#todoList');
const taskButton = document.querySelector('#taskButton');
const allBtn = document.querySelector('#all');
const activeBtn = document.querySelector('#active');
const completedBtn = document.querySelector('#completed');
const todoCount = document.querySelector('#todoCount');
const count = document.querySelector('#count');

let tasks = [];

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'))
}

// tasks = JSON.parse(localStorage.getItem('tasks'))


tasks.forEach((task) => {
    const cssClass = task.done ? "todo__list-text todo__list-text--done" : "todo__list-text";

    const taskHtml = `
                <li class="todo__list-item" id="${task.id}">
                    <p class="${cssClass}">${task.text}</p>
                    <div class="todo__list-buttons">
                        <button class="todo__list-btn" id="deleteButton" data-action="delete" type="button">
                            <img class="delete__img icon" src="./images/cross.svg" alt="delete">
                        </button>
                        <button class="todo__list-btn" id="doneButton" data-action="done">
                            <img class="done__img icon" src="./images/tick.svg" alt="done" width="18" height="18">
                        </button>
                    </div>
                </li>`;

    todoList.insertAdjacentHTML('beforeend', taskHtml);
})

taskButton.addEventListener('click', addTask);
todoList.addEventListener('click', deleteTask);
todoList.addEventListener('click', doneTask);

function addTask() {
    const valueOfInput = taskInput.value;
    let newTask = {
        id: Date.now(),
        text: valueOfInput,
        done: false,
    }
    tasks.push(newTask)
    const cssClass = newTask.done ? "todo__list-text todo__list-text--done" : "todo__list-text";

    const taskHtml = `
                <li class="todo__list-item" id="${newTask.id}">
                    <p class="${cssClass}">${newTask.text}</p>
                    <div class="todo__list-buttons">
                        <button class="todo__list-btn" id="deleteButton" data-action="delete" type="button">
                            <img class="delete__img icon" src="./images/cross.svg" alt="delete">
                        </button>
                        <button class="todo__list-btn" id="doneButton" data-action="done">
                            <img class="done__img icon" src="./images/tick.svg" alt="done" width="18" height="18">
                        </button>
                    </div>
                </li>`;
    todoList.insertAdjacentHTML('beforeend', taskHtml);
    taskInput.value = '';
    taskInput.focus();

    if (todoList.children.length > 0) {
        const parentEl = todoList.querySelector('#emptyList');
        if (parentEl) {
            parentEl.remove();
        };
    }
    saveToLocalStorage();
}

function deleteTask(event) {
    if (event.target.dataset.action !== 'delete') return;

    const el = event.target;
    const parentNode = el.closest('.todo__list-item');
    parentNode.remove();

    const id = Number(parentNode.id);

    const index = tasks.findIndex((task) => {
        return task.id === id;
    })

    tasks.splice(index, 1)

    if (todoList.children.length === 0) {
        const emptyHTML = `
                <li class="todo__list-empty" id="emptyList">
                    <span>Список дел пуст</span>
                </li>`;

        todoList.insertAdjacentHTML("afterbegin", emptyHTML)
    }
    saveToLocalStorage();
}

function doneTask(event) {
    if (event.target.dataset.action !== 'done') return;

    const parentEl = event.target.closest('.todo__list-item');
    const text = parentEl.querySelector('.todo__list-text');

    text.classList.toggle('todo__list-text--done');

    const id = Number(parentEl.id);
    const el = tasks.find((task) => {
        return task.id === id;
    })

    el.done = !el.done;
    saveToLocalStorage();
}

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function showAll() {
    todoList.innerHTML = '';
    const falses = tasks.filter((task) => {
        return task.done === false
    })
    const trues = tasks.filter((task) => {
        return task.done === true
    })

    for (item of tasks) {
        const cssClass = item.done ? "todo__list-text todo__list-text--done" : "todo__list-text";
        const taskHtml = `
                        <li class="todo__list-item" id="${item.id}">
                            <p class="${cssClass}">${item.text}</p>
                            <div class="todo__list-buttons">
                                <button class="todo__list-btn" id="deleteButton" data-action="delete" type="button">
                                    <img class="delete__img icon" src="./images/cross.svg" alt="delete">
                                </button>
                                <button class="todo__list-btn" id="doneButton" data-action="done">
                                    <img class="done__img icon" src="./images/tick.svg" alt="done" width="18" height="18">
                                </button>
                            </div>
                        </li>`;


        todoList.insertAdjacentHTML('beforeend', taskHtml);
    }
}


function showActive() {
    const falses = tasks.filter((task) => {
        return task.done === false
    })
    if (falses.length === 0) {
        todoList.innerHTML = '';
    } else {
        for (item of falses) {
            console.log(falses)
            console.log(item.text)
            showTasks(item)
        }
    }
}
function showCompleted() {
    const trues = tasks.filter((task) => {
        return task.done === true
    })
    if (trues.length === 0) {
        todoList.innerHTML = '';
    } else {
        for (item of trues) {
            showTasks(item)
        }
    }
}

activeBtn.addEventListener('click', showActive)

completedBtn.addEventListener('click', showCompleted)
allBtn.addEventListener('click', showAll)

count.innerText = tasks.length;

function showTasks (task) {
    todoList.innerHTML = ''

    const cssClass = task.done ? "todo__list-text todo__list-text--done" : "todo__list-text";

    const taskHtml = `
                <li class="todo__list-item" id="${task.id}">
                    <p class="${cssClass}">${task.text}</p>
                    <div class="todo__list-buttons">
                        <button class="todo__list-btn" id="deleteButton" data-action="delete" type="button">
                            <img class="delete__img icon" src="./images/cross.svg" alt="delete">
                        </button>
                        <button class="todo__list-btn" id="doneButton" data-action="done">
                            <img class="done__img icon" src="./images/tick.svg" alt="done" width="18" height="18">
                        </button>
                    </div>
                </li>`;

    todoList.insertAdjacentHTML('beforeend', taskHtml);

}





