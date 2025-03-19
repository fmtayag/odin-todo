import { Todo, Topic, Priority } from './scripts/model.js';
import { generalTopic, todo1, todo2, todo3 } from './scripts/dummy.js';
import { STORAGE_KEY, GENERAL_NAME, firstSetup, saveData, loadData } from './scripts/data.js';

class DOMHandler {
    static rebuildDOM(){

    }
}


/* Driver code */
firstSetup();
const myTopics = loadData();
DOMHandler.rebuildDOM();

