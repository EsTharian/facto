class Store {
  constructor() {
    this.subscribe.bind(this);
  }

  #store = {
    stateHolder: {},
    set state(state) {
      Object.defineProperties(this.stateHolder,
        Object.getOwnPropertyDescriptors(state));

      document.dispatchEvent(new CustomEvent('state.changed', {
        detail: {
          changedStates: Object.keys(state)
        }
      }));
    },
    get state() {
      return this.stateHolder;
    }
  }

  subscribe(Obj) {
    Obj.prototype.store = this.#store;
  }
}

export default new Store();
