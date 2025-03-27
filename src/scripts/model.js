export class Todo {
    constructor(title, description, dueDate, priority, isDone=false) {
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
