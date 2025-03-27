import { Todo, Topic } from './model.js';
import { getAutoID } from './utils.js';

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
        const homeId = getAutoID();
        const workId = getAutoID() + 1;
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
                [homeId]: homeTopic,
                [workId]: workTopic,
            }
        ));
    }
}

export function saveData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function loadData() {
    const dryData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    const data = {};

    for(let topicKey in dryData) {
        const topic = new Topic(dryData[topicKey].title, dryData[topicKey].description);

        for(const todoKey in dryData[topicKey].todos) {
            const dryTodo = dryData[topicKey].todos[todoKey];
            const todo = new Todo(
                dryTodo.title,
                dryTodo.description,
                new Date(dryTodo.dueDate),
                dryTodo.priority,
                dryTodo.isDone
            )
            topic.todos[todoKey] = todo;
        }

        data[topicKey] = topic;
    }
    return data;    
}