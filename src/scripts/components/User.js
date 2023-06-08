export default class User {
  constructor({ data, handleDeleteClick }, templateSelector) {
    this._name = data.username;
    this._email = data.email;
    this._date = data.registration_date;
    this._rating = data.rating;
    this._id = data.id;
    this._handleDeleteClick = handleDeleteClick;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const userElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.elements__item')
      .cloneNode(true);
    return userElement;
  }

  _setEventListeners() {
    this._buttonDelete = this._element.querySelector('.elements__cancel');
    this._buttonDelete.addEventListener('click', this._handleDeleteClick.bind(this));
  }

  deleteUser() {
    this._element.remove();
  }

  getId() {
    return this._id
  }

  generateUser() {
    this._element = this._getTemplate();
    const date = this._date.split(/\-|\T/);
    const newDate = `${date[0]}.${date[1]}.${date[2]}`;

    this._element.querySelector('.elements__username').textContent = this._name;
    this._element.querySelector('.elements__email').textContent = this._email;
    this._element.querySelector('.elements__date').textContent = newDate;
    this._element.querySelector('.elements__rating').textContent = this._rating;

    this._setEventListeners();

    return this._element;
  }
}
