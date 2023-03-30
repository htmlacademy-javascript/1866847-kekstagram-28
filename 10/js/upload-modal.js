import { isEscapeKey } from './util.js';
import { pristine } from './form-validate.js';

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
  displayImage(file);
});

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

function openUserModal() {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  imgUploadPreview.children[0].style.transform = 'scale(1.0)';
  imgUploadPreview.children[0].className = '';
  imgUploadPreview.children[0].style.removeProperty('filter');
  firstRadioElement.value = 'none';
  effectLevelContainer.classList.add('hidden');
}

function closeUserModal() {
  form.reset();
  pristine.reset();
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadFileInput.value = '';
}

imgUploadCancel.addEventListener('click', () =>
  closeUserModal()
);

export { imgUploadPreview , effectLevelContainer };
