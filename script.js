// Pobranie elementów
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const counter = document.getElementById('counter');
const clearCompletedButton = document.getElementById('clear-completed');

// Inicjalizacja tablicy zadań
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Aktualizacja widoku po załadowaniu
renderTodos();

// Obsługa dodawania zadania
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text === '') return;

  const newTodo = {
    id: Date.now(),
    text,
    completed: false,
    date: new Date().toLocaleString()
  };

  todos.push(newTodo);
  input.value = '';
  saveAndRender();
});

// Funkcja renderująca listę
function renderTodos() {
  list.innerHTML = '';

  todos.forEach(todo => {
    const li = document.createElement('li');
    li.classList.toggle('completed', todo.completed);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => toggleTodo(todo.id));

    const span = document.createElement('span');
    span.textContent = `${todo.text}`;

    const delButton = document.createElement('button');
    delButton.textContent = 'usuń';
    delButton.className = 'delete-btn';
    delButton.addEventListener('click', () => deleteTodo(todo.id));

    li.append(checkbox, span, delButton);
    list.appendChild(li);
  });

  updateCounter();
}

// Zmiana statusu zadania
function toggleTodo(id) {
  const todo = todos.find(t => t.id === id);
  if (todo) todo.completed = !todo.completed;
  saveAndRender();
}

// Usuwanie zadania
function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id);
  saveAndRender();
}

// Licznik
function updateCounter() {
  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;
  counter.textContent = `${total} zadań • ${completed} ukończone`;
}

// Zapisywanie w localStorage
function saveAndRender() {
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos();
}

// Usuwanie wszystkich ukończonych
clearCompletedButton.addEventListener('click', () => {
  todos = todos.filter(t => !t.completed);
  saveAndRender();
});
//
