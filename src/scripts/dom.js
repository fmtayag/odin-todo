import { loadData } from "./data";
import { deleteTopic, openTopicModalForEdit } from "./topic";
import { deleteTodo, openTodoModal, openTodoModalForEdit } from "./todo";
import { createButton } from "./utils";

const listTodos = (topicKey, topic) => {
    const header = document.querySelector("#currentTopic");
    header.textContent = topic.title;

    /* Create button for opening todo modal */
    const buttonHolder = document.querySelector("#buttonHolder");
    buttonHolder.innerHTML = "";

    const openTodoBtn = createButton("New Todo");
    openTodoBtn.addEventListener("click", () => openTodoModal(topicKey));

    buttonHolder.appendChild(openTodoBtn);

    /* Create the list */
    const list = document.querySelector("#todos");
    list.innerHTML = "";
    const data = loadData();

    for (const todoKey in data[topicKey].todos) {
        const todo = data[topicKey].todos[todoKey];

        const listItem = document.createElement("li");
        listItem.textContent = todo.title;
        listItem.addEventListener("click", () => { openTodoModalForEdit(topicKey, todoKey) })

        const deleteButton = createButton("Delete", (e) => { e.stopPropagation(); deleteTodo(topicKey, todoKey); });
        listItem.appendChild(deleteButton);

        list.appendChild(listItem);
    }
}

export const openDefaultTopic = () => {
    const data = loadData();
    if (Object.keys(data).length > 0) {
        const key = Object.keys(data)[0];
        const topic = data[key];

        listTodos(key, topic);
    }
}

export const listTopics = () => {
    const list = document.querySelector("#topics");
    const data = loadData();

    for (const key in data) {
        const topic = data[key];
        const listItem = document.createElement("li");
        listItem.textContent = topic.title;
        listItem.addEventListener("click", () => listTodos(key, topic));

        const editButton = createButton("Edit", (e) => {
            e.stopPropagation();
            openTopicModalForEdit(e, key, topic.title, topic.description)
        });
        const deleteButton = createButton("Delete", (e) => {
            e.stopPropagation();
            deleteTopic(e, key)
        });

        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
        list.appendChild(listItem);
    }
}