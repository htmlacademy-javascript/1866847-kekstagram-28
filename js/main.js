const NAMES = [
  'Майк Тайсон',
  'Геннадий Головкин',
  'Василий Ломаченко',
  'Флойд Майвезер',
  'Рой Джонс',
  'Мохаммед Али'
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTION = [
  'Красивая машинах',
  'Чемпион мира',
  'Бокс',
  'Борьба',
  'Футбол',
  'Биатлон',
  'Вольная борьба',
  'Джиу-джитсу',
  'Дзюдо Источник',
  'Рукопашный бой',
  'Самбо',
  'Теннис',
  'Ушу',
  'Шашки'
];

const AVATAR_MIN_ID = 1;
const AVATAR_MAX_ID = 6;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const ID_MIN = 1;
const ID_MAX = 25;
const URL_MIN = 1;
const URL_MAX = 25;
const COMMENT_ID_MIN = 1;
const COMMENT_ID_MAX = 1000;
const photoId = getRandomValue(ID_MIN, ID_MAX);
const photoUrl = getRandomValue(URL_MIN, URL_MAX);
const commentId = getRandomValue(COMMENT_ID_MIN, COMMENT_ID_MAX);
const DESCRIPTIONS_COUNT = 25;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

function getRandomValue (min, max) {
  const previousValue = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValue.length >= (max - min + 1)) {
      return null;
    }
    while (previousValue.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValue.push(currentValue);
    return currentValue;
  };
}

function commentsGenerator () {
  return {
    id: commentId(),
    avatar: `img/avatar-${getRandomInteger(AVATAR_MIN_ID, AVATAR_MAX_ID)}.svg`,
    message: `${COMMENTS[getRandomInteger(0, COMMENTS.length - 1)]}`,
    name: `${NAMES[getRandomInteger(0, NAMES.length - 1)]}`
  };
}

function generatePos () {
  return {
    id: photoId(),
    url: `photos/${photoUrl()}.jpg`,
    description: `${DESCRIPTION[getRandomInteger(0, DESCRIPTION.length - 1)]}`,
    likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
    comments: commentsGenerator()
  };
}

const ArrayDescription = () => Array.from({length: DESCRIPTIONS_COUNT}, generatePos);
ArrayDescription();
