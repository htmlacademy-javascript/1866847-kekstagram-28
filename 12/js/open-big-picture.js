import {isEscapeKey} from './util.js';

const NUMBER_OF_COMMENTS = 5;
let featuredComments = [];

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const pictureImg = document.querySelector('.big-picture__img');
const pictureLikesCount = document.querySelector('.likes-count');
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

const showComments = (comments) => {
  const shownComments = comments.slice(0, NUMBER_OF_COMMENTS);

  createFullPictureComment(shownComments);
  commentsCount.textContent =
   `${shownComments.length} из ${comments.length} комментариев`;

  if (shownComments.length >= comments.length) {
    commentsLoader.classList.add('hidden');
  }

};

const loadComments = () => {
  const additionalСomments = featuredComments
    .slice(commentsContainer.children.length, commentsContainer.children.length + 5);

  createFullPictureComment(additionalСomments);
  commentsCount.textContent =
   `${commentsContainer.children.length} из ${featuredComments.length} комментариев`;

  if (featuredComments.length <= commentsContainer.children.length) {
    commentsLoader.classList.add('hidden');
  }

};

const showBigPictrue = (url, likes, comments, description) => {
  openUserModal();
  pictureImg.querySelector('img').src = url;
  pictureLikesCount.textContent = likes;
  bigPictureComments.textContent = comments.length;
  photoCaption.textContent = description;
  commentsContainer.innerHTML = '';
  featuredComments = comments;
  commentsLoader.addEventListener('click', loadComments);
  showComments(comments);
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
}

function closeUserModal() {
  bigPicture .classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);

  commentsLoader.classList.remove('hidden');
  commentsLoader.removeEventListener('click', loadComments);
}

cancelBigPicture.addEventListener('click', () =>
  closeUserModal()
);

export {showBigPictrue};
