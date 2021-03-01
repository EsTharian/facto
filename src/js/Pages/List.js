export default class List extends HTMLElement {
  connectedCallback() {
    document.addEventListener('state.changed', (e) => {
      if (e.detail.changedStates.includes('list')
        || e.detail.changedStates.includes('page')) {
        this.render();
      }
    });

    this.store.state = {
      list: JSON.parse(localStorage.getItem('list'))
    }
  }

  render = () => {
    this.store.state
      .list?.slice(this.store.state.page*5 - 5, this.store.state.page*5)
      .forEach((item) => {
        this.innerHTML += `
          <wc-list-item>
            <h5 slot="title" class="card-title">
              ${item.title}
            </h5>
            
            <p slot="desc" class="card-text">
              ${item.desc}
            </p>
            
            <p slot="time" class="card-text">
              ${item.time}
            </p>
            
            <a slot="link" href="${item.url}">
              ${item.link}
            </a>
            
            <span slot="vote">
              ${item.vote}
            </span>
          </wc-list-item>
        `;
      });
  }
}
