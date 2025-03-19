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
    constructor(title, description, toDoCollection=[]) {
        this.title = title;
        this.description = description;
        this.toDoCollection = toDoCollection;
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
}


