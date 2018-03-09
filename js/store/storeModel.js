import ToDoModel from './todoModel';

export default class ToDoStoreService {
  constructor() {
    const pulledTodos = JSON.parse(localStorage.getItem('todos-purejs')) || [];

    this.todos = pulledTodos.map((todo) => {
      const resTodo = new ToDoModel(todo.title);
      resTodo.completed = todo.completed;
      resTodo.uid = todo.uid;
      return resTodo;
    });
  }

  getCompleted() {
    return this.todos.filter(todo => todo.completed === true);
  }

  getIncompleted() {
    return this.todos.filter(todo => todo.completed === false);
  }

  allComplete() {
    return this.getCompleted().length === this.todos.length;
  }

  allIncomplete() {
    return this.getIncompleted().length === this.todos.length;
  }

  pushToStorage() {
    localStorage.setItem('todos-purejs', JSON.stringify(this.todos));
  }

  removeCompleted() {
    this.todos = this.getIncompleted();
    this.pushToStorage();
  }

  add(title) {
    this.todos.push(new ToDoModel(title));
    this.pushToStorage();
  }
}
