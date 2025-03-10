import { Todo, Subtask, Topic, Priority } from './model.js';

/* User story: Create a new to-do so that I can keep track of my tasks */
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

/* User story: Edit the title, and description so that I can update my task with new info */
todo3.title = "New Title for Task 3";
todo3.description = "New description for Task 3";

const generalTopic = new Topic(
    "General",
    "These to-dos are uncategorized",
    [todo1, todo2, todo3]
)

const scienceTopic = new Topic(
    "Science",
    "My science projects"
)

/* User story: Mark the to-do as complete so that I can track my progress */
todo1.isDone = true;

/* User story: Set a due date on the to-do so that I don't miss deadlines  */
todo1.dueDate = new Date(2025, 2, 12);

/* User story: Set a priority on the to-do so that I can focus on the most important tasks first */
todo1.priority = Priority.Low;

console.log([todo1, todo2, todo3]);

// /* Save data */
// const STORAGE_KEY = "data"
// localStorage.setItem(STORAGE_KEY, JSON.stringify([generalTopic, scienceTopic]));

// /* Load data */
// const dryData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
// const myTopics = {};

// for(const dryTopic of dryData) {
//     const topic = new Topic(dryTopic.title, dryTopic.description);

//     for(const dryTodo of dryTopic.toDoCollection) {

//         const todo = new Todo(
//             dryTodo.title,
//             dryTodo.description,
//             new Date(dryTodo.dueDate),
//             Priority.hydrate(dryTodo.priority),
//             dryTodo.subtasks.map( subtask => new Subtask(subtask.description, subtask.isDone))
//         )
//         topic.addToCollection(todo);
//     }

//     myTopics[topic.title] = topic;
// }

// myTopics["Science"].moveTodo(myTopics["General"], 0);

// console.log(myTopics);
