import { Todo, Subtask, Topic, Priority } from './model.js';
import { generalTopic, scienceTopic } from './dummy.js';

const STORAGE_KEY = "data";
const GENERAL_NAME = "General";

firstSetup();
const myTopics = loadData();

// myTopics["Science"].moveTodo(myTopics["General"], 0);
saveData(myTopics);

function firstSetup() {
    /* 
        Sets up the program, assuming the user is using it for the first time
    */
    const generalTopic = new Topic(GENERAL_NAME, "These to-dos are uncategorized");
    localStorage.setItem(STORAGE_KEY, JSON.stringify([generalTopic]));
}

function saveData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadData() {
    const dryData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const data = [];

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

        data[topic.title] = topic;
    }

    return data;
}