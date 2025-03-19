import { Todo, Topic, Priority } from './model.js';

/* Global names */
export const STORAGE_KEY = "data";
export const HOME_NAME = "Home";
export const WORK_NAME = "Work";

export function firstSetup() {
    /* 
        Sets up the program, assuming the user is using it for the first time
    */
    if(localStorage.getItem(STORAGE_KEY) === null) {
        const homeTopic = new Topic(HOME_NAME, "Home tasks goes here!");
        const workTopic = new Topic(WORK_NAME, "Work tasks goes here!");
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
                [HOME_NAME]: homeTopic,
                [WORK_NAME]: workTopic,
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

        for(const dryTodo of dryData[key].todos) {
            const todo = new Todo(
                dryTodo.id,
                dryTodo.title,
                dryTodo.description,
                new Date(dryTodo.dueDate),
                dryTodo.priority,
                dryTodo.isDone
            )
            topic.addTodo(todo);
        }

        data[topic.title] = topic;
    }
    return data;    
}