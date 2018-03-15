/* eslint-disable no-extra-boolean-cast */
import { qs, setListener } from '../helpers/helpers';

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
    this.filters = qs('.filters', this.sectionTodoapp);
  }

  setMainVisibility(visible) {
    this.sectionMain.style.display = !!visible ? 'block' : 'none';
  }

  setFooterVisibility(visible) {
    this.footer.style.display = !!visible ? 'block' : 'none';
  }

  setClearButtVisibility(visible) {
    this.buttonClearCompleted.style.display = !!visible ? 'block' : 'none';
  }

  setToggleAllState(allComplete) {
    this.buttonToggleAll.checked = allComplete;
  }

  setChosenFilter(route) {
    this.filters.querySelectorAll('a').forEach(node => node.classList.remove('selected'));
    let currButt;
    switch (route) {
      case 'active':
        currButt = qs('#showActive', this.filters);
        break;
      case 'completed':
        currButt = qs('#showCompleted', this.filters);
        break;
      default:
        currButt = qs('#showAll', this.filters);
    }
    currButt.classList.add('selected');
  }

  /**
   * Wipe old ToDos and paste the new ones
   * @param fragment - documentFragment
   */
  swapListContent(fragment) {
    let child = this.ulTodoList.firstChild;
    while (child) {
      this.ulTodoList.removeChild(child);
      child = this.ulTodoList.firstChild;
    }
    this.ulTodoList.appendChild(fragment);
  }

  clearNewToDoInput() {
    this.inputNewTodo.value = '';
  }

  listenToggleAll(handler) {
    setListener(this.buttonToggleAll, 'click', () => {
      const completed = this.buttonToggleAll.checked;
      handler(completed);
    });
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
      const edit = document.createElement('input');
      edit.classList.add('edit');
      edit.value = target.innerText;
      li.appendChild(edit);
      li.classList.add('editing');
      edit.focus();

      setListener(edit, 'blur', () => {
        if (!edit.dataset.cancelled) {
          handler(edit.value, li.dataset.id);
        }
        li.classList.remove('editing');
        li.removeChild(edit);
      });

      setListener(edit, 'keydown', (event) => {
        if (event.key === 'Escape') {
          edit.dataset.cancelled = 'true';
          edit.blur();
        }
        if (event.key === 'Enter') {
          edit.blur();
        }
      });
    });
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
    });
  }

  listenToRemoveCompleted(handler) {
    setListener(this.buttonClearCompleted, 'click', () => {
      handler();
    });
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
    });
  }

  renderList(todos) {
    const fragment = document.createDocumentFragment();
    todos.forEach((todo) => {
      const li = this.templates.constructor.newItemLi(todo);
      fragment.appendChild(li);
    });
    this.swapListContent(fragment);
  }

  updateActiveItemsField(activeItems) {
    const newCounter = this.templates.constructor.newTodoCountSpan(activeItems);
    this.counter.parentElement.replaceChild(newCounter, this.counter);
    this.counter = newCounter;
  }
}
