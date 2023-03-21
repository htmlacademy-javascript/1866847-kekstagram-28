import {isEscapeKey} from './util.js';

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const PictureImg = document.querySelector('.big-picture__img');
const PictureLikesCount = document.querySelector('.likes-count');
const bigPictureComments = document.querySelector('.comments-count');
const cancelBigPicture = bigPicture.querySelector('#picture-cancel');
const commentsContainer = document.querySelector('.social__comments');
const photoCaption = document.querySelector('.social__caption');
const separateCommentElement = commentsContainer.querySelector('.social__comment');
const commentsCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');

const createFullPictureComment = (commentsData) => {
  commentsData.forEach(({avatar, name, message}) => {
    const comment = separateCommentElement.cloneNode(true);

    comment.querySelector('.social__picture').src = avatar;
    comment.querySelector('.social__picture').alt = name;
    comment.querySelector('.social__text').textContent = message;

    commentsContainer.append(comment);

  });
};

const showBigPictrue = (url, likes, comments, description) => {
  openUserModal();
  PictureImg.querySelector('img').src = url;
  PictureLikesCount.textContent = likes;
  bigPictureComments.textContent = comments.length;
  photoCaption.textContent = description;
  commentsContainer.innerHTML = '';
  createFullPictureComment(comments);
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

function openUserModal() {
  bigPicture .classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);

  commentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
}

function closeUserModal() {
  bigPicture .classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);

  commentsCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
}

cancelBigPicture.addEventListener('click', () =>
  closeUserModal()
);

export {showBigPictrue};
