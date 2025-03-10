import { Todo, Subtask, Topic, Priority } from './scripts/model.js';
import { todo1, todo2, todo3 } from './scripts/dummy.js';
import { firstSetup, saveData, loadData } from './scripts/data.js';

firstSetup();
const myTopics = loadData();

// Program flow 
// myTopics[GENERAL_NAME].addToCollection(todo1);
// myTopics[GENERAL_NAME].addToCollection(todo2);
// myTopics[GENERAL_NAME].addToCollection(todo3);
// myTopics[GENERAL_NAME].removeTodo(0);

// Program end
saveData(myTopics);
