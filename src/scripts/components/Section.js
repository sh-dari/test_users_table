export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.append(element);
  }

  addItemEnd(element) {
    this._container.prepend(element);
  }

  renderItems(renderedItems) {
    renderedItems.forEach(item => {
      this._renderer(item);
    });
  }
}
