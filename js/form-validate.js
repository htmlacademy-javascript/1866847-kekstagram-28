import { isEscapeKey } from './util.js';

const VALID_HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG = 5;
const form = document.querySelector('.img-upload__form');
const hashtagField = form.querySelector('.text__hashtags');
const commentFiled = form.querySelector('.text__description');

export const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'form__item--invalid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'text__hashtags-error',
});

const isEmpty = (text) => text.length > 0;
const hashtagValidate = (text) => VALID_HASHTAG.test(text) || text === '';

const hashtagValidateCount = (text) =>
  text
    .split('')
    .filter((tag) => tag === '#')
    .length <= MAX_HASHTAG;

const hashtagsValidateSimilar = (text) => {
  const textArray = text
    .replaceAll(' ','')
    .toLowerCase()
    .split('#');
  textArray.shift();
  const unique = Array.from(new Set(textArray));
  return textArray.length === unique.length;
};

// Валидатор на пустую строку
pristine.addValidator(
  hashtagField,
  isEmpty,
  'Нельзя оставлять поле пустым!'
);

// Валидатор на одинаковые хештеги
pristine.addValidator(
  hashtagField,
  hashtagsValidateSimilar,
  'Нельзя использовать одинаковые хештеги!'
);

// Валидатор правильности хештега
pristine.addValidator(
  hashtagField,
  hashtagValidate,
  'Не верно введен хештег'
);

// Валидатор на количество хештегов
pristine.addValidator(
  hashtagField,
  hashtagValidateCount,
  'Допустимое количество хештегов: 5'
);


form.addEventListener('submit', (evt) => {
  const valid = pristine.validate();
  if (valid) {
    form.submit();
  }
  evt.preventDefault();
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
