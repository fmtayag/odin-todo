import { Todo, Topic, Priority } from './model.js';
import { loadData, saveData } from './data.js';

/* 'myTopics' acts as a data cache */
const myTopics = loadData();

let selectedTopic = null;

/* Event listeners */
let boundUpdateTopicListener = null;
let boundUpdateTodoListener = null;

const createTopicListener = event => {
    event.preventDefault();
    createNewTopic();
    topicForm.removeEventListener("submit", createTopicListener);
};

const updateTopicListener = (key, event) => {
    event.preventDefault();
    updateTopic(key);
    topicForm.removeEventListener("submit", boundUpdateTopicListener);
}

const createTodoListener = event => {
    event.preventDefault();
    createNewTodo();
    todoForm.removeEventListener("submit", createTodoListener);
}

const updateTodoListener = (key, id, event) => {
    event.preventDefault();
    updateTodo(key, id);
    todoForm.removeEventListener("submit", boundUpdateTodoListener);
}

/* Create and Update functions */
function createNewTopic() {
    console.log("Hello");
    /* TODO: Add client-side validation later */

    const title = topicTitle.value;
    const description = topicDesc.value;

    myTopics[title] = new Topic(title, description);
    saveData(myTopics);

    DOMHandler.rebuildDOM();
    topicModal.close();

}

function updateTopic(key) {
    /* TODO: Add client-side validation later */
    const newTitle = topicTitle.value;
    const newDescription = topicDesc.value;

    myTopics[key].title = newTitle;
    myTopics[key].description = newDescription;

    if (key !== newTitle) {
        myTopics[newTitle] = myTopics[key];
        delete myTopics[key];
    }

    saveData(myTopics);
    DOMHandler.rebuildDOM();
    topicModal.close();
}

function createNewTodo() {
    /* TODO: Add client-side validation later */

    const id = new Date().getTime(); /* Pseudo auto-id */
    const title = todoTitle.value;
    const description = todoDesc.value;
    const due = new Date(todoDue.value);
    const priority = todoPriority.value;
    const isDone = todoDone.checked;
    const topic = todoTopics.value;

    const todo = new Todo(id, title, description, due, priority, isDone);
    myTopics[topic].addTodo(todo);
    console.log("Hey");
    saveData(myTopics);

    DOMHandler.rebuildDOM();
    todoModal.close();
}

function updateTodo(oldTopic, id) {
    /* TODO: Add client-side validation later */

    const title = todoTitle.value;
    const description = todoDesc.value;
    const due = new Date(todoDue.value);
    const priority = todoPriority.value;
    const isDone = todoDone.checked;
    const topic = todoTopics.value;

    const changedTopic = topic !== oldTopic;

    const matchID = (todo) => todo.id === id;
    const index = myTopics[oldTopic].todos.findIndex(matchID);

    if (changedTopic) {
        const todo = new Todo(id, title, description, due, priority, isDone);
        myTopics[oldTopic].todos.splice(index, 1);
        myTopics[topic].todos.push(todo);
    }
    else {
        myTopics[oldTopic].todos[index].title = title;
        myTopics[oldTopic].todos[index].description = description;
        myTopics[oldTopic].todos[index].due = due;
        myTopics[oldTopic].todos[index].priority = priority;
        myTopics[oldTopic].todos[index].isDone = isDone;
    }

    saveData(myTopics);
    DOMHandler.rebuildDOM();
    todoModal.close();
}

export class DOMHandler {
    static rebuildDOM() {
        this.#rebuildTopicList();
        this.#rebuildTodoList(selectedTopic);
    }

    static #rebuildTodoList(topic) {
        todos.innerHTML = ``;
        if (topic in myTopics) {
            currentTopic.textContent = topic;
            for (const todo of myTopics[topic].todos) {
                const li = document.createElement("li");
                li.textContent = todo.title;

                const editButton = document.createElement("button");
                editButton.type = "button";
                editButton.textContent = "Edit";
                editButton.addEventListener("click", (e) => {
                    todoModal.show();

                    todoTitle.value = todo.title;
                    todoDesc.value = todo.description;
                    todoDue.value = new Date(todo.dueDate).toISOString().slice(0, 10);
                    todoPriority.value = todo.priority;
                    todoDone.checked = todo.isDone;
                    TodoModal.populateTopicSelect();
                    todoTopics.value = topic;

                    boundUpdateTodoListener = updateTodoListener.bind(null, topic, todo.id);
                    todoForm.addEventListener("submit", boundUpdateTodoListener);
                });

                const deleteButton = document.createElement("button");
                deleteButton.type = "button";
                deleteButton.textContent = "Delete";
                deleteButton.addEventListener("click", (e) => {
                    const results = myTopics[topic].todos.filter(
                        (t) => t.id !== todo.id
                    );

                    myTopics[topic].todos = results;
                    saveData(myTopics);
                    this.rebuildDOM();
                });

                li.appendChild(editButton);
                li.appendChild(deleteButton);
                todos.appendChild(li);
            }
        }

    }

    static #rebuildTopicList() {
        const topicsList = document.querySelector("#topics");
        topicsList.innerHTML = ``;

        for (const key in myTopics) {
            const item = document.createElement("li");
            item.textContent = key;
            item.dataset.key = key;

            item.addEventListener("click", (e) => {
                selectedTopic = item.dataset.key;
                this.rebuildDOM();
            });

            const editButton = document.createElement("button");
            editButton.type = "button";
            editButton.textContent = "Edit";
            editButton.addEventListener("click", (e) => {
                topicModal.show();

                topicTitle.value = myTopics[key].title;
                topicDesc.value = myTopics[key].description;

                boundUpdateTopicListener = updateTopicListener.bind(null, key);
                topicForm.addEventListener("submit", boundUpdateTopicListener);
                e.stopPropagation();
            });

            const deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", (e) => {
                e.stopPropagation();
                delete myTopics[key]
                saveData(myTopics);

                selectedTopic = null;
                this.rebuildDOM();
            });

            item.appendChild(editButton);
            item.appendChild(deleteButton);
            topicsList.appendChild(item);
        }
    }
}

export class TodoModal {
    static setupListeners() {
        const showModalBtn = document.querySelector("#newTodo");
        const closeBtn = todoModal.querySelector(".close");

        showModalBtn.addEventListener("click", (e) => {
            todoModal.show();
            this.populateTopicSelect();
            todoDue.value = new Date().toISOString().slice(0, 10);

            todoForm.addEventListener("submit", createTodoListener)
        });

        closeBtn.addEventListener("click", (e) => {
            todoModal.close();
            todoForm.removeEventListener("submit", createTodoListener);
            todoForm.removeEventListener("submit", boundUpdateTodoListener);
        });
    }

    static populateTopicSelect() {
        todoTopics.innerHTML = ``;
        for (const topic in myTopics) {
            const option = document.createElement("option");
            option.value = topic;
            option.textContent = topic;
            todoTopics.appendChild(option);
        }
    }
}

export class TopicModal {
    static setupListeners() {
        const showModalBtn = document.querySelector("#newTopic");
        const closeBtn = topicModal.querySelector(".close");

        showModalBtn.addEventListener("click", (e) => {
            topicModal.show();
            topicTitle.value = '';
            topicDesc.value = '';

            topicForm.addEventListener("submit", createTopicListener);
        });

        closeBtn.addEventListener("click", (e) => {
            topicModal.close();
            topicForm.removeEventListener("submit", createTopicListener);
            topicForm.removeEventListener("submit", boundUpdateTopicListener);
        });
    }
}