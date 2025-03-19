import { Todo, Topic, Priority } from './scripts/model.js';
import { generalTopic, todo1, todo2, todo3 } from './scripts/dummy.js';
import { STORAGE_KEY, HOME_NAME, firstSetup, saveData, loadData } from './scripts/data.js';
import './styles/style.css';

class DOMHandler {
    static rebuildDOM(){
        
    }

    static #buildTopicList() {

    }
}


/* Driver code */
firstSetup();
const myTopics = loadData();
DOMHandler.rebuildDOM();

