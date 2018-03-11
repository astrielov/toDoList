import ItemModel from './itemModel';

export default class StoreModel {
  constructor(storageVarName) {
    this.todos = [];
    this.activeItems = 0;

    this.pushToStorage = () => {
      localStorage.setItem(storageVarName, JSON.stringify(this.todos));
    };

    this.pullFromStorage = () => {
      this.todos = JSON.parse(localStorage.getItem(storageVarName) || '[]');
      this.updateActiveItems();
    };

    this.pullFromStorage();
  }

  getCompleted() {
    return this.todos.filter(todo => todo.isCompleted());
  }

  getIncompleted() {
    return this.todos.filter(todo => !todo.isCompleted());
  }

  setAllComplete() {
    this.todos.forEach(todo => todo.setCompleted());
    this.updateActiveItems();
  }

  setAllIncomplete() {
    this.todos.forEach(todo => todo.setIncompleted());
    this.updateActiveItems();
  }

  allComplete() {
    return this.getCompleted().length === this.todos.length;
  }

  allIncomplete() {
    return this.getIncompleted().length === this.todos.length;
  }

  removeCompleted() {
    this.todos = this.getIncompleted();
    this.pushToStorage();
  }

  addItem(title) {
    title = title.trim();
    if (title) {
      this.todos.push(new ItemModel(title));
      this.pushToStorage();
      this.updateActiveItems();
    }
  }

  setItemTitle(title, id) {
    title = title.trim();
    const item = this.todos.find(todo => !todo.id.localeCompare(id));
    if (title) {
      item.setTitle(title);
      this.pushToStorage();
    } else {
      this.removeItem(id);
    }
  }

  removeItem(id) {
    this.todos.forEach((todo, index) => {
      if (todo.id.localeCompare(id) === 0) {
        this.todos.splice(index, 1);
      }
    });
    this.pushToStorage();
    this.updateActiveItems();
  }

  updateActiveItems() {
    this.activeItems = this.getIncompleted().length;
  }
}
