import { Todo, Subtask, Topic, Priority } from './scripts/model.js';
import { todo1, todo2, todo3 } from './scripts/dummy.js';
import { STORAGE_KEY, GENERAL_NAME, firstSetup, saveData, loadData } from './scripts/data.js';

firstSetup();
const myTopics = loadData();

// Program flow 
const scienceTopic = new Topic("Science", "Sciencey stuff goes here");
myTopics[scienceTopic.title] = scienceTopic;
createList();

function createList() {
    console.log(myTopics);
    for(const topic in myTopics) {
        
        const h3 = document.createElement("h1"); 
        const ul = document.createElement("ul");
        h3.textContent = topic;

        for(const todo of myTopics[topic].toDoCollection) {
            const li = document.createElement("li");
            li.textContent = `${todo.title}: ${todo.description} (${todo.dueDate})`;
            li.dataset.index = myTopics[topic].toDoCollection.indexOf(todo);

            ul.appendChild(li);
        }

        container.appendChild(h3);
        container.appendChild(ul);
    }
}
// myTopics[GENERAL_NAME].addToCollection(todo1);
// myTopics[GENERAL_NAME].addToCollection(todo2);
// myTopics[GENERAL_NAME].addToCollection(todo3);
// myTopics[GENERAL_NAME].removeTodo(0);

// Program end
saveData(myTopics);
