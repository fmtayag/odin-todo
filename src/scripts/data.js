import { Todo, Subtask, Topic, Priority } from './model.js';

/* Global names */
export const STORAGE_KEY = "data";
export const GENERAL_NAME = "General";

export function firstSetup() {
    /* 
        Sets up the program, assuming the user is using it for the first time
    */
    if(localStorage.getItem(STORAGE_KEY) === null) {
        const generalTopic = new Topic(GENERAL_NAME, "These to-dos are uncategorized");
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
                [GENERAL_NAME]: generalTopic,
            }
        ));
        console.log("Set up finished!");
    }
    else {
        console.log("Already set up!");
    }
}

export function saveData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function loadData() {
    const dryData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    const data = {};

    for(let key in dryData) {
        const topic = new Topic(dryData[key].title, dryData[key].description);

        for(const dryTodo of dryData[key].toDoCollection) {

            const todo = new Todo(
                dryTodo.title,
                dryTodo.description,
                new Date(dryTodo.dueDate),
                Priority.hydrate(dryTodo.priority),
                dryTodo.subtasks.map( subtask => new Subtask(subtask.description, subtask.isDone))
            )
            topic.addToCollection(todo);
        }

        data[topic.title] = topic;
    }

    return data;
}