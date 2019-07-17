class Controller{
    constructor(model, view) {
        this.model = model;
        this.view = view;

        view.on('add', this.addTodo.bind(this));
        view.on('toggle', this.toggleTodo.bind(this));
        view.on('edit', this.editTodo.bind(this));
        view.on('remove', this.removeTodo.bind(this));
    }

    addTodo(title){
        const todo = this.model.addItem({
            id: Date.now(),
            title,
            completed: false
        });

        this.view.addItem(todo);
    }
    toggleTodo(){

    }
    editTodo(){

    }
    removeTodo(){
        
    }
}