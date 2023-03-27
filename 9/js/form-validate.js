import { isEscapeKey } from './util.js';

const VALID_HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG = 5;
const Form = document.querySelector('.img-upload__form');
const hashtagField = Form.querySelector('.text__hashtags');
const commentFiled = Form.querySelector('.text__description');

const pristine = new Pristine(Form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'form__item--invalid',
  // successClass: 'form__item--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'text__hashtags-error',
});

const HashtagValidate = (text) => VALID_HASHTAG.test(text) || text === '';

const HashtagValidateCount = (text) =>
  text
    .split('')
    .filter((tag) => tag === '#')
    .length <= MAX_HASHTAG;

const HashtagsValidateSimilar = (text) => {
  const textArray = text
    .replaceAll(' ','')
    .toLowerCase()
    .split('#');
  textArray.shift();
  const unique = Array.from(new Set(textArray));
  return textArray.length === unique.length;
};

// Валидатор на одинаковые хештеги
pristine.addValidator(
  hashtagField,
  HashtagsValidateSimilar,
  'Нельзя использовать одинаковые хештеги!'
);

// Валидатор правильности хештега
pristine.addValidator(
  hashtagField,
  HashtagValidate,
  'Не верно введен хештег'
);

// Валидатор на количество хештегов
pristine.addValidator(
  hashtagField,
  HashtagValidateCount,
  'Допустимое количество хештегов: 5'
);

Form.addEventListener('submit', () => {
  // evt.preventDefault();
  pristine.validate();
});

hashtagField.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
    document.activeElement.blur();
  }
});

commentFiled.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
    document.activeElement.blur();
  }
});
