import { firstSetup } from './scripts/data.js';
import { listTopics, openDefaultTopic } from './scripts/dom.js';
import { createTodoListeners } from './scripts/todo.js';
import { createTopicListeners } from './scripts/topic.js';
import './styles/style.css';

/* Driver code */
firstSetup();
createTopicListeners();
createTodoListeners();

const form = document.querySelector("#topicForm");
listTopics();
openDefaultTopic();

// TodoModal.setupListeners();
// TopicModal.setupListeners();
// DOMHandler.rebuildDOM();

