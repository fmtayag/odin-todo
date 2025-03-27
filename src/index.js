import { firstSetup } from './scripts/data.js';
import { createTopicListeners } from './scripts/topic.js';
import './styles/style.css';

/* Driver code */
firstSetup();
createTopicListeners();

const form = document.querySelector("#topicForm");
const text = [...form.childNodes]
    .filter((item) => item.tagName === "INPUT" && item.type === "text" )
console.log(text);

// TodoModal.setupListeners();
// TopicModal.setupListeners();
// DOMHandler.rebuildDOM();

