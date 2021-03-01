export default class List extends HTMLElement {
  template = document.getElementById('wc-list-item').content

  connectedCallback() {
    const linkElem = document.createElement('link');
    linkElem.setAttribute('rel', 'stylesheet');
    linkElem.setAttribute('href', 'main.css');

    this.attachShadow({mode:'open'})
      .appendChild(this.template.cloneNode(true));

    this.shadowRoot.appendChild(linkElem);
  }
}
