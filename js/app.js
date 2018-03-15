import { setListener } from './helpers/helpers';
import StoreModel from './model/storeModel';
import Templates from './view/templates';
import View from './view/view';
import Controller from './controller/controller';

const model = new StoreModel('todo-astrielov');

const templates = new Templates();
const view = new View(templates);

const controller = new Controller(model, view);

setListener(window, 'load', () => controller.setView());
setListener(window, 'hashchange', () => controller.setView());
