import {ArrayDescription} from './data.js';
import {showBigPictrue} from './open-big-picture.js';

const picturesContainer = document.querySelector('.pictures');
const picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');
const similarArrayDescription = ArrayDescription();
const createPictures = document.createDocumentFragment();

similarArrayDescription.forEach(({url, likes, comments, description}) => {
  const pictureElement = picturesTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    showBigPictrue(url, likes, comments, description);
  });

  createPictures.append(pictureElement);
});

picturesContainer.append(createPictures);
