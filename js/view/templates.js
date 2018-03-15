export default class Templates {

  static item(title, completed) {
    return `
    <div class="view">
      <input class="toggle" type="checkbox">
      <label>${title}</label>
      <button class="destroy"></button>
    </div>
    <!--<input class="edit" value="${title}">-->`
      ;
  }

  static todoCount(itemsAmount) {
    return `<strong>${itemsAmount}</strong> item${itemsAmount === 1 ? '': 's'} left`;
  }
}
