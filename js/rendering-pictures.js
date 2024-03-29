import {showBigPictrue} from './open-big-picture.js';
import {getData} from './api.js';
import { shuffle, debounce } from './util.js';

const RANDOM_PICS = 10;
const TIME_DELAY = 500;

const picturesContainerElement = document.querySelector('.pictures');
const picturesTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
const imgFiltersContainerElement = document.querySelector('.img-filters');
const imgFilterButtonsElements = document.querySelectorAll('.img-filters__button');

const renderSimilarPosts = (similarArrayDescription) => {
  const similarPostsFragment = document.createDocumentFragment();

  similarArrayDescription.forEach(({url, likes, comments, description}) => {
    const pictureElement = picturesTemplateElement.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;

    pictureElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      showBigPictrue(url, likes, comments, description);
    });

    similarPostsFragment.append(pictureElement);
  });

  picturesContainerElement.append(similarPostsFragment);
};

const buttonActive = (evt) => {
  imgFilterButtonsElements.forEach((option) => {
    if (evt.target.classList.contains('img-filters__button')) {
      option.classList.remove('img-filters__button--active');
    }
  });
  if (evt.target.classList.contains('img-filters__button')) {
    evt.target.classList.add('img-filters__button--active');
  }

};

const switchPhotosByFilter = (posts, evt) => {
  if (evt.target.classList.contains('img-filters__button')) {
    document.querySelectorAll('.picture').forEach((pic) => {
      pic.remove();
    });
  }
  let photosList = posts;
  switch (evt.target.id) {
    case 'filter-default':
      renderSimilarPosts(photosList);
      break;
    case 'filter-random':
      photosList = shuffle(posts).slice(0, RANDOM_PICS);
      renderSimilarPosts(photosList);
      break;
    case 'filter-discussed':
      photosList = posts
        .slice()
        .sort((a, b) => {
          if (a.comments.length < b.comments.length) {
            return 1;
          } else {
            return -1;
          }
        });
      renderSimilarPosts(photosList);
      break;
  }

};

getData((posts) => {
  renderSimilarPosts(posts);
  imgFiltersContainerElement.addEventListener('click', debounce((evt) => switchPhotosByFilter(posts, evt), TIME_DELAY));
  imgFiltersContainerElement.addEventListener('click', (evt) => buttonActive(evt));
});
