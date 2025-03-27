import { loadData, saveData } from './data.js';
import { Topic } from './model.js';
import { addToLocal, clearTextFields, getAutoID } from './utils';

const ID_TARGETS = (function() {
    return {
        MODAL: "#topicModal",
        FORM: "#topicForm",
        TITLE: "#topicTitle",
        DESC: "#topicDesc",
        OPEN_BUTTON: "#openTopic",
        CLOSE_BUTTON: "#closeTopic",
    } 
}) ();

let boundEditListener = null;

export const deleteTopic = (e, id) => {
    const data = loadData();
    delete data[id];
    saveData(data);
    location.reload();
    return false;
}

export const openTopicModalForEdit = (e, id, title, desc) => {
    const modal = document.querySelector(ID_TARGETS.MODAL);
    const form = document.querySelector(ID_TARGETS.FORM);
    populateTextFields(title, desc);
    modal.show();

    boundEditListener = submitFormForEdit.bind(null, e, id);
    form.addEventListener("submit", boundEditListener);
}

const populateTextFields = (title, desc) => {
    const titleField = document.querySelector(ID_TARGETS.TITLE);
    const descField = document.querySelector(ID_TARGETS.DESC);
    titleField.value = title; 
    descField.value = desc;
}

const submitFormForEdit = (e, id) => {
    console.log(id);
    const title = document.querySelector(ID_TARGETS.TITLE).value;
    const desc = document.querySelector(ID_TARGETS.DESC).value;
    
    const data = loadData();
    const topic = data[id];
    topic.title = title;
    topic.description = desc;
    saveData(data);

    closeTopicModal();
}

const openTopicModal = () => {
    const modal = document.querySelector(ID_TARGETS.MODAL);
    const form = document.querySelector(ID_TARGETS.FORM);
    modal.show();
    form.addEventListener("submit", submitForm);
};

const closeTopicModal = () => {
    const modal = document.querySelector(ID_TARGETS.MODAL);
    const form = document.querySelector(ID_TARGETS.FORM);
    removeFormListeners();
    clearTextFields(form);
    modal.close();
}

const removeFormListeners = () => {
    const form = document.querySelector(ID_TARGETS.FORM);
    form.removeEventListener("submit", submitForm);
    form.removeEventListener("submit", boundEditListener);
}

const submitForm = (e) => {
    const form = document.querySelector(ID_TARGETS.FORM);
    // e.preventDefault();

    const title = document.querySelector(ID_TARGETS.TITLE).value;
    const desc = document.querySelector(ID_TARGETS.DESC).value;
    
    const topic = new Topic(title, desc);
    const id = getAutoID();

    addToLocal(id, topic);

    clearTextFields(form);
    closeTopicModal();
}


export function createTopicListeners() {
    const openBtn = document.querySelector(ID_TARGETS.OPEN_BUTTON);
    openBtn.addEventListener("click", openTopicModal)

    const closeBtn = document.querySelector(ID_TARGETS.CLOSE_BUTTON);
    closeBtn.addEventListener("click", closeTopicModal);
}