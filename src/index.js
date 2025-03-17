import { Todo, Subtask, Topic, Priority } from './scripts/model.js';
import { generalTopic, todo1, todo2, todo3 } from './scripts/dummy.js';
import { STORAGE_KEY, GENERAL_NAME, firstSetup, saveData, loadData } from './scripts/data.js';

firstSetup();
const myTopics = loadData();

// Program flow 
const scienceTopic = new Topic("Science", "Sciencey stuff goes here");
myTopics[scienceTopic.title] = scienceTopic;
createList();

const addTodoButton = document.querySelector("#addTodo");
const addTopicButton = document.querySelector("#addTopic");

addTodoButton.addEventListener("click", (e) => {
    container.innerHTML = ``;
    myTopics[generalTopic.title].addToCollection(
        new Todo("Test", "Desc", new Date(2025, 2, 5), Priority.High)
    )
    saveData(myTopics);
    createList();
});

addTopicButton.addEventListener("click", (e) => {
    const nameField = document.querySelector("#topicName");
    const descField = document.querySelector("#topicDescription");
    const topicName = nameField.value;
    const topicDesc = descField.value;
    
    container.innerHTML = ``;
    if(!myTopics.hasOwnProperty(topicName)) {
        myTopics[topicName] = new Topic(topicName, topicDesc);
    }
    else {
        console.log("Topic already exists");
    }
    saveData(myTopics);
    createList();
    e.preventDefault();
})

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
