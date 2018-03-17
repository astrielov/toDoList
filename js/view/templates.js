import { qs } from '../helpers/helpers';

export default class Templates {
  static newItemLi(todo) {
    const li = document.createElement('li');

    li.dataset.id = todo.id;
    li.innerHTML = `<div class="view">
                      <input class="toggle" type="checkbox">
                      <label>${todo.title}</label>
                      <button class="destroy"></button>
                    </div>`;

    if (todo.completed) {
      li.classList.add('completed');
      qs('.toggle', li).checked = true;
    }

    return li;
  }

  static newTodoCountSpan(itemsAmount) {
    const counter = document.createElement('span');
    const suffix = itemsAmount % 10 === 1 ? '' : 's';

    counter.classList.add('todo-count');
    counter.innerHTML = `<strong>${itemsAmount}</strong> item${suffix} left`;

    return counter;
  }
}
