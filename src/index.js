import { firstSetup } from './scripts/data.js';
import { listTopics } from './scripts/dom.js';
import { createTopicListeners } from './scripts/topic.js';
import './styles/style.css';

/* Driver code */
firstSetup();
createTopicListeners();

const form = document.querySelector("#topicForm");
listTopics();

// TodoModal.setupListeners();
// TopicModal.setupListeners();
// DOMHandler.rebuildDOM();

