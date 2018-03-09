import generUniqId from '../utilities/idGenerator';

export default class ToDoModel {
  constructor(title) {
    this.uid = generUniqId();
    this.title = title.trim();
    this.completed = false;
  }

  setTitle(title) {
    this.title = title.trim();
  }
}
