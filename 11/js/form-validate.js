import { isEscapeKey } from './util.js';
import { sendData } from './api.js';
import { createError , createSuccess } from './util.js';
import { closeUserModal, body } from './upload-modal.js';

const VALID_HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG = 5;
const form = document.querySelector('.img-upload__form');
const submitButtonElement = form.querySelector('#upload-submit');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');

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

//Валидация поля textarea
const validateCommentMin = (text) => text.length > 5;
pristine.addValidator(
  commentField,
  validateCommentMin,
  'Длина комментария не может составлять меньше 5 символов'
);

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Публикую...';

};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Опубликовать';

};

const setUserFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          blockSubmitButton();
          createSuccess();
          body.classList.add('modal-open');
        },
        () => {
          createError();
          unblockSubmitButton();
          body.classList.add('modal-open');
        },
        new FormData(evt.target),
        unblockSubmitButton
      );
    }

  });
};

hashtagField.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
    document.activeElement.blur();
  }
});

commentField.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
    document.activeElement.blur();
  }
});

setUserFormSubmit(closeUserModal);
export { commentField, hashtagField };
