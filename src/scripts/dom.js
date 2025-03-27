import { loadData } from "./data";
import { deleteTopic, openTopicModalForEdit } from "./topic";
import { createButton } from "./utils";

const listTodos = (key, topic) => {
    const header = document.querySelector("#currentTopic");
    const openTodoBtn = document.querySelector("#openTodo");
    header.textContent = topic.title;
    openTodoBtn.classList.remove("hidden");
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

    for(const key in data) {
        const topic = data[key];
        const listItem = document.createElement("li");
        listItem.textContent = topic.title;
        listItem.addEventListener("click", () => listTodos(key, topic) );
        
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