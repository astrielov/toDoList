
export default function itemTemplate(title) {
  return `<li>
    <div class="view">
      <input class="toggle" type="checkbox">
      <label>${title}</label>
      <button class="destroy"></button>
    </div>
  </li>`;
}

// <input class="edit" value="${title}">
