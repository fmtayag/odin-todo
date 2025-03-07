class Todo {
    constructor(title, description, dueDate, priority, subtasks, isDone=false) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.subtasks = subtasks;
        this.isDone = isDone;
    }
}

class Subtask {
    constructor(description, isDone) {
        this.description = description;
        this.isDone = isDone;
    }
}

class Topic {
    constructor(title, description, toDoCollection) {
        this.title = title;
        this.description = description;
        this.toDoCollection = toDoCollection;
    }
}
