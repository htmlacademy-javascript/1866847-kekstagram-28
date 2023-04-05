import { sendData } from './api.js';
import { createError , createSuccess } from './util.js';
import { closeUserModal, bodyElement } from './upload-modal.js';

const VALID_HASHTAG = /#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG = 5;
const MAX_TEXT_COMMENTS = 140;
const formElement = document.querySelector('.img-upload__form');
const submitButtonElement = formElement.querySelector('#upload-submit');
const hashtagFieldElement = document.querySelector('.text__hashtags');
const commentFieldElement = document.querySelector('.text__description');

export const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'form__item--invalid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'text__hashtags-error',
});

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

// Валидатор на одинаковые хештеги
pristine.addValidator(
  hashtagFieldElement,
  hashtagsValidateSimilar,
  'Нельзя использовать одинаковые хештеги!'
);

// Валидатор правильности хештега
pristine.addValidator(
  hashtagFieldElement,
  hashtagValidate,
  'Не верно введен хештег'
);

// Валидатор на количество хештегов
pristine.addValidator(
  hashtagFieldElement,
  hashtagValidateCount,
  'Допустимое количество хештегов: 5'
);

//Валидация поля textarea
const validateCommentMax = (text) => text.length < MAX_TEXT_COMMENTS;
pristine.addValidator(
  commentFieldElement,
  validateCommentMax,
  'Длина комментария не может составлять больше 140 символов'
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
  formElement.addEventListener('submit', (evt) => {
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
          bodyElement.classList.add('modal-open');
        },
        () => {
          createError();
          unblockSubmitButton();
          bodyElement.classList.add('modal-open');
        },
        new FormData(evt.target),
        unblockSubmitButton
      );
    }

  });
};

setUserFormSubmit(closeUserModal);
export { commentFieldElement, hashtagFieldElement, formElement };
