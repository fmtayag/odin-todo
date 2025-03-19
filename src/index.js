import { Todo, Topic, Priority } from './scripts/model.js';
import { generalTopic, todo1, todo2, todo3 } from './scripts/dummy.js';
import { STORAGE_KEY, HOME_NAME, firstSetup, saveData, loadData } from './scripts/data.js';
import './styles/style.css';

/* Global 'myTopics' that acts as a data cache */
const myTopics = loadData();

const createTopicListener = event => { 
    event.preventDefault();
    createNewTopic();
};

const updateTopicListener = (key, event) => {
    event.preventDefault();
    updateTopic(key);
}

let boundUpdateTopicListener = null;

class DOMHandler {
    static rebuildDOM(){
        this.#rebuildTopicList();
        console.log(myTopics);
    }

    static #rebuildTopicList() {
        const topicsList = document.querySelector("#topics");
        topicsList.innerHTML = ``;

        for (const key in myTopics) {
            const item = document.createElement("li");
            item.textContent = key;

            const editButton = document.createElement("button");
            editButton.type = "button";
            editButton.textContent = "Edit";
            editButton.addEventListener("click", (e) => {
                topicModal.show();

                topicTitle.value = myTopics[key].title;
                topicDesc.value = myTopics[key].description;
                boundUpdateTopicListener = updateTopicListener.bind(null, key);

                topicForm.addEventListener("submit", boundUpdateTopicListener);
            });

            const deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", (e) => {
                delete myTopics[key]
                saveData(myTopics);
                this.rebuildDOM();
            });

            item.appendChild(editButton);
            item.appendChild(deleteButton);
            topicsList.appendChild(item);
        }
    }
}

class TodoModal {
    static setupListeners() {
        const showModalBtn = document.querySelector("#newTodo");
        const closeBtn = todoModal.querySelector(".close");

        showModalBtn.addEventListener("click", (e) => {
            todoModal.show();
            this.#populateTopicSelect();
            todoDue.value = new Date().toISOString().slice(0, 10);

            todoForm.addEventListener("submit", function createNewTodo(e) {
                e.preventDefault();

                /* TODO: Add client-side validation later */

                const id = new Date().getTime(); /* Pseudo auto-id */
                const title = todoTitle.value;
                const description = todoDesc.value;
                const due = new Date(todoDue.value);
                const priority = todoPriority.value; 
                const isDone = todoDone.checked;
                const topic = todoTopics.value; 

                const todo = new Todo(id, title, description, due, priority, isDone);
                myTopics[topic].addTodo(todo);
                saveData(myTopics);

                DOMHandler.rebuildDOM();
                todoModal.close();

                // console.log(id, title, description, due, due, priority, isDone, topic);
                // console.log(myTopics);
            })
        });

        closeBtn.addEventListener("click", (e) => {
            todoModal.close();
        });
    }

    static #populateTopicSelect() {
        for(const topic in myTopics) {
            const option = document.createElement("option");
            option.value = topic;
            option.textContent = topic;
            todoTopics.appendChild(option);
        }
    }
}

class TopicModal {
    static setupListeners() {
        const showModalBtn = document.querySelector("#newTopic");
        const closeBtn = topicModal.querySelector(".close");

        showModalBtn.addEventListener("click", (e) => {
            topicModal.show();
            topicTitle.value = '';
            topicDesc.value = '';
            
            topicForm.addEventListener("submit", createTopicListener);
        });

        closeBtn.addEventListener("click", (e) => {
            topicModal.close();
            topicForm.removeEventListener("submit", createTopicListener);
            topicForm.removeEventListener("submit", boundUpdateTopicListener);
        });
    }
}

function createNewTopic() {
    console.log("Hello");
    /* TODO: Add client-side validation later */
    
    const title = topicTitle.value;
    const description = topicDesc.value;

    myTopics[title] = new Topic(title, description);
    saveData(myTopics);

    DOMHandler.rebuildDOM();
    topicModal.close();

    topicForm.removeEventListener("submit", createTopicListener);
}

function updateTopic(key) {
    /* TODO: Add client-side validation later */
    const newTitle = topicTitle.value;
    const newDescription = topicDesc.value;
    
    myTopics[key].title = newTitle;
    myTopics[key].description = newDescription;
    
    if(key !== newTitle) {
        myTopics[newTitle] = myTopics[key];
        delete myTopics[key];
    }

    saveData(myTopics);
    DOMHandler.rebuildDOM();
    topicModal.close();
    
    topicForm.removeEventListener("submit", boundUpdateTopicListener);
}

/* Driver code */
firstSetup();
TodoModal.setupListeners();
TopicModal.setupListeners();
DOMHandler.rebuildDOM();

