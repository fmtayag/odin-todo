import { loadData, STORAGE_KEY } from './data.js';
import { Topic } from './model.js';
import { addToLocal, clearTextFields, getAutoID } from './utils';

let boundEditListener = null;

export const openTopicModalForEdit = (e, id, title, desc) => {
    const modal = document.querySelector("#topicModal");
    const form = document.querySelector("#topicForm");
    populateTextFields(title, desc);
    modal.show();

    boundEditListener = submitFormForEdit.bind(null, e, id);
    form.addEventListener("submit", boundEditListener);
}

const populateTextFields = (title, desc) => {
    const titleField = document.querySelector("#topicTitle");
    const descField = document.querySelector("#topicDesc");
    titleField.value = title; 
    descField.value = desc;
}

const submitFormForEdit = (e, id) => {
    console.log(id);
    const title = document.querySelector("#topicTitle").value;
    const desc = document.querySelector("#topicDesc").value;
    
    const data = loadData();
    const topic = data[id];
    topic.title = title;
    topic.description = desc;
    addToLocal(id, topic);

    closeTopicModal();
}

const openTopicModal = () => {
    const modal = document.querySelector("#topicModal");
    const form = document.querySelector("#topicForm");
    modal.show();
    form.addEventListener("submit", submitForm);
};

const closeTopicModal = () => {
    const form = document.querySelector("#topicForm");
    const modal = document.querySelector("#topicModal");
    removeFormListeners();
    clearTextFields(form);
    modal.close();
}

const removeFormListeners = () => {
    const form = document.querySelector("#topicForm");
    form.removeEventListener("submit", submitForm);
    form.removeEventListener("submit", boundEditListener);
}

const submitForm = (e) => {
    const form = document.querySelector("#topicForm");
    // e.preventDefault();

    const title = document.querySelector("#topicTitle").value;
    const desc = document.querySelector("#topicDesc").value;
    
    const topic = new Topic(title, desc);
    const id = getAutoID();

    addToLocal(id, topic);

    clearTextFields(form);
    closeTopicModal();
}


export function createTopicListeners() {
    const openTopicBtn = document.querySelector("#openTopic");
    openTopicBtn.addEventListener("click", openTopicModal)

    const closeTopicBtn = document.querySelector("#closeTopic");
    closeTopicBtn.addEventListener("click", closeTopicModal);
}