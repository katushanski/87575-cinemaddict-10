import AbstractComponent from './abstract-component.js';

class AbstractSmartComponent extends AbstractComponent {
  recoveryListeners() {

  }

  rerender() {
    const oldElement = this.getElement();
    const parent = oldElement.parentElement;

    this.removeElement();

    const newElement = this.getElement();
    parent.replaceChild(newElement, oldElement);

    this.recoveryListeners();
  }
}

export default AbstractSmartComponent;
