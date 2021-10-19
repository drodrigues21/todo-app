// Get theme from local storage
let darkMode = localStorage.getItem('darkMode');

// Get elements from the DOM
const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-item input');
const todosContainer = document.querySelector('.todos');
const todoCount = document.querySelector('.counter span');
const clearCompleted = document.querySelector('.clear-completed');
const themeBtn = document.querySelector('.theme-btn');
const themeBgImg = document.querySelector('.bg-img');

// Create todo item template and save the value of the todo input on local storage
const createTodo = (todo) => {
    // Delete button container and image
    const deleteImg = document.createElement('img');
    deleteImg.classList.add('delete-btn');
    deleteImg.src = './images/icon-cross.svg';

    const deleteBtn = document.createElement('div');

    deleteBtn.appendChild(deleteImg);

    // Todo text and checkbox
    const checkbox = document.createElement('div');
    checkbox.classList.add('checkbox');
    checkbox.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>`;

    const todoP = document.createElement('p');
    todoP.textContent = todo;

    const todoText = document.createElement('div');
    todoText.classList.add('todo-text');

    todoText.appendChild(checkbox);
    todoText.appendChild(todoP);

    // Todo li container
    const todoLi = document.createElement('li');
    todoLi.classList.add('todo', 'todo-item');

    todoLi.appendChild(todoText);
    todoLi.appendChild(deleteBtn);

    // Append to the todo (ul) container
    todosContainer.appendChild(todoLi);

    saveLocalTodos(todo);
}

// Save the user input to local storage 
const saveLocalTodos = (todo) => {
    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Get the data from local storage and render on page reload
const getLocalTodos = () => {
    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach((todo) => {
        // Delete button container and image
        const deleteImg = document.createElement('img');
        deleteImg.classList.add('delete-btn');
        deleteImg.src = './images/icon-cross.svg';

        const deleteBtn = document.createElement('div');

        deleteBtn.appendChild(deleteImg);

        // Todo text and checkbox
        const checkbox = document.createElement('div');
        checkbox.classList.add('checkbox');
        checkbox.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>`;

        const todoP = document.createElement('p');
        todoP.textContent = todo;

        const todoText = document.createElement('div');
        todoText.classList.add('todo-text');

        todoText.appendChild(checkbox);
        todoText.appendChild(todoP);

        // Todo li container
        const todoLi = document.createElement('li');
        todoLi.classList.add('todo', 'todo-item');

        todoLi.appendChild(todoText);
        todoLi.appendChild(deleteBtn);

        // Append to the todo (ul) container
        todosContainer.appendChild(todoLi);
    });
}

// Darkmode toggle
const enableDarkMode = () => {
    // Add the class darkmode to the body
    document.body.classList.add('darkmode');
    // Change theme icon
    themeBtn.firstElementChild.src = `./images/icon-sun.svg`;
    // Change theme bg image
    themeBgImg.children[0].srcset = `./images/bg-mobile-dark.jpg`;
    themeBgImg.children[1].src = `./images/bg-desktop-dark.jpg`;

    // Update darkmode in the local storage
    localStorage.setItem('darkMode', 'enabled');
}

const disableDarkMode = () => {
    // Remove the class darkmode from the body
    document.body.classList.remove('darkmode');
    // Change theme icon
    themeBtn.firstElementChild.src = `./images/icon-moon.svg`;
    // Change theme bg image
    themeBgImg.children[0].srcset = `./images/bg-mobile-light.jpg`;
    themeBgImg.children[1].src = `./images/bg-desktop-light.jpg`;
    // Update darkmode in the local storage
    localStorage.setItem('darkMode', null);
}
// Check if dark mode is enabled
if (darkMode === 'enabled') {
    enableDarkMode();
}

// Remove todo from local storage
const deleteLocalTodo = (todo) => {
    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex = todo.textContent;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Check completed todos and delete todos
const checkDelete = (e) => {
    const item = e.target;

    if (item.classList.contains('delete-btn')) {
        const todo = item.parentElement.parentElement;
        todo.classList.add('remove');

        todo.addEventListener('transitionend', () => {
            todo.remove();
        });

        deleteLocalTodo(todo);
        count();
    }

    if (item.classList.contains('checkbox')) {
        const completed = item.parentElement.parentElement;
        completed.classList.toggle('checked');
    }

}

// Count the todo items and add to the counter
const count = () => {
    let todos = JSON.parse(localStorage.getItem('todos'));
    let todoLeft = todos.length;

    todoCount.textContent = `${todoLeft}`;
}


// Event listeners
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const todo = todoInput.value.trim();

    if (todo.length > 1) {
        // Call create todo item function and clear the input
        createTodo(todo);
        todoForm.reset();
        count();
    }
});

todosContainer.addEventListener('click', (e) => {
    checkDelete(e);
});

// Event listener on page reload to get local storage
document.addEventListener('DOMContentLoaded', () => {
    getLocalTodos();
    count();
});

// Toggle dark mode
themeBtn.addEventListener('click', () => {
    darkMode = localStorage.getItem('darkMode');
    if (darkMode !== 'enabled') {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
});