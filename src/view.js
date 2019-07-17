import {createElement, EventEmitter} from './helpers.js';
class View extends EventEmitter{
    constructor() {
        super();

        this.form = document.getElementById('todo-form');
        this.input = document.getElementById('add-input');
        this.list = document.getElementById('todo-list');

        this.form.addEventListener('submit', this.handleAdd.bind(this));
    }

    createElement(todo){
        const checkbox = this.createElement('input', {type: 'checkbox', className: 'checkbox', checked: todo.comleted ? 'checked' : ''});
        const label = this.createElement('label', { className: 'title' }, todo.title);
        const editInput = createElement('input', {type: 'text', className: 'textField'});
        const editButton = createElement('button', {className: 'edit' }, 'Изменить');
        const removeButton = createElement('button', {className: 'remove' }, 'Удалить');

        const item = createElement('li', {className: `todoItem${todo.comleted ? ' completed' : ''}`, 'data-id': todo.id }, 
        checkbox, label, editInput, editButton, removeButton );

        return this.addEventListeners(item);
    }

    addEventListeners(item){

        const checkbox = listItem.querySelector('.checkbox');
        const editButton = listItem.querySelector('button.edit');
        const removeButton = listItem.querySelector('button.remove');

        checkbox.addEventListener('change', this.handleToggle.bind(this)); 
        editButton.addEventListener('click', this.handleEdit.bind(this)); 
        removeButton.addEventListener('click', this.handleRemove.bind(this));  

        return item;

    }

    handleAdd(event){
        event.preventDefalt();

        if(!this.input.value) return alert('Необходимо ввести название задачи');   

        const value = this.input.value;

        this.emit('add', value);
    }

    handleToggle({target}){

        const listItem = target.parentNode;

        const id = listItem.getAttribute('data-id');
        const completed = target.complited;

        this.emit('toggle', { id, complited });
    }

    handleEdit({target}){
        const listItem = target.parentNode; 
        const id = listItem.getAttribute('data-id');
        const label = listItem.querySelector('.title');
        const input = listItem.querySelector('.textfield');
        const editButton = listItem.querySelector('button.edit');
        const title = input.value;
        const isEditing = listItem.classList.contains('editing');

        if(isEditing) {
            this.emit('edit', {id, title});
        }else{
            input.value = label.textContent;
            editButton.textContent = 'Сохранить';
            listItem.classList.add('editing');
        }
    }

    handleRemove({target}){
        const listItem = target.parentNode;
        const id = listItem.getAttribute('data-id');

        this.emit('remove', id);
    }

    findListItem(id) {
        return this.list.querySelector(`[data-id="${id}"]`);
    }

    addItem(todo){  // Добавление эллемента в список
        const listItem = this.createElement(todo);

        this.input.value = '';
        this.list.appendChild(listItem);
    }

    toggleItem(todo) {
        const listItem = this.findListItem(todo.id);
        const checkbox = listItem.querySelector('.checkbox');
        
        checkbox.checked = todo.completed;
        if(todo.comleted){
            listItem.classList.add('completed');
        }
        else{
            listItem.classList.remove('completed');
        }        
    }
    editItem(todo){ // Редактирвание заголовка задачи
        const listItem = this.findListItem(todo.id);
        const label = listItem.querySelector('.title');
        const input = listItem.querySelector('.textfield');
        const editButton = listItem.querySelector('button.edit');

        label.textContent = todo.title;
        editButton.textContent = 'Изменить';
        listItem.classList.remove('editing');
    }

    removeItem(id) { // Удаление эллемента из списка
        const listItem = this.findListItem(todo.id);

        this.list.removeChild(listItem);
    }
}
export default View;