const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Load tasks on page load
tasks.forEach(task => renderTask(task));

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') addTask();
});

// Add Task
function addTask() {
    const taskText = taskInput.value.trim();
    if (!taskText) return alert('Please enter a task!');

    const task = { text: taskText, completed: false };
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    renderTask(task);
    taskInput.value = '';
}

// Render Task
function renderTask(task) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${task.text}</span>
        <div>
            <button class="done-btn">✔</button>
            <button class="delete-btn">✖</button>
        </div>
    `;

    if (task.completed) li.classList.add('completed');

    // Mark Complete
    li.querySelector('.done-btn').addEventListener('click', () => {
        task.completed = !task.completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        li.classList.toggle('completed');
    });

    // Delete Task
    li.querySelector('.delete-btn').addEventListener('click', () => {
        tasks = tasks.filter(t => t !== task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        li.remove();
    });

    taskList.appendChild(li);
}