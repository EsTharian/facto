import './scss/index.scss';
import store from './js/Store';
import App from './js';

document.addEventListener('DOMContentLoaded',
  () => {
    store.subscribe(App);
    new App();
  });
