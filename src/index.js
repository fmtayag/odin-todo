import { Todo, Subtask, Topic, Priority } from './scripts/model.js';
import { todo1, todo2, todo3 } from './scripts/dummy.js';
import { STORAGE_KEY, GENERAL_NAME, firstSetup, saveData, loadData } from './scripts/data.js';

firstSetup();
const myTopics = loadData();

// Program flow 
const scienceTopic = new Topic("Science", "Sciencey stuff goes here");
createList();

const addTodoButton = document.querySelector("#addTodo");

addTodoButton.addEventListener("click", (e) => {
    container.innerHTML = ``;
    myTopics[scienceTopic.title].addToCollection(
        new Todo("Test", "Desc", new Date(2025, 2, 5), Priority.High)
    )
    saveData(myTopics);
    createList();
});

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

// TODO: Program end
/* Perhaps make it so that it saves the data after a certain time has elapsed? Or after page has unloaded */ 
saveData(myTopics);
