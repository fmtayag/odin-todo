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

            topicsList.appendChild(item);
        }
    }
}

class AddTopicModal {
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
AddTopicModal.setupListeners();
DOMHandler.rebuildDOM();

