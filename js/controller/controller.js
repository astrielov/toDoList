export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.listenToggleAll(this.toggleAll.bind(this));
    this.view.listenNewToDo(this.newToDo.bind(this));
    this.view.listenToItemChange(this.endEditItem.bind(this));
    this.view.listenToItemRemove(this.removeItem.bind(this));
    this.view.listenToItemToggle(this.toggleItem.bind(this));
    this.view.listenToRemoveCompleted(this.removeCompleted.bind(this));
  }

  setView(raw = document.location.hash) {
    const route = raw.replace(/^#\//, '');
    let currentTodos;
    switch (route) {
      case 'active':
        currentTodos = this.model.getIncompleted();
        break;
      case 'completed':
        currentTodos = this.model.getCompleted();
        break;
      default:
        currentTodos = this.model.todos;
    }
    this.view.setToggleAllState(this.model.allComplete());
    this.view.setChosenFilter(route);
    this.view.setMainVisibility(this.model.todos.length);
    this.view.setFooterVisibility(this.model.todos.length);
    this.view.setClearButtVisibility(this.model.getCompleted().length);
    this.view.renderList(currentTodos);
    this.view.updateActiveItemsField(this.model.getIncompleted().length);
  }

  newToDo(title) {
    this.model.addItem(title);
    this.setView();
  }

  endEditItem(title, id) {
    this.model.setItemTitle(title, id);
    this.setView();
  }

  toggleAll(completed) {
    this.model.setAllCompletion(completed);
    this.setView();
  }

  toggleItem(id) {
    this.model.toggleItem(id);
    this.setView();
  }

  removeItem(id) {
    this.model.removeItem(id);
    this.setView();
  }

  removeCompleted() {
    this.model.removeCompleted();
    this.setView();
  }
}
