import newTaskHTMLLi from './utils';

export default function setListeners() {
  const toDoList = document.querySelector('.todo-list');
  const toDoInput = document.querySelector('.new-todo');
  toDoInput.autofocus = true;

  toDoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && toDoInput.value) {
      const newLi = newTaskHTMLLi(toDoInput.value);
      toDoList.appendChild(newLi);
      toDoInput.value = '';
    }
  });
}
