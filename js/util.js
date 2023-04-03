import { closeUserModal ,onDocumentKeydown } from './upload-modal.js';

const ALERT_SHOW_TIME = 5000;
const errorElement = document.querySelector('#error').content;
const successElement = document.querySelector('#success').content;

export const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = (message) => {
  const alertContainer = document.createElement('div');

  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '20px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);

};

// Создание окна ошибки
const createError = () => {
  const errorClone = errorElement.querySelector('section').cloneNode(true);
  document.body.insertAdjacentElement('beforeend', errorClone);

  document.removeEventListener('keydown', onDocumentKeydown);
  document.addEventListener('keydown', onErrorKeydown);

  const removeErrorNoti = () => {
    errorClone.remove();
    document.removeEventListener('keydown', onErrorKeydown);
    document.addEventListener('keydown', onDocumentKeydown);
  };

  const removeErrorOutside = (evt) => {
    if (!evt.target.closest('.error__inner')) {
      removeErrorNoti();
      document.removeEventListener('click', removeErrorOutside);
    }
  };

  function onErrorKeydown(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      errorClone.remove();
      document.removeEventListener('keydown', onErrorKeydown);
      document.addEventListener('keydown', onDocumentKeydown);
      document.removeEventListener('click', removeErrorOutside);
    }
  }

  errorClone.querySelector('.error__button').addEventListener('click', () => {
    removeErrorNoti();
    document.removeEventListener('click', removeErrorOutside);
  });

  document.addEventListener('click', removeErrorOutside);
};

// Создание окна успеха
const createSuccess = () => {
  const successClone = successElement.querySelector('section').cloneNode(true);
  document.body.insertAdjacentElement('beforeend', successClone);

  const removeSuccessNoti = () => {
    closeUserModal();
    successClone.remove();
    document.removeEventListener('keydown', onSuccessKeydown);
  };

  const removeSuccessOutside = (evt) => {
    if (!evt.target.closest('.success__inner')) {
      removeSuccessNoti();
      document.removeEventListener('click', removeSuccessOutside);
    }
  };

  function onSuccessKeydown(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      successClone.remove();
      document.removeEventListener('keydown', onSuccessKeydown);
      document.removeEventListener('click', removeSuccessOutside);
    }
  }

  document.addEventListener('keydown',onSuccessKeydown);

  successClone.querySelector('.success__button').addEventListener('click', () => {
    removeSuccessNoti();
    document.removeEventListener('click', removeSuccessOutside);
  });

  document.addEventListener('click', removeSuccessOutside);
};

const shuffle = (array) => {
  const newArray = array.slice();
  newArray.sort(() => Math.random() - 0.5);
  return newArray;
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { showAlert, createError, createSuccess, shuffle, debounce };
