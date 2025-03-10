import { Todo, Subtask, Topic, Priority } from './model.js';

/*
========================
        TO-DO
========================
*/

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

/* User story: Mark the to-do as complete so that I can track my progress */
todo1.isDone = true;

/* User story: Set a due date on the to-do so that I don't miss deadlines  */
todo1.dueDate = new Date(2025, 2, 12);

/* User story: Set a priority on the to-do so that I can focus on the most important tasks first */
todo1.priority = Priority.Low;

/* User story: Add sub-tasks so that I can break-down larger tasks into more manageable steps */
todo1.addSubtask(new Subtask("New subtask!"));

/*
========================
        SUBTASKS
========================
*/

/* User story: Create a new subtask so that I can break down larger tasks to smaller ones */
const subtask1 = new Subtask("An even more brand new subtask");
todo1.addSubtask(subtask1);

/* User story: Edit the description so that I can correct mistakes */
subtask1.description = "Edited a subtask";
todo1.subtasks[0].description = "Edited description";

/* User story: Mark the subtask as done so that I can track my progress */
todo1.subtasks[0].isDone = true;

/* User story: Delete a subtask so that I can unnecessary steps from my to-do list */
todo1.removeSubtask(0);

/*
========================
        TOPICS
========================
*/

/* User story: Create topics so that I can organize my to-dos */
/* User story: Assign a to-do to a topic so that I can track tasks related to different areas of work, or life */
/* User story: Add a short description so that I know what kind of to-dos belong to it */
const generalTopic = new Topic(
    "General",
    "These to-dos are uncategorized",
    [todo1, todo2, todo3]
)

const scienceTopic = new Topic(
    "Science",
    "My science projects"
)
const myData = [generalTopic, scienceTopic];

/* User story: Update the name of a topic so that I can correct mistakes or refine its meaning  */
scienceTopic.description = "Even More Sciencey";

/* User story: Delete a topic so that I can remove already finished or irrelevant categories  */
myData.splice(1, 1);

console.log(myData);

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
