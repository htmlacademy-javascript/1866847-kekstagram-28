import { closeUserModal ,onDocumentKeydown } from './upload-modal.js';

const ALERT_SHOW_TIME = 5000;
const errorElement = document.querySelector('#error').content;
const successElement = document.querySelector('#success').content;

export const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

export const getRandomValue = (min, max, arr) => {
  while (min <= max) {
    const random = getRandomInteger(min, max);
    if (!arr.includes(random)) {
      arr.push(random);
      return random;
    }
  }
};

export const getRandomElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

export const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = (message) => {
  const alertContainer = document.createElement('div');

  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
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

export { showAlert, createError, createSuccess};

/*
//Функция для проверки длины строки
function checkstringLenght(str, maxLength) {
  return String(str).length <= maxLength;
}

checkstringLenght('Проверяемая строка', 20);

//Функция для проверки, является ли строка палиндромом.
const isPalindrom = (string) => {
  const tempString = string
    .toLowerCase()
    .replaceAll(' ', '');
  let reverseString = '';
  for (let i = tempString.length - 1; i >= 0; i--) {
    reverseString += tempString.at(i);
  }

  return tempString === reverseString;
};

isPalindrom('топот');
isPalindrom('ДовОд');
isPalindrom('Кекс');
isPalindrom('Лёша на полке клопа нашёл ');

//Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа. Если в строке нет ни одной цифры, функция должна вернуть NaN.
const extractNumber = (string) => {
  if (typeof string === 'number') {
    return string;
  }
  let result = '';
  for (let i = 0; i < string.length; i++) {
    if (!Number.isNaN(parseInt(string.at(i), 10))) {
      result += string.at(i);
    }
  }
  return parseInt(result, 10);
};

extractNumber('2023 год');
extractNumber('ECMAScript 2022');
extractNumber('1 кефир, 0.5 батона');
extractNumber('агент 007');
extractNumber('а я томат');

//Функция, которая принимает три параметра: исходную строку, минимальную длину и строку с добавочными символами — и возвращает исходную строку, дополненную указанными символами до заданной длины. Символы добавляются в начало строки. Если исходная строка превышает заданную длину, она не должна обрезаться. Если «добивка» слишком длинная, она обрезается с конца.
const myPadStart = (string, minLength, pad) => {
  const actualPad = minLength - string.length;
  if (actualPad <= 0) {
    return string;
  }
  return pad.slice(0, actualPad % pad.length) + pad.repeat(actualPad / pad.length) + string;
};

myPadStart('1', 2, '0');
myPadStart('1', 4, '0');
myPadStart('q', 4, 'werty');
myPadStart('q', 4, 'we');
myPadStart('qwerty', 4, '0');
*/
