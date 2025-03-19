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
                topic_addModal.show();
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
        const closeBtn = topic_addModal.querySelector(".close");

        showModalBtn.addEventListener("click", (e) => {
            topic_addModal.show();
        });

        form_addTopic.addEventListener("submit", (e) => {
            e.preventDefault();

            /* TODO: Add client-side validation later */
            
            const title = add_topicTitle.value;
            const description = add_topicDesc.value;

            myTopics[title] = new Topic(title, description);
            saveData(myTopics);

            DOMHandler.rebuildDOM();
            topic_addModal.close();
        });

        closeBtn.addEventListener("click", (e) => {
            topic_addModal.close();
        });
    }
}

/* Driver code */
firstSetup();
TopicModal.setupListeners();
DOMHandler.rebuildDOM();

