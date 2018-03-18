import { qs, setListener } from '../helpers/helpers';

export default class View {
  /**
   * Assigns all major HTML nodes to View instance
   * @param templates - contains template for <li> element and items counter
   */
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

  /**
   * Set visible/invisible node containing list of todos
   * @param {boolean} visible
   */
  setMainVisibility(visible) {
    this.sectionMain.style.display = visible ? 'block' : 'none';
  }

  /**
   * Set visible/invisible node containing todos filters and counter
   * @param {boolean} visible
   */
  setFooterVisibility(visible) {
    this.footer.style.display = visible ? 'block' : 'none';
  }

  /**
   * Set visible/invisible clearCompleteToDos button
   * @param {boolean} visible
   */
  setClearButtVisibility(visible) {
    this.buttonClearCompleted.style.display = visible ? 'block' : 'none';
  }

  /**
   * Set state of toggle all flag
   * @param {boolean} allComplete
   */
  setToggleAllState(allComplete) {
    this.buttonToggleAll.checked = allComplete;
  }

  /**
   * Set visual highlighting of filter based on current list view
   * @param {String} route
   */
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
   * @param {DocumentFragment} fragment
   */
  setListContent(fragment) {
    let child = this.ulTodoList.firstChild;
    while (child) {
      this.ulTodoList.removeChild(child);
      child = this.ulTodoList.firstChild;
    }
    this.ulTodoList.appendChild(fragment);
  }

  /**
   * Attach 'click' listener to toggle all flag. Calls handler with checked state
   * @param {function} handler
   */
  listenToggleAll(handler) {
    setListener(this.buttonToggleAll, 'click', () => {
      const completed = this.buttonToggleAll.checked;
      handler(completed);
    });
  }

  /**
   * Attach 'change' listener to NewTodo input. Calls handler with input value then wipes input
   * @param {function} handler
   */
  listenNewToDo(handler) {
    setListener(this.inputNewTodo, 'change', () => {
      handler(this.inputNewTodo.value);
      this.inputNewTodo.value = '';
    });
  }

  /**
   * Attach double click listener to list. If dblclicked on item label, attach new 'edit'
   * input field for changing item title. On edit finish calls handler with input value if
   * not cancelled. Deletes 'edit' element.
   * @param {function} handler
   */
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

  /**
   * Attach 'click' listener to todos list. If clicked on removeItem button, calls handler, passing
   * item id to it.
   * @param {function} handler
   */
  listenToItemRemove(handler) {
    setListener(this.ulTodoList, 'click', ({ target }) => {
      if (!target.classList.contains('destroy')) {
        return;
      }
      const li = target.parentElement.parentElement;
      handler(li.dataset.id);
    });
  }

  /**
   * Attach 'click' listener to 'clear completed' button. Calls handler on click
   * @param {function} handler
   */
  listenToRemoveCompleted(handler) {
    setListener(this.buttonClearCompleted, 'click', () => {
      handler();
    });
  }

  /**
   * Attach 'click' listener to todos list. If clicked on 'toggle item' button, switches visual
   * state of button and calls handler.
   * @param {function} handler
   */
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
      handler(li.dataset.id);
    });
  }

  /**
   * Create documentFragment containing <li>s from current todos and pass it to setListContent
   * @param {Array} todos - array of objects
   */
  renderList(todos) {
    const fragment = document.createDocumentFragment();
    todos.forEach((todo) => {
      const li = this.templates.constructor.newItemLi(todo);
      fragment.appendChild(li);
    });
    this.setListContent(fragment);
  }

  /**
   * Swap current counter field.
   * @param {Number} activeItems - amount of current incomplete todos
   */
  updateActiveItemsField(activeItems) {
    const newCounter = this.templates.constructor.newTodoCountSpan(activeItems);
    this.counter.parentElement.replaceChild(newCounter, this.counter);
    this.counter = newCounter;
  }
}
