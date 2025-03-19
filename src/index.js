import { Todo, Topic, Priority } from './scripts/model.js';
import { generalTopic, todo1, todo2, todo3 } from './scripts/dummy.js';
import { STORAGE_KEY, HOME_NAME, firstSetup, saveData, loadData } from './scripts/data.js';
import './styles/style.css';

/* Global 'myTopics' that acts as a data cache */
const myTopics = loadData();

class DOMHandler {
    static rebuildDOM(){
        this.#rebuildTopicList();
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

                topicForm.addEventListener("submit", function updateTopic(e) {
                    e.preventDefault();
        
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
                    
                    this.removeEventListener("submit", updateTopic);
                });
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

class TopicModal {
    static setupListeners() {
        const showModalBtn = document.querySelector("#newTopic");
        const closeBtn = topicModal.querySelector(".close");

        showModalBtn.addEventListener("click", (e) => {
            topicModal.show();
            topicTitle.value = '';
            topicDesc.value = '';

            topicForm.addEventListener("submit", function createNewTopic(e) {
                e.preventDefault();
    
                /* TODO: Add client-side validation later */
                
                const title = topicTitle.value;
                const description = topicDesc.value;
    
                myTopics[title] = new Topic(title, description);
                saveData(myTopics);
    
                DOMHandler.rebuildDOM();
                topicModal.close();

                this.removeEventListener("submit", createNewTopic);
            });
        });

        closeBtn.addEventListener("click", (e) => {
            topicModal.close();
        });
    }
}

/* Driver code */
firstSetup();
TopicModal.setupListeners();
DOMHandler.rebuildDOM();

