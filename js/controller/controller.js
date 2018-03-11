import { setListener, qs } from '../helpers/helpers';

export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    setListener(this.view.inputNewTodo, 'change', this.newToDo);
    // setListener(this.view.inputNewTodo, 'click', this.newToDo);
    // setListener(this.view.inputNewTodo, 'click', this.newToDo);
    // setListener(this.view.inputNewTodo, 'click', this.newToDo);
  }

  setView() {

  }

  renderList(todos) {
    const fragment = document.createDocumentFragment();
    todos.forEach((todo) => {
      const li = document.createElement('li');
      li.innerHTML = this.view.ItemTemplate(todo.title);
      // setListener(qs('label', li), 'dblclick', this.editItem(todo.id));
      // setListener(qs('edit', li), 'change', this.endEditItem(todo.id));
      // setListener(qs('.toggle', li), 'click', this.view.toggleComplete());
      fragment.appendChild(li);
      }, '');
    this.view.changeListContent(fragment);
  }

  editItem(id) {

  }

  endEditItem() {

  }

  newToDo() {
    const todoTitle = this.view.inputNewTodo.value;
    this.view.clearNewToDoInput();
    this.model.addItem(todoTitle);
    this.updateActiveItems();
  }

  updateActiveItems() {
    const activeItems = this.model.activeItems;
    const htmlToPaste = this.view.CountFieldTemplate(activeItems);
    this.view.counter.innerHTML = htmlToPaste;
  }
}
