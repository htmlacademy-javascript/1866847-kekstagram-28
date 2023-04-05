import { pristine, hashtagFieldElement, commentFieldElement, formElement } from './form-validate.js';

const FORMATS_IMAGES = ['jpg', 'jpeg', 'png'];

const bodyElement = document.querySelector('body');
const uploadFileInputElement = document.querySelector('#upload-file');
const imgUploadOverlayElement = document.querySelector('.img-upload__overlay');
const imgUploadPreviewElement = document.querySelector('.img-upload__preview');
const imgEffectsPreviewElement = document.querySelectorAll('.effects__preview');
const imgUploadCancelElement = document.querySelector('.img-upload__cancel');
const effectLevelElement = document.querySelector('.img-upload__effect-level');
const firstRadioElement = document.querySelector('.effects__radio');

const displayImage = (image) => {
  const img = URL.createObjectURL(image);
  imgUploadPreviewElement.children[0].src = img;
  imgEffectsPreviewElement.forEach((child) => {
    child.style.backgroundImage = `url(${img})`;
  });
};

uploadFileInputElement.addEventListener('change',() => {
  openUserModal();
  const file = uploadFileInputElement.files[0];
  const fileName = file.name.toLowerCase();
  const coincidence = FORMATS_IMAGES.some((it) => fileName.endsWith(it));
  if (coincidence) {
    displayImage(file);
  }
});

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape' && !(document.activeElement === hashtagFieldElement || document.activeElement === commentFieldElement)) {
    evt.preventDefault();
    closeUserModal();
  }
};

const refreshUploadPopup = () => {
  imgUploadPreviewElement.children[0].style.transform = 'scale(1.0)';
  imgUploadPreviewElement.children[0].className = '';
  imgUploadPreviewElement.children[0].style.removeProperty('filter');
  firstRadioElement.value = 'none';
  effectLevelElement.classList.add('hidden');
  firstRadioElement.checked = true;
};

function openUserModal() {
  imgUploadOverlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  refreshUploadPopup();
}

function closeUserModal() {
  formElement.reset();
  pristine.reset();
  imgUploadOverlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadFileInputElement.value = '';
  refreshUploadPopup();
  hashtagFieldElement.value = '';
  commentFieldElement.value = '';
}

imgUploadCancelElement.addEventListener('click', () =>
  closeUserModal()
);

export { imgUploadPreviewElement , effectLevelElement, closeUserModal, onDocumentKeydown, bodyElement };
