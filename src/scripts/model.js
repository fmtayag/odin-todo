export class Todo {
    constructor(id, title, description, dueDate, priority, isDone=false) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isDone = isDone;
    }
}

export class Topic {
    constructor(title, description, todos=[]) {
        this.title = title;
        this.description = description;
        this.todos = todos;
    }
}
