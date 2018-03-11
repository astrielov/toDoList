import StoreModel from './model/storeModel';
import View from './view/view';
import Controller from './controller/controller';

const model = new StoreModel('todo-astrielov');
const view = new View();
const controller = new Controller(model, view);
