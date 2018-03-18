import 'mock-local-storage';
import { spy } from 'sinon';
import { test } from 'ava';
import StoreModel from '../js/model/store_model';

test.beforeEach(() => localStorage.clear());

test.todo('constructor() pulls todos from storage on creation');

test('pushToStorage() test #1', (t) => {
  const name = 'model';
  const model = new StoreModel(name);
  model.todos.push(
    { title: '0', id: 'id#0', completed: false },
    { title: '1', id: 'id#1', completed: true },
    { title: '2', id: 'id#2', completed: false },
  );

  model.pushToStorage();

  t.deepEqual(JSON.parse(localStorage.getItem(name)), model.todos);
});

test('pullFromStorage() test #1', (t) => {
  const name = 'model';
  const todos = [
    { title: '0', id: 'id#0', completed: false },
    { title: '1', id: 'id#1', completed: true },
    { title: '2', id: 'id#2', completed: false },
  ];
  localStorage.setItem(name, JSON.stringify(todos));
  const model = new StoreModel(name);

  t.deepEqual(model.todos, todos);
});

test('pullFromStorage() test #2', (t) => {
  const model = new StoreModel();

  t.deepEqual(model.todos, []);
});

test('getCompleted() test #1', (t) => {
  const model = new StoreModel();
  model.todos.push(
    { title: '0', id: 'id#0', completed: false },
    { title: '1', id: 'id#1', completed: true },
    { title: '2', id: 'id#2', completed: false },
    { title: '3', id: 'id#3', completed: true },
  );

  t.deepEqual(model.getCompleted(), [model.todos[1], model.todos[3]]);
});

test('getCompleted() test #2. No todos. Returns empty array', (t) => {
  const model = new StoreModel();

  t.deepEqual(model.getCompleted(), []);
});

test('getIncompleted() test #1', (t) => {
  const model = new StoreModel();
  model.todos.push(
    { title: '0', id: 'id#0', completed: false },
    { title: '1', id: 'id#1', completed: true },
    { title: '2', id: 'id#2', completed: false },
  );

  t.deepEqual(model.getIncompleted(), [model.todos[0], model.todos[2]]);
});

test('getIncompleted() test #2. No todos. Returns empty array', (t) => {
  const model = new StoreModel();

  t.deepEqual(model.getIncompleted(), []);
});

test('setAllCompletion() test #1. Set all to complete using bool', (t) => {
  const model = new StoreModel();
  model.todos.push(
    { title: '0', id: 'id#0', completed: false },
    { title: '1', id: 'id#1', completed: true },
    { title: '2', id: 'id#2', completed: false },
    { title: '3', id: 'id#3', completed: true },
  );

  model.pushToStorage = spy();
  model.setAllCompletion(true);

  t.true(model.todos.every(todo => todo.completed === true));
  t.true(model.pushToStorage.calledOnce);
});

test('setAllCompletion() test #2. Set all to complete using not bool', (t) => {
  const model = new StoreModel();
  model.todos.push(
    { title: '0', id: 'id#0', completed: false },
    { title: '1', id: 'id#1', completed: true },
    { title: '2', id: 'id#2', completed: false },
    { title: '3', id: 'id#3', completed: true },
  );

  model.setAllCompletion(0);

  t.true(model.todos.every(todo => todo.completed === false));
});

test('allComplete() test #1', (t) => {
  const model = new StoreModel();
  model.todos.push(
    { title: '0', id: 'id#0', completed: false },
    { title: '1', id: 'id#1', completed: true },
    { title: '2', id: 'id#2', completed: false },
    { title: '3', id: 'id#3', completed: true },
  );

  t.false(model.allComplete());
});

test('allComplete() test #2', (t) => {
  const model = new StoreModel();
  model.todos.push(
    { title: '0', id: 'id#0', completed: true },
    { title: '1', id: 'id#1', completed: true },
    { title: '2', id: 'id#2', completed: true },
    { title: '3', id: 'id#3', completed: true },
  );

  t.true(model.allComplete());
});

test('removeCompleted() test #1', (t) => {
  const model = new StoreModel();
  model.todos.push(
    { title: '0', id: 'id#0', completed: false },
    { title: '1', id: 'id#1', completed: true },
    { title: '2', id: 'id#2', completed: false },
    { title: '3', id: 'id#3', completed: true },
  );

  model.removeCompleted();

  t.true(model.todos.every(todo => todo.completed === false));
  t.true(model.todos.length === 2);
});

test('addItem() test #1. Valid title', (t) => {
  const model = new StoreModel();
  const title = 'test title';

  model.addItem(title);

  t.is(model.todos[0].title, title);
});

test('addItem() test #2. Valid title. trim() needed', (t) => {
  const model = new StoreModel();
  const title = '     test title   ';

  model.addItem(title);

  t.is(model.todos[0].title, title.trim());
});

test('addItem() test #3. Invalid title. Doesn\'t add item', (t) => {
  const model = new StoreModel();
  const title = '        ';

  model.addItem(title);

  t.is(model.todos.length, 0);
});

test('setItemTitle() test #1. New valid title', (t) => {
  const model = new StoreModel();
  const title = 'valid title';
  const newTitle = 'new valid title';
  const id = 'thisIsID';
  model.todos.push(
    { title: '0', id: 'id#0', completed: false },
    { title, id, completed: true },
    { title: '2', id: 'id#2', completed: false },
    { title: '3', id: 'id#3', completed: true },
  );

  model.setItemTitle(newTitle, id);

  t.is(model.todos[1].title, newTitle);
});

test('setItemTitle() test #2. New valid title. trim() needed', (t) => {
  const model = new StoreModel();
  const title = 'valid title';
  const newTitle = '      new valid     title                 ';
  const id = 'thisIsID';
  model.todos.push(
    { title: '0', id: 'id#0', completed: false },
    { title, id, completed: true },
    { title: '2', id: 'id#2', completed: false },
    { title: '3', id: 'id#3', completed: true },
  );

  model.setItemTitle(newTitle, id);

  t.is(model.todos[1].title, newTitle.trim());
});

test('setItemTitle() test #3. New invalid title. Item remove method must be called', (t) => {
  const model = new StoreModel();
  const title = 'valid title';
  const newTitle = '                       ';
  const id = 'thisIsID';
  model.todos.push(
    { title: '0', id: 'id#0', completed: false },
    { title, id, completed: true },
    { title: '2', id: 'id#2', completed: false },
    { title: '3', id: 'id#3', completed: true },
  );
  model.removeItem = spy();

  model.setItemTitle(newTitle, id);

  t.true(model.removeItem.withArgs(id).calledOnce);
});

test('toggleItem() test #1', (t) => {
  const model = new StoreModel();
  const id = 'thisIsID';
  const state = true;
  model.todos.push(
    { title: '0', id: 'id#0', completed: false },
    { title: '1', id, completed: state },
    { title: '2', id: 'id#2', completed: false },
    { title: '3', id: 'id#3', completed: true },
  );

  model.toggleItem(id);

  t.true(model.todos[1].completed === !state);
});
