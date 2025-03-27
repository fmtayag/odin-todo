import { loadData, saveData } from "./data";
import { Todo } from "./model";
import { getAutoID } from "./utils";

let boundAddListener = null;
let boundEditListener = null;

export const openTodoModalForEdit = (topicKey, todoKey) => {
    const modal = document.querySelector("#todoModal");
    const form = document.querySelector("#todoForm");
    modal.show();
    populateInputs(topicKey, todoKey);

    boundEditListener = submitFormForEdit.bind(null, topicKey, todoKey);
    form.addEventListener("submit", boundEditListener);
}

const submitFormForEdit = (topicKey, todoKey) => {
    const title = document.querySelector("#todoTitle").value;
    const desc = document.querySelector("#todoDesc").value;
    const due = new Date(document.querySelector("#todoDue").value);
    const priority = document.querySelector("#todoPriority").value;
    const isDone = document.querySelector("#todoDone").checked; 

    const data = loadData();

    const todo = data[topicKey].todos[todoKey];
    todo.title = title;
    todo.description = desc;
    todo.dueDate = due; 
    todo.priority = priority;
    todo.isDone = isDone;
    
    saveData(data);
}

const populateInputs = (topicKey, todoKey) => {
    const data = loadData();
    const todo = data[topicKey].todos[todoKey];

    const titleField = document.querySelector("#todoTitle");
    const descField = document.querySelector("#todoDesc");
    const dueField = document.querySelector("#todoDue");
    const prioritySelect = document.querySelector("#todoPriority");
    const isDoneCheckbox = document.querySelector("#todoDone");

    console.log("Hello");
    console.log(todo);

    titleField.value = todo.title;
    descField.value = todo.description;
    dueField.value = todo.dueDate.toISOString().substring(0, 10);
    prioritySelect.value = todo.priority;
    isDoneCheckbox.checked = todo.isDone;
}

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

export const deleteTodo = (topicKey, todoKey) => {
    const data = loadData();
    delete data[topicKey].todos[todoKey];
    saveData(data);

    location.reload();
    return false;
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
    form.removeEventListener("submit", boundEditListener);

    const modal = document.querySelector("#todoModal");
    modal.close();
}

export function createTodoListeners() {
    // const openTodoBtn = document.querySelector("#openTodo");
    // openTodoBtn.addEventListener("click", openTodoModal);

    const closeTodoBtn = document.querySelector("#closeTodo");
    closeTodoBtn.addEventListener("click", closeTodoModal);
}