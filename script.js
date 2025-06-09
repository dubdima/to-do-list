const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

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

function Add() {
    const text = taskInput.value.trim();
    if (text === '') return; 
    tasks.push({ text, completed: false });
    saveTasks();
    ShowTasks();
    taskInput.value = '';
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    ShowTasks();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    ShowTasks();
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

addBtn.addEventListener('click', Add);
taskInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') Add();
});

ShowTasks();
