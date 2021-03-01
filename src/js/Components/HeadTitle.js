export default class HeadTitle extends HTMLTitleElement {
  constructor() {
    document.addEventListener('state.changed', (e) => {
      if (e.detail.changedStates.includes('pageTitle')) {
        this.render();
      }
    });

    super();
  }

  render = () => {
    this.innerText = this.store.state?.pageTitle
  }
}
