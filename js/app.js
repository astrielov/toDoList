import setListener from './eventHandlers/listeners';
import getHtmlAppNodes from './utilities/appHtmlNodes';
import ToDoStoreService from './store/storeModel';

const htmlAppNodes = getHtmlAppNodes();
const todoState = new ToDoStoreService();

setListener(htmlAppNodes.inputNewTodo, 'click', todoState.add(htmlAppNodes.inputNewTodo.value));


function keydown(e) {
  console.log('keydown');
  console.log(e);
}
function keypress(e) {
  console.log('keypress');
  console.log(e);
}
function keyup(e) {
  console.log('keyup');
  console.log(e);
}
setListener(htmlAppNodes.inputNewTodo, 'keydown', keydown);
setListener(htmlAppNodes.inputNewTodo, 'keypress', keypress);
setListener(htmlAppNodes.inputNewTodo, 'keyup', keyup);
