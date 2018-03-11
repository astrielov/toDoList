/* eslint-disable no-extra-boolean-cast */
import { qs } from '../helpers/helpers';

export default class View {
  constructor() {
    this.sectionTodoapp = qs('.todoapp');
    this.sectionMain = qs('.main');
    this.inputNewTodo = qs('.new-todo');
    this.buttonToggleAll = qs('.toggle-all');
    this.buttonClearCompleted = qs('.clear-completed');
    this.linkAll = qs('#showAll');
    this.linkActive = qs('#showActive');
    this.linkCompleted = qs('#showCompleted');
    this.ulTodoList = qs('.todo-list');
    this.counter = qs('.todo-count');
    this.footer = qs('.footer');
  }

  setMainVisibility(visible) {
    this.sectionMain.style.display = !!visible ? 'block' : 'none';
  }

  /**
   * @param fragment
   */
  changeListContent(fragment) {
    this.ulTodoList.innerHTML = '';
    this.ulTodoList.appendChild(fragment);
  }

  clearNewToDoInput() {
    this.inputNewTodo.value = '';
  }

  /**
   * Used when editing item's title
   * @param target
   */
  static toggleEditingMode(target) {
    if (target.classList.contains('.editing')) {
      target.classList.remove('.editing');
    } else {
      target.classList.add('.editing');
    }
  }

  static toggleComplete(target) {
    if (target.classList.contains('.completed')) {
      target.classList.remove('.completed');
    } else {
      target.classList.add('.completed');
    }
  }

  static ItemTemplate(title) {
    return `<div class="view">
              <input class="toggle" type="checkbox">
              <label>${title}</label>
              <button class="destroy"></button>
            </div>
            <input class="edit" value="${title}" `;
  }

  static CountFieldTemplate(itemsAmount) {
    return `<strong>${itemsAmount}</strong> item${itemsAmount === 1 ? '' : 's'} left`;
  }
}
