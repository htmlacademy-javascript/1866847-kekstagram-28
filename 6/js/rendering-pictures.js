const picturesContainer = document.querySelector('.pictures');
const picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');
const createPictures = document.createDocumentFragment();

export const createElement = (descriptionData) => {
  descriptionData.forEach((Item) => {
    const pictureElement = picturesTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = Item.url;
    pictureElement.querySelector('.picture__likes').textContent = Item.likes;
    pictureElement.querySelector('.picture__comments').textContent = Item['comments'].length;
    createPictures.append(pictureElement);
  });

  picturesContainer.append(createPictures);
};
