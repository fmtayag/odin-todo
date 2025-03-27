import { loadData, saveData } from "./data";
import { Todo } from "./model";
import { getAutoID } from "./utils";

let boundAddListener = null;

export const submitForm = (topicKey) => {
    const form = document.querySelector("#todoForm");
    const id = getAutoID();
    const title = document.querySelector("#todoTitle").value;
    const desc = document.querySelector("#todoDesc").value; 
    const due = new Date(document.querySelector("#todoDue").value); 
    const priority = document.querySelector("#todoPriority").value; 
    const isDone = document.querySelector("#todoDone").checked; 

    const todo = new Todo(title, desc, due, priority, isDone);
    const data = loadData();
    data[topicKey].todos[id] = todo;
    saveData(data);

    form.removeEventListener("submit", boundAddListener)
}

export const openTodoModal = (topicKey) => {
    const modal = document.querySelector("#todoModal");
    const form = document.querySelector("#todoForm");
    const dateField = document.querySelector("#todoDue");
    dateField.value = new Date().toISOString().substring(0, 10);
    boundAddListener = submitForm.bind(null, topicKey);
    form.addEventListener("submit", boundAddListener);
    modal.show();
}

const closeTodoModal = () => {
    const form = document.querySelector("#todoForm");
    form.removeEventListener("submit", boundAddListener);

    const modal = document.querySelector("#todoModal");
    modal.close();
}

export function createTodoListeners() {
    // const openTodoBtn = document.querySelector("#openTodo");
    // openTodoBtn.addEventListener("click", openTodoModal);

    const closeTodoBtn = document.querySelector("#closeTodo");
    closeTodoBtn.addEventListener("click", closeTodoModal);
}