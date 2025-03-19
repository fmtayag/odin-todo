import { firstSetup } from './scripts/data.js';
import { DOMHandler, TopicModal, TodoModal } from './scripts/dom.js';
import './styles/style.css';

/* Driver code */
firstSetup();
TodoModal.setupListeners();
TopicModal.setupListeners();
DOMHandler.rebuildDOM();

