export default class PageTitle extends HTMLHeadingElement {
  constructor() {
    document.addEventListener('state.changed', (e) => {
      if (e.detail.changedStates.includes('pageTitle')) {
        this.render();
      }
    });

    super();
  }

  connectedCallback() {
    this.store.state = {
      pageTitle: this.page
    }
  }

  render = () => {
    this.innerText = this.store.state?.pageTitle
  }
}
