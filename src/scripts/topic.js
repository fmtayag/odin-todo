import { Topic } from './model.js';
import { addToLocal, clearTextFields, getAutoID } from './utils';

const openTopicModal = () => {
    const modal = document.querySelector("#topicModal");
    const form = document.querySelector("#topicForm");
    form.addEventListener("submit", submitForm);
    modal.show();
};

const closeTopicModal = () => {
    const modal = document.querySelector("#topicModal");
    modal.close();
}

const submitForm = (e) => {
    const form = document.querySelector("#topicForm");
    e.preventDefault();

    const title = document.querySelector("#topicTitle").value;
    const desc = document.querySelector("#topicDesc").value;
    createTopic(title, desc);
    clearTextFields(form);

    /* Clean up event listener */
    form.removeEventListener("submit", submitForm);

    closeTopicModal();
}

const createTopic = (title, desc) => {
    const topic = new Topic(title, desc);
    const id = getAutoID();

    addToLocal(id, topic);
}   

export function createTopicListeners() {
    const openTopicBtn = document.querySelector("#openTopic");
    openTopicBtn.addEventListener("click", openTopicModal)

    const closeTopicBtn = document.querySelector("#closeTopic");
    closeTopicBtn.addEventListener("click", closeTopicModal);
}