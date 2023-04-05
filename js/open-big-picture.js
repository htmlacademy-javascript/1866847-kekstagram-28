import {isEscapeKey} from './util.js';

const NUMBER_OF_COMMENTS = 5;
let featuredComments = [];

const bodyElement = document.querySelector('body');
const bigPictureElement = document.querySelector('.big-picture');
const pictureImgElement = document.querySelector('.big-picture__img');
const pictureLikesElement = document.querySelector('.likes-count');
const bigPictureCommentsElement = document.querySelector('.comments-count');
const cancelBigPictureElement = bigPictureElement.querySelector('#picture-cancel');
const commentsContainerElement = document.querySelector('.social__comments');
const photoCaptionElement = document.querySelector('.social__caption');
const separateCommentElement = commentsContainerElement.querySelector('.social__comment');
const commentsCountElement = document.querySelector('.social__comment-count');
const commentsLoaderElement = document.querySelector('.comments-loader');

const createFullPictureComment = (commentsData) => {
  commentsData.forEach(({avatar, name, message}) => {
    const comment = separateCommentElement.cloneNode(true);

    comment.querySelector('.social__picture').src = avatar;
    comment.querySelector('.social__picture').alt = name;
    comment.querySelector('.social__text').textContent = message;

    commentsContainerElement.append(comment);

  });
};

const showComments = (comments) => {
  const shownComments = comments.slice(0, NUMBER_OF_COMMENTS);

  createFullPictureComment(shownComments);
  commentsCountElement.textContent =
   `${shownComments.length} из ${comments.length} комментариев`;

  if (shownComments.length >= comments.length) {
    commentsLoaderElement.classList.add('hidden');
  }

};

const loadComments = () => {
  const additionalСomments = featuredComments
    .slice(commentsContainerElement.children.length, commentsContainerElement.children.length + 5);

  createFullPictureComment(additionalСomments);
  commentsCountElement.textContent =
   `${commentsContainerElement.children.length} из ${featuredComments.length} комментариев`;

  if (featuredComments.length <= commentsContainerElement.children.length) {
    commentsLoaderElement.classList.add('hidden');
  }

};

const showBigPictrue = (url, likes, comments, description) => {
  openUserModal();
  pictureImgElement.querySelector('img').src = url;
  pictureLikesElement.textContent = likes;
  bigPictureCommentsElement.textContent = comments.length;
  photoCaptionElement.textContent = description;
  commentsContainerElement.innerHTML = '';
  featuredComments = comments;
  commentsLoaderElement.addEventListener('click', loadComments);
  showComments(comments);
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

function openUserModal() {
  bigPictureElement .classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

function closeUserModal() {
  bigPictureElement .classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);

  commentsLoaderElement.classList.remove('hidden');
  commentsLoaderElement.removeEventListener('click', loadComments);
}

cancelBigPictureElement.addEventListener('click', () =>
  closeUserModal()
);

export {showBigPictrue};
