const taskInput = document.getElementById('task__input');
const tasksList = document.getElementById('tasks__list');
const addButton = document.getElementById('tasks__add');

function removeTask(taskId) {
  const taskToRemove = tasksList.querySelector(`.task[data-id="${taskId}"]`);
  taskToRemove.remove();
  removeTaskFromLocalStorage(taskId);
}

function addTask(title, taskId) {
  const newNoteHTML = `
    <div class="task" data-id="${taskId}">
      <div class="task__title">${title}</div>
      <a href="#" class="task__remove">&times;</a>
    </div>
  `;
  tasksList.insertAdjacentHTML('beforeend', newNoteHTML);

  const taskRemove = tasksList.querySelector(`.task[data-id="${taskId}"] .task__remove`);
  taskRemove.addEventListener('click', (e) => {
    e.preventDefault();
    removeTask(taskId);
  });
}

function addTaskToLocalStorage(taskId, title) {
  const notes = JSON.parse(localStorage.getItem('notes')) || {};
  notes[taskId] = title;
  localStorage.setItem('notes', JSON.stringify(notes));
}

function loadTasksFromLocalStorage() {
  const notes = JSON.parse(localStorage.getItem('notes')) || {};
  for (const taskId in notes) {
    if (notes.hasOwnProperty(taskId)) {
      addTask(notes[taskId], taskId);
    }
  }
}

function addTaskFromInput() {
  const noteText = taskInput.value.trim();
  if (noteText) {
    const taskId = generateUniqueId(); 
    addTask(noteText, taskId);
    addTaskToLocalStorage(taskId, noteText);
    taskInput.value = '';
  }
}

taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    addTaskFromInput();
  }
});

addButton.addEventListener('click', () => {
  addTaskFromInput();
});

document.addEventListener('DOMContentLoaded', () => {
  loadTasksFromLocalStorage();
});

function generateUniqueId() {
  return Date.now().toString(36);
}

function removeTaskFromLocalStorage(taskId) {
  const notes = JSON.parse(localStorage.getItem('notes')) || {};
  delete notes[taskId];
  localStorage.setItem('notes', JSON.stringify(notes));
}