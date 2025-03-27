import { loadData } from "./data";
import { openTopicModalForEdit } from "./topic";
import { createButton } from "./utils";

export const listTopics = () => {
    const list = document.querySelector("#topics");
    const data = loadData();

    for(const key in data) {
        const topic = data[key];
        const listItem = document.createElement("li");
        listItem.textContent = topic.title;

        const editButton = createButton("Edit", (e) => openTopicModalForEdit(e, key, topic.title, topic.description));
        const deleteButton = createButton("Delete", (e) => {});

        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
        list.appendChild(listItem);
    }
}