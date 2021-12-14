'use strict';
const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');
let todoData = [];

if (localStorage.todoData) {
    todoData = JSON.parse(localStorage.getItem('todoData'));
}
const render = function () {
    todoList.innerHTML = '';
    todoCompleted.innerHTML = '';
    todoData.forEach(function (item, index) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = '<span class="text-todo">' + item.text + '</span>'
            + '<div class="todo-buttons">'
            + '<button class="todo-remove"></button>'
            + '<button class="todo-complete"></button>'
            + '</div>';
        if (item.completed) {
            todoCompleted.append(li);
        }
        else {
            todoList.append(li);
        }

        li.querySelector('.todo-remove').addEventListener('click', function () {
            if (todoData.length > 1) {
                todoData.splice(index, index);
            }
            else
                todoData = [];

            console.dir(todoData);
            render();
        })

        li.querySelector('.todo-complete').addEventListener('click', function () {
            item.completed = !item.completed;
            render();
        })
        localStorage.setItem('todoData', JSON.stringify(todoData));
    });
}

todoControl.addEventListener('submit', function (e) {
    e.preventDefault();
    if (headerInput.value.trim()) {
        const newTodo = {
            text: headerInput.value,
            completed: false
        }
        todoData.push(newTodo);
        headerInput.value = '';
        render();
    }

})

render();
