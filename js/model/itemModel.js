import generUniqId from '../helpers/idGenerator';

export default class ItemModel {
  constructor(title) {
    this.uid = generUniqId();
    this.title = title;
    this.completed = false;
  }

  setTitle(title) {
    this.title = title;
  }

  switchState() {
    this.completed = !this.completed;
  }

  setCompleted() {
    this.completed = true;
  }

  setIncompleted() {
    this.completed = false;
  }

  isCompleted() {
    return this.completed;
  }
}
