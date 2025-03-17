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

    console.log(todoTitle, todoDesc, todoDue, todoPriority);
    
    myTopics[todoTopic].addToCollection(
        new Todo(todoTitle, todoDesc, new Date(todoDue), todoPriority)
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
    createList();
    populateTopicSelect("#todoTopic");
    populateTopicSelect("#editSelectTopic");
    populateTopicEditFields();
}

function createList() {
    console.log(myTopics);
    for(const topic in myTopics) {
        
        const h3 = document.createElement("h1"); 
        const ul = document.createElement("ul");
        h3.textContent = topic;
        
        for(const todo of myTopics[topic].toDoCollection) {
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

            console.log(todo.priority);
            prioritySelect.value = todo.priority;

            // console.log(`${year}-${month}-${day}`);
            // console.log(todo.dueDate.toISOString().slice(0, 10));


            // li.textContent = `${todo.title}: ${todo.description} (${todo.dueDate})`;
            // li.dataset.index = myTopics[topic].toDoCollection.indexOf(todo);

            li.dataset.index = myTopics[topic].toDoCollection.indexOf(todo);

            li.appendChild(titleField);
            li.appendChild(descField);
            li.appendChild(dateField);
            li.appendChild(prioritySelect);
            ul.appendChild(li);
        }

        container.appendChild(h3);
        container.appendChild(ul);
    }
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
