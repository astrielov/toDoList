import qs from './helpers';

const todoHtmlNodes = {
  sectionTodoapp: qs('.todoapp'),
  sectionMain: qs('.main'),
  inputNewTodo: qs('.new-todo'),
  buttonToggleAll: qs('.toggle-all'),
  buttonClearCompleted: qs('.clear-completed'),
  linkAll: qs('#showAll'),
  linkActive: qs('#showActive'),
  linkCompleted: qs('#showCompleted'),
  ulTodoList: qs('.todo-list'),
  counter: qs('.todo-count'),
  footer: qs('.footer'),
};

export default function getHtmlAppNodes() {
  return todoHtmlNodes;
}
