import { Todo, Subtask, Topic, Priority } from './model.js';
import { generalTopic, scienceTopic } from './dummy.js';

const myTopics = {};
const STORAGE_KEY = "data";
const GENERAL_NAME = "General";
firstSetup();

function firstSetup() {
    /* 
        Sets up the program, assuming the user is using it for the first time
    */
    const generalTopic = new Topic(GENERAL_NAME, "These to-dos are uncategorized");
    localStorage.setItem(STORAGE_KEY, JSON.stringify([generalTopic]));
}

// /* Save data */
// localStorage.setItem(STORAGE_KEY, JSON.stringify([generalTopic, scienceTopic]));

// /* Load data */
// const dryData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

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
// localStorage.setItem(STORAGE_KEY, JSON.stringify(myTopics));


// console.log(myTopics);
