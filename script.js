const taskInput = document.querySelector('#taskInput');
const taskButton = document.querySelector('#taskButton');

const todoList = document.querySelector('#todoList');

const todoCount = document.querySelector('#todoCount');
const countOfItems = document.querySelector('#count');

const filtersButtons = document.querySelector('#filters');
const clearCompletedButton = document.querySelector('#clearCompleted');

let tasks = [];

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach(arr => {
        showTasks(arr.id, arr.text, arr.done)
    });
    showEmptyList()
}

taskButton.addEventListener('click', addTask);
todoList.addEventListener('click', deleteTask);
todoList.addEventListener('click', doneTask);

filtersButtons.addEventListener('click', filterTasks);
clearCompletedButton.addEventListener('click', clearCompleted);

function addTask() {
    let value = taskInput.value;

    let newTask = {
        id: Date.now(),
        text: value,
        done: false,
    };

    tasks.push(newTask);

    showEmptyList();
    showTasks(newTask.id, newTask.text, newTask.done);
    saveToLocalStorage();
    showLeftItems();
}

function deleteTask(e) {
    const el = e.target;
    const parentNode = el.closest('.todo__list-item');
    const button = parentNode.querySelector('[data-action="delete"]');

    if (el === button) {
        parentNode.remove();

        const id = Number(parentNode.id);
        const index = tasks.findIndex((task) => {
            return task.id === id;
        });
        tasks.splice(index, 1)
    }

    saveToLocalStorage();
    showEmptyList();
    showLeftItems();
}

function doneTask(e) {
    const el = e.target;
    const parentNode = el.closest('.todo__list-item');
    const button = parentNode.querySelector('[data-action="done"]');
    const textEl = parentNode.querySelector('.todo__list-text');

    if (el === button) {
        textEl.classList.toggle('todo__list-text--done')

        const id = Number(parentNode.id);

        const elem = tasks.find((task) => {
            return task.id === id
        });
        elem.done === false ? elem.done = true : elem.done = false;
    }

    saveToLocalStorage();
    showLeftItems();
}

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function showTasks(id, text, done) {
    let cssClass = done === false ? 'todo__list-text' : 'todo__list-text todo__list-text--done';

    const html = `
                <li class="todo__list-item" id="${id}">
                    <p class="${cssClass}">${text}</p>
                    <div class="todo__list-buttons">
                        <button class="todo__list-btn" data-action="delete" type="button">
                            <img class="delete__img icon" src="./images/delete.svg" alt="delete">
                        </button>
                        <button class="todo__list-btn" data-action="done">
                            <img class="done__img icon" src="./images/ok.svg" alt="done">
                        </button>
                    </div>
                </li>
    `;

    todoList.insertAdjacentHTML('beforeend', html)
    taskInput.value = '';
}

function showEmptyList() {
    if (tasks.length === 0) {
        const html = `
                <li id="emptyList">
                    <div class="todo__list-empty">
                        <span>The to-do list is empty</span>
                    </div>
                </li>
        
        `;

        // todoList.insertAdjacentHTML('afterbegin', html)
        todoList.innerHTML = html;
    } 

    if(tasks.length > 0) {
        const emptyList = document.querySelector('#emptyList');
        // emptyList.remove();
        emptyList ? emptyList.remove() : null;
    }
}

function showLeftItems() {
    let count = 0;
    for (let task of tasks) {
        if (task.done === false) {
            count = count + 1;
        }
    }
    countOfItems.innerText = count;
}

showLeftItems();

function filterTasks(event) {
    const el = event.target;
    const elemAll = el.closest('.all');
    const elemActive = el.closest('.active');
    const elemCompleted = el.closest('.completed');

    todoList.innerHTML = '';

    switch (el) {
        case elemAll:
            tasks.forEach((task) => {
                showTasks(task.id, task.text, task.done);
            });
            break;
        case elemActive:
            const activeTasks = tasks.filter((task) => {
                return task.done === false
            })
            activeTasks.forEach((task) => {
                showTasks(task.id, task.text, task.done)
            })
            break;
        case elemCompleted:
            const completedTasks = tasks.filter((task) => {
                return task.done === true;
            });
            completedTasks.forEach((task) => {
                showTasks(task.id, task.text, task.done)
            })
            break;
    }
}

function clearCompleted() {
    todoList.innerHTML = '';

    tasks = tasks.filter((task) => {
        return task.done === false;
    });

    tasks.forEach((task) => {
        showTasks(task.id, task.text, task.done);
    });

    saveToLocalStorage();
}

























