import './index.css';
import Api from '../scripts/components/Api.js';
import User from '../scripts/components/User.js';
import Section from '../scripts/components/Section.js';
import Popup from '../scripts/components/Popup';

const searchClean = document.querySelector('.search__clean');
const input = document.querySelector('.search__input');

const buttonFilterRegistration = document.querySelector('.filter__button_registration');
const buttonFilterRating = document.querySelector('.filter__button_rating');

const popupDelete = new Popup('.popup');

const api = new Api({
  baseUrl: 'https://5ebbb8e5f2cfeb001697d05c.mockapi.io/users',
  headers: {
    'Content-Type': 'application/json'
  }
});

const userList = new Section(
  {renderer:(item) => {
    userList.addItem(createUser(item));
  }},
  '.elements__list'
);

const createUser = (item) => {
  const user = new User({
    data: item,
    handleDeleteClick: () => {
      popupDelete.changeHandleFormSubmit(()=>{
        user.deleteUser();
        popupDelete.close();
      });
      popupDelete.open();
    }
  }, '#item-template');
  const userElement = user.generateUser();
  return userElement
}

api.getInitialUsers()
  .then(data => {
    userList.renderItems(data);
  })
  .catch((err) => {
    console.log(err);
  });

const search = () => {
  let filter = input.value.toLowerCase();
  let list = document.querySelector('.elements__list');
  let elements = list.querySelectorAll('.elements__item_search');

  for (let i = 0; i < elements.length; i++) {
    if (elements[i].innerHTML.toLowerCase().indexOf(filter) > -1) {
      elements[i].style.display = "";
    } else {
      elements[i].style.display = "none";
    }
  }
}

const cleanSearchText = () => {
  input.value = "";
  search();
}

document.addEventListener('keyup', search);
searchClean.addEventListener('mouseup', cleanSearchText);

const ratingSort = (a, b) => {
  const firstRating = Number(a.querySelector('.elements__rating').textContent);
  const secondRating = Number(b.querySelector('.elements__rating').textContent);
  if(buttonFilterRating.classList.contains('filter__button_active')) {
    return firstRating >= secondRating ? 1 : -1
  }else {
    return firstRating <= secondRating ? 1 : -1
  }
};

const dateSort = (a, b) => {
  const firstDate = a.querySelector('.elements__date').textContent;
  const secondDate = b.querySelector('.elements__date').textContent;
  if(buttonFilterRegistration.classList.contains('filter__button_active')) {
    return firstDate >= secondDate ? 1 : -1
  }else {
    return firstDate <= secondDate ? 1 : -1
  }
};

const filter = (target, sortMethod, anotherButton) => {
  anotherButton.classList.remove('filter__button_active');
  const elements = document.querySelectorAll('.elements__item_search');
  let list = document.querySelector('.elements__list');
  let sorted = [...elements].sort((a, b) => sortMethod(a, b));
  list.append( ...sorted );
  target.classList.toggle('filter__button_active');
};

buttonFilterRegistration.addEventListener('click', (evt) => {
  filter(evt.target, dateSort, buttonFilterRating);
});
buttonFilterRating.addEventListener('click', (evt) => {
  filter(evt.target, ratingSort, buttonFilterRegistration);
});

popupDelete.setEventListeners();
