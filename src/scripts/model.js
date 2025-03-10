export class Todo {
    constructor(title, description, dueDate, priority, subtasks=[], isDone=false) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.subtasks = subtasks;
        this.isDone = isDone;
    }

    addSubtask(subtask) {
        this.subtasks.push(subtask);
    }

    removeSubtask(index) {
        this.subtasks.splice(index, 1);
    }
}

export class Subtask {
    constructor(description, isDone=false) {
        this.description = description;
        this.isDone = isDone;
    }
}

export class Topic {
    constructor(title, description, toDoCollection=[]) {
        this.title = title;
        this.description = description;
        this.toDoCollection = toDoCollection;
    }

    addToCollection(todo) {
        this.toDoCollection.push(todo);
    }

    removeTodo(todoIndex) {
        this.toDoCollection.splice(todoIndex, 1);
    }

    moveTodo(source, todoIndex) {
        // Retrieve todo
        const todo = source.toDoCollection.find(
            (item, index) => index === todoIndex
        );
        // Add todo to this topic
        this.addToCollection(todo);
        
        // Remove todo from source topic 
        source.removeTodo(todoIndex);
    }
}

export class Priority {
    static #_NONE = 0;
    static #_LOW = 1; 
    static #_MED = 2;
    static #_HIGH = 3;

    static get None() {
        return this.#_NONE;
    }
    static get Low() {
        return this.#_LOW;
    }
    static get Medium() {
        return this.#_MED;
    }
    static get High() {
        return this.#_HIGH;
    }
    static hydrate(value) {
        switch(value) {
            default:
            case 0: return this.#_NONE;
            case 1: return this.#_LOW;
            case 2: return this.#_MED;
            case 3: return this.#_HIGH;
        }
    }
}


