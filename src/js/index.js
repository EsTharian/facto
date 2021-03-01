import store from './Store';
import Router from './Route';
import PageTitle from './Components/PageTitle';
import HeadTitle from './Components/HeadTitle';
import ListItem from './Components/ListItem';
import List from './Pages/List';
import New from './Pages/New';

export default class App {
  constructor() {
    [
      PageTitle,
      HeadTitle,
      Router,
      List,
      New
    ].forEach((Obj) => store.subscribe(Obj));

    customElements.define('wc-page-title',
      PageTitle,
      { extends: 'h3' });

    customElements.define('wc-title',
      HeadTitle,
      { extends: 'title' });

    customElements.define('wc-list-item', ListItem);
    customElements.define('wc-list', List);
    customElements.define('wc-new', New);
    customElements.define('wc-router', Router);
  }
}
