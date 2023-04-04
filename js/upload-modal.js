import { isEscapeKey } from './util.js';
import { pristine, hashtagField, commentField } from './form-validate.js';

const FORMATS_IMAGES = ['jpg', 'jpeg', 'png'];

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const uploadFileInput = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadPreview = document.querySelector('.img-upload__preview');
const imgEffectsPreview = document.querySelectorAll('.effects__preview');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const firstRadioElement = document.querySelector('.effects__radio');

const displayImage = (image) => {
  const img = URL.createObjectURL(image);
  imgUploadPreview.children[0].src = img;
  imgEffectsPreview.forEach((child) => {
    child.style.backgroundImage = `url(${img})`;
  });
};

uploadFileInput.addEventListener('change',() => {
  openUserModal();
  const file = uploadFileInput.files[0];
  const fileName = file.name.toLowerCase();
  const coincidence = FORMATS_IMAGES.some((it) => fileName.endsWith(it));
  if (coincidence) {
    displayImage(file);
  }
});

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

const refreshUploadPopup = () => {
  imgUploadPreview.children[0].style.transform = 'scale(1.0)';
  imgUploadPreview.children[0].className = '';
  imgUploadPreview.children[0].style.removeProperty('filter');
  firstRadioElement.value = 'none';
  effectLevelContainer.classList.add('hidden');
  firstRadioElement.checked = true;
};

function openUserModal() {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  refreshUploadPopup();
}

function closeUserModal() {
  form.reset();
  pristine.reset();
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadFileInput.value = '';
  refreshUploadPopup();
  hashtagField.value = '';
  commentField.value = '';
}

imgUploadCancel.addEventListener('click', () =>
  closeUserModal()
);

export { imgUploadPreview , effectLevelContainer, closeUserModal, onDocumentKeydown, body };
