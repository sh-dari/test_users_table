export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleCloseEscPopup = this._handleCloseEscPopup.bind(this._popup);
    this._form = this._popup.querySelector('.popup__container');
    this._closeButton = this._popup.querySelector('.popup__button_close');
  }

  _handleCloseEscPopup(evt) {
    if (evt.key === 'Escape'){
      this.classList.remove('popup_opened');
    }
  }

  changeHandleFormSubmit(handleFormSubmit) {
    this._handleFormSubmit = handleFormSubmit;
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleCloseEscPopup);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleCloseEscPopup);
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened') ||
          evt.target.classList.contains('popup__close')) {
        this.close();
      }
    });
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
    this._closeButton.addEventListener('mousedown', (evt) => {
      this.close();
    });
  }
}
