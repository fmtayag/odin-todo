import { Todo, Subtask, Topic, Priority } from './scripts/model.js';
import { generalTopic, todo1, todo2, todo3 } from './scripts/dummy.js';
import { STORAGE_KEY, GENERAL_NAME, firstSetup, saveData, loadData } from './scripts/data.js';

firstSetup();
const myTopics = loadData();

// Program flow 
// const scienceTopic = new Topic("Science", "Sciencey stuff goes here");
// myTopics[scienceTopic.title] = scienceTopic;
rebuildDOM();

const addTodoButton = document.querySelector("#addTodo");
const addTopicButton = document.querySelector("#addTopic");
const editTopicButton = document.querySelector("#editTopic");
const editSelectTopic = document.querySelector("#editSelectTopic");

addTodoButton.addEventListener("click", (e) => {
    e.preventDefault();
    const titleField = document.querySelector("#todoTitle");
    const descField = document.querySelector("#todoDescription");
    const dueDateField = document.querySelector("#todoDueDate");
    const priorityField = document.querySelector("#todoPriority");
    const topicSelect = document.querySelector("#todoTopic");

    const todoTitle = titleField.value;
    const todoDesc = descField.value; 
    const todoDue = dueDateField.value; 
    const todoPriority = priorityField.value;
    const todoTopic = topicSelect.value;

    const topic = generalTopic.title;

    const id = (new Date()).getTime(); // Pseudo auto-id
    console.log(id, todoTitle, todoDesc, todoDue, todoPriority);
    
    myTopics[todoTopic].addToCollection(
        new Todo(id, todoTitle, todoDesc, new Date(todoDue), todoPriority )
    )
    saveData(myTopics);
    rebuildDOM();
});

addTopicButton.addEventListener("click", (e) => {
    const nameField = document.querySelector("#topicName");
    const descField = document.querySelector("#topicDescription");
    const topicName = nameField.value;
    const topicDesc = descField.value;
    
    if(!myTopics.hasOwnProperty(topicName)) {
        myTopics[topicName] = new Topic(topicName, topicDesc);
    }
    else {
        console.log("Topic already exists");
    }
    saveData(myTopics);
    rebuildDOM();
    e.preventDefault();
})

editTopicButton.addEventListener("click", (e) => {
    /* 
        TODO: Add validation
    */
    const topicTitleField = document.querySelector("#editTopicName");
    const topicDescField = document.querySelector("#editTopicDescription");
    
    const oldTopicTitle = document.querySelector("#editSelectTopic").value;
    const newTopicTitle = topicTitleField.value;
    const newTopicDesc = topicDescField.value;

    myTopics[oldTopicTitle].title = newTopicTitle;
    myTopics[oldTopicTitle].description = newTopicDesc;

    /* "Rename" the key */
    if(oldTopicTitle !== newTopicTitle) {
        myTopics[newTopicTitle] = myTopics[oldTopicTitle];
        delete myTopics[oldTopicTitle];
    }
    saveData(myTopics);
    
    e.preventDefault();
    rebuildDOM();
})

editSelectTopic.addEventListener("change", (e) => {
    populateTopicEditFields();
})

function rebuildDOM() {
    container.innerHTML = '';
    const add_todoDueDate = document.querySelector("#todoDueDate");
    add_todoDueDate.value = new Date().toISOString().slice(0, 10);



    createTodoList();
    populateTopicSelect("#todoTopic");
    populateTopicSelect("#editSelectTopic");
    populateTopicEditFields();
}

function createTodoList() {
    for(const topic in myTopics) {
        const h3 = document.createElement("h1"); 
        const ul = document.createElement("ul");
        h3.textContent = topic;

        for(const todo of myTopics[topic].toDoCollection) {
            const li = document.createElement("li");
            const editButton = document.createElement("button");
            editButton.addEventListener("click", (e) => {
                showTodoEditModal(topic, todo)
            })
            editButton.type = "button";
            editButton.textContent = "Edit";

            const deleteButton = document.createElement("button");
            deleteButton.addEventListener("click", (e) => {
                const removeIndex = myTopics[topic].toDoCollection.map(item => item.id).indexOf(todo.id);
                myTopics[topic].removeTodo(removeIndex);
                saveData(myTopics);
                rebuildDOM();
            })
            deleteButton.type = "button";
            deleteButton.textContent = "Delete";

            li.textContent = `${todo.title}: ${todo.description}`;
            li.appendChild(editButton);
            li.appendChild(deleteButton);
            ul.appendChild(li);
        }

        container.appendChild(h3);
        container.appendChild(ul);
    }
}

function showTodoEditModal(topic, todo) {
    edit_todoTitle.value = todo.title;
    edit_todoDescription.value = todo.description;
    edit_todoDueDate.value = todo.dueDate.toISOString().slice(0, 10);
    edit_todoPriority.value = todo.priority;
    edit_todoIsDone.checked = todo.isDone; 

    edit_todoTopic.innerHTML = ``;
    for(let topic in myTopics) {
        const option = document.createElement("option");
        option.value = topic;
        option.textContent = topic;
        edit_todoTopic.append(option);
    }
    edit_todoTopic.value = topic;

    const saveEditBtn = document.querySelector("#editTodo");
    const exitModalBtn = document.querySelector("#exitTodoModal");
    console.log(myTopics);

    saveEditBtn.addEventListener("click", function eventHandler(e) {
        e.preventDefault();
        todo.title = edit_todoTitle.value;
        todo.description = edit_todoDescription.value;
        todo.dueDate = new Date(edit_todoDueDate.value);
        todo.priority = edit_todoPriority.value;
        todo.isDone = edit_todoIsDone.checked;
        
        const newTopic = edit_todoTopic.value;
        const oldTopic = topic;
        if (topic !== edit_todoTopic.value) {
            const removeIndex = myTopics[oldTopic].toDoCollection.map(item => item.id).indexOf(todo.id);
            console.log()
            myTopics[newTopic].addToCollection(todo);
            myTopics[oldTopic].removeTodo(removeIndex);
        }

        console.log(myTopics);

        /* Fix to prevent the todos from being duplicated when 
            being moved from one topic to another
        */
        this.removeEventListener("click", eventHandler);

        saveData(myTopics);
        rebuildDOM();
        todoEditModal.close();
    })
    
    exitModalBtn.addEventListener("click", function eventHandler(e) {
        todoEditModal.close();
        this.removeEventListener("click", eventHandler);
    })


    todoEditModal.show();
}

function createModal(topic, todo) {
    const modal = document.createElement("dialog");
    const li = document.createElement("li");

    /* Title field */
    const titleField = document.createElement("input");
    titleField.type = "text";
    titleField.value = todo.title;

    /* Description field */
    const descField = document.createElement("input");
    descField.type = "text";
    descField.value = todo.description;

    /* Due date field */
    const dateField = document.createElement("input");
    dateField.type = "date";
    dateField.value = todo.dueDate.toISOString().slice(0, 10);         
    
    /* Priority field */
    const prioritySelect = document.createElement("select");

    const noPrio = document.createElement("option");
    noPrio.value = Priority.None;
    noPrio.textContent = "No Priority";

    const lowPrio = document.createElement("option");
    lowPrio.value = Priority.Low;
    lowPrio.textContent = "Low Priority";

    const medPrio = document.createElement("option");
    medPrio.value = Priority.Medium;
    medPrio.textContent = "Med Priority";

    const highPrio = document.createElement("option");
    highPrio.value = Priority.High;
    highPrio.textContent = "Top Priority";

    prioritySelect.append(noPrio);
    prioritySelect.append(lowPrio);
    prioritySelect.append(medPrio);
    prioritySelect.append(highPrio);

    prioritySelect.value = todo.priority;

    /* Is done */
    const todoCheckbox = document.createElement("input");
    todoCheckbox.type = "checkbox";
    todoCheckbox.checked = todo.isDone;
    console.log(todo.isDone);
    
    /* Topic */
    const topicSelect = document.createElement("select");
    topicSelect.innerHTML = '';
    for(let topic in myTopics) {
        const option = document.createElement("option");
        option.value = topic;
        option.textContent = topic;
        topicSelect.append(option);
    }
    topicSelect.value = topic;

    li.dataset.index = myTopics[topic].toDoCollection.indexOf(todo);

    li.appendChild(titleField);
    li.appendChild(descField);
    li.appendChild(dateField);
    li.appendChild(prioritySelect);
    li.appendChild(todoCheckbox);
    li.appendChild(topicSelect);
    modal.appendChild(li);
    document.body.appendChild(modal);
    modal.show(true);
}

function populateTopicSelect(id) {
    const topicSelect = document.querySelector(id);
    topicSelect.innerHTML = '';
    for(let topic in myTopics) {
        const option = document.createElement("option");
        option.value = topic;
        option.textContent = topic;
        topicSelect.append(option);
    }
}

function populateTopicEditFields() {
    const topicSelect = document.querySelector("#editSelectTopic");
    const topic = topicSelect.value; 
    console.log(`Topic is ${topic}`);

    editTopicName.value = myTopics[topic].title;
    editTopicDescription.value = myTopics[topic].description;   
}

// TODO: Program end
/* Perhaps make it so that it saves the data after a certain time has elapsed? Or after page has unloaded */ 
saveData(myTopics);
