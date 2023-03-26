import { isEscapeKey } from './util.js';

const body = document.querySelector('body');
const uploadFileInput = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadPreview = document.querySelector('.img-upload__preview');
const imgEffectsPreview = document.querySelectorAll('.effects__preview');
const imgUploadCancel = document.querySelector('.img-upload__cancel');

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
}

function closeUserModal() {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadFileInput.value = '';
}

imgUploadCancel.addEventListener('click', () =>
  closeUserModal()
);
