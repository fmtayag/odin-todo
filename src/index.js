import { Todo, Subtask, Topic, Priority } from './model.js';
import { generalTopic, scienceTopic } from './dummy.js';

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
