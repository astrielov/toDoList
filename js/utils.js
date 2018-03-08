export default function newTaskHTMLLi(userInput) {
  const li = document.createElement('li');
  const div = document.createElement('div');
  const inputToggle = document.createElement('input');
  const label = document.createElement('label');
  const destroyButt = document.createElement('button');
  const inputEdit = document.createElement('input');

  div.classList.add('view');

  inputToggle.classList.add('toggle');
  inputToggle.type = 'checkbox';

  label.innerText = userInput;
  label.addEventListener('dblclick', () => {
    li.classList.add('editing');
    inputEdit.focus();
  });

  destroyButt.classList.add('destroy');

  inputEdit.classList.add('edit');
  inputEdit.value = userInput;
  inputEdit.addEventListener('keypress', (e) => {
    if (e.key !== 'Enter') {
      return;
    }
    li.classList.remove('editing');
  });
  inputEdit.addEventListener('focusout', () => {
    li.classList.remove('editing');
  });

  div.appendChild(inputToggle);
  div.appendChild(label);
  div.appendChild(destroyButt);
  li.appendChild(div);
  li.appendChild(inputEdit);

  return li;
}
