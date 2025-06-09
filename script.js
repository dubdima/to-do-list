// Получаем элементы
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Загрузка задач из localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Функция отображения задач
function ShowTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'task-item';

        const span = document.createElement('span');
        span.className = 'task-text' + (task.completed ? ' completed' : '');
        span.textContent = task.text;
        span.onclick = () => toggleTask(index);

        const delBtn = document.createElement('button');
        delBtn.className = 'delete-btn';
        delBtn.textContent = 'DELETE';
        delBtn.onclick = () => deleteTask(index);

        li.appendChild(span);
        li.appendChild(delBtn);
        taskList.appendChild(li);
    });
}

// Добавление задачи
function Add() {
    const text = taskInput.value.trim();
    if (text === '') return; // Не добавлять пустую задачу
    tasks.push({ text, completed: false });
    saveTasks();
    ShowTasks();
    taskInput.value = '';
}

// Удаление задачи
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    ShowTasks();
}

// Переключение выполненности задачи
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    ShowTasks();
}

// Сохранение в localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// События
addBtn.addEventListener('click', Add);
taskInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') Add();
});

// Первая отрисовка
ShowTasks();