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
    constructor(description, isDone=false) {
        this.description = description;
        this.isDone = isDone;
    }
}

class Topic {
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
        const todo = source.toDoCollection.filter(
            (item, index) => index === todoIndex
        );
        // Add todo to this topic
        this.addToCollection(todo);
        
        // Remove todo from source topic 
        source.removeTodo(todoIndex);
    }
}

class Priority {
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


const todo1 = new Todo(
    "Create a science thingamajig",
    "A thingmajig to do amazing things!",
    new Date(2025, 3, 8),
    Priority.High,
    [
        new Subtask("Buy green goo"),
        new Subtask("Acquire laser beam"),
        new Subtask("Assemble remote control"),
        new Subtask("Put it all together"),
    ]
)

const todo2 = new Todo(
    "Task 2",
    "Description 2!",
    new Date(2025, 3, 8),
    Priority.High,
    [
        new Subtask("Buy green goo"),
        new Subtask("Acquire laser beam"),
    ]
)

const todo3 = new Todo(
    "Task 3",
    "Description 3!",
    new Date(2025, 3, 8),
    Priority.High,
    [
        new Subtask("Buy green goo"),
        new Subtask("Put it all together"),
    ]
)

const generalTopic = new Topic(
    "General",
    "These to-dos are uncategorized",
    [todo1, todo2, todo3]
)

const scienceTopic = new Topic(
    "Science",
    "My science projects"
)

/* Save data */
const STORAGE_KEY = "data"
localStorage.setItem(STORAGE_KEY, JSON.stringify([generalTopic, scienceTopic]));

/* Load data */
const dryData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
const myTopics = {};

for(const dryTopic of dryData) {
    const topic = new Topic(dryTopic.title, dryTopic.description);

    for(const dryTodo of dryTopic.toDoCollection) {

        const todo = new Todo(
            dryTodo.title,
            dryTodo.description,
            new Date(dryTodo.dueDate),
            Priority.hydrate(dryTodo.priority),
            dryTodo.subtasks.map( subtask => new Subtask(subtask.description, subtask.isDone))
        )
        topic.addToCollection(todo);
    }

    myTopics[topic.title] = topic;
}

myTopics["Science"].moveTodo(myTopics["General"], 0);

console.log(myTopics);
