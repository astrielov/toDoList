import 'mock-local-storage';
import sinon from 'sinon';
import test from 'ava';
import StoreModel from '../storeModel';

test.beforeEach((t) => {
  t.context.model = new StoreModel();
});

test('add new item with valid title', (t) => {
  const { model } = t.context;
  const title = 'testTitle';
  model.addItem(title);

  t.is(model.getIncompleted().length, 1, 'todos amount should be 1');
  t.is(model.todos[0].title, title, 'new todo title must match');
  t.false(model.todos[0].completed);
});

test('check store getIncompleted() method', (t) => {
  const { model } = t.context;
  model.addItem('first');
  model.addItem('second');

  t.deepEqual(model.getIncompleted(), model.todos, 'arrays must be equal');
});


test.todo('add new item to model');
test.todo('new valid title for excisting item');
test.todo('new invalid title for excisting item');
