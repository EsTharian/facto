export default class Router extends HTMLElement {
  constructor() {
    super();
    window.route = this.route;

    window.addEventListener('popstate', (e) => {
      this.onRouteChange();
    });

    this.onRouteChange();
  }

  onRouteChange = () => {
    this.url = new URL(window.location.href.replace('#/', ''));
    this.store.state = this.routes[this.getCurrentRouteName()].state;
    document.getElementById('switcher').innerHTML = `
      <${this.routes[this.getCurrentRouteName()].component}>
      </${this.routes[this.getCurrentRouteName()].component}>
    `
  }

  routes = {
    list: {
      url: '/',
      state: {
        pageTitle: 'Listeleme'
      },
      component: 'wc-list'
    },
    new: {
      url: '/yeni-ekle',
      state: {
        pageTitle: 'Yeni Ekle'
      },
      component: 'wc-new'
    }
  }

  route = (name) => {
    history.pushState({
      component: this.routes[name].component
    }, '', `/#${this.routes[name].url}`);
    this.onRouteChange();
  }

  url = new URL(window.location.href.replace('#/', ''))

  getCurrentRouteName = () => {
    return Object.keys(this.routes)
      .filter((name) => this.routes[name].url === this.url.pathname)[0];
  }
}
