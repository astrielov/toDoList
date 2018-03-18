import { generUniqId } from '../helpers/id_generator';

export default class StoreModel {
  constructor(storageVarName) {
    this.todos = [];

    this.pushToStorage = () => {
      localStorage.setItem(storageVarName, JSON.stringify(this.todos));
    };

    this.pullFromStorage = () => {
      this.todos = JSON.parse(localStorage.getItem(storageVarName) || '[]');
    };

    this.pullFromStorage();
  }

  getCompleted() {
    return this.todos.filter(todo => todo.completed);
  }

  getIncompleted() {
    return this.todos.filter(todo => !todo.completed);
  }

  setAllCompletion(completed) {
    this.todos.forEach((item) => { item.completed = !!completed; });
    this.pushToStorage();
  }

  allComplete() {
    return this.getCompleted().length === this.todos.length;
  }

  removeCompleted() {
    this.todos = this.getIncompleted();
    this.pushToStorage();
  }

  addItem(title) {
    title = title.trim();
    if (title) {
      const item = {
        title,
        id: generUniqId(),
        completed: false,
      };
      this.todos.push(item);
      this.pushToStorage();
    }
  }

  setItemTitle(title, id) {
    title = title.trim();
    const todo = this.todos.find(item => Object.is(item.id, id));
    if (title) {
      todo.title = title;
      this.pushToStorage();
    } else {
      this.removeItem(id);
    }
  }

  removeItem(id) {
    this.todos.forEach((todo, index) => {
      if (Object.is(todo.id, id)) {
        this.todos.splice(index, 1);
      }
    });
    this.pushToStorage();
  }

  toggleItem(id) {
    this.todos.forEach((todo) => {
      if (Object.is(todo.id, id)) {
        todo.completed = !todo.completed;
        this.pushToStorage();
      }
    });
  }
}
