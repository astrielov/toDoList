/* eslint-disable no-extra-boolean-cast */
import {qs, setListener} from '../helpers/helpers';

export default class View {
  constructor(templates) {
    this.templates = templates;
    this.sectionTodoapp = qs('.todoapp');
    this.sectionMain = qs('.main', this.sectionTodoapp);
    this.inputNewTodo = qs('.new-todo', this.sectionTodoapp);
    this.buttonToggleAll = qs('.toggle-all', this.sectionTodoapp);
    this.buttonClearCompleted = qs('.clear-completed', this.sectionTodoapp);
    this.ulTodoList = qs('.todo-list', this.sectionTodoapp);
    this.counter = qs('.todo-count', this.sectionTodoapp);
    this.footer = qs('.footer', this.sectionTodoapp);
  }

  setMainVisibility(visible) {
    this.sectionMain.style.display = !!visible ? 'block' : 'none';
  }

  setFooterVisibility(visible) {
    this.footer.style.display = !!visible ? 'block' : 'none';
  }

  /**
   * @param fragment
   */
  swapListContent(fragment) {
    this.ulTodoList.innerHTML = '';
    this.ulTodoList.appendChild(fragment);
  }

  clearNewToDoInput() {
    this.inputNewTodo.value = '';
  }

  listenToggleAll(handler) {
    setListener(this.buttonToggleAll, 'click', () => {
      const completed = this.buttonToggleAll.checked;
      handler(completed);
    })
  }

  listenNewToDo(handler) {
    setListener(this.inputNewTodo, 'change', () => {
      const title = this.inputNewTodo.value.trim();
      if (title) {
        this.clearNewToDoInput();
        handler(title);
      }
    });
  }

  listenToItemChange(handler) {
    setListener(this.ulTodoList, 'dblclick', ({ target }) => {
      if (!Object.is(target.tagName, 'LABEL')) {
        return;
      }
      const li = target.parentElement.parentElement;
      const edit = qs('.edit', li) || document.createElement('input');
      edit.classList.add('edit');
      edit.value = target.innerText;
      li.appendChild(edit);
      li.classList.add('editing');
      edit.focus();

      setListener(edit, 'change', () => {
        handler(edit.value, li.dataset.id);
        li.classList.remove('editing');
      });
      setListener(edit, 'blur', () => {
        handler(edit.value, li.dataset.id);
        li.classList.remove('editing');
      });
    })
  }

  listenToItemRemove(handler) {
    setListener(this.ulTodoList, 'click', ({ target }) => {
      if (!target.classList.contains('destroy')) {
        return;
      }
      const li = target.parentElement.parentElement;
      if (handler) {
        handler(li.dataset.id);
      }
    })
  }

  listenToRemoveCompleted(handler) {
    setListener(this.buttonClearCompleted, 'click', () => {
      handler();
    })
  }

  listenToItemToggle(handler) {
    setListener(this.ulTodoList, 'click', ({ target }) => {
      if (!target.classList.contains('toggle')) {
        return;
      }
      const li = target.parentElement.parentElement;
      if (li.classList.contains('completed')) {
        li.classList.remove('completed');
      } else {
        li.classList.add('completed');
      }
      if (handler) {
        handler(li.dataset.id);
      }
    })
  }

  renderList(todos) {
    const fragment = document.createDocumentFragment();
    todos.forEach((todo) => {
      const li = document.createElement('li');
      li.innerHTML = this.templates.constructor.item(todo.title);
      li.dataset.id = todo.id;
      if (todo.completed) {
        li.classList.add('completed');
        qs('.toggle', li).checked = true;
      }
      fragment.appendChild(li);
    }, '');
    this.swapListContent(fragment);
  }

  updateActiveItems(activeItems) {
    const htmlToPaste = this.templates.constructor.todoCount(activeItems);
    this.counter.innerHTML = htmlToPaste;
  }
}
