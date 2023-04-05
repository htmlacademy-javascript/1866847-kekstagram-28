import { imgUploadPreviewElement, effectLevelElement } from './upload-modal.js';

const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;

const scaleDecreaseElement = document.querySelector('.scale__control--smaller');
const scaleIncreasesElement = document.querySelector('.scale__control--bigger');
const scaleValueElement = document.querySelector('.scale__control--value');
const imgPreview = imgUploadPreviewElement.querySelector('img');
const effectsRadioElements = document.querySelectorAll('.effects__radio');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderEffectElement = document.querySelector('.effect-level__value');

const FILTER_EFFECTS = {
  'chrome': {
    filter: 'grayscale',
    measurement: '',
  },
  'sepia': {
    filter: 'sepia',
    measurement: '',
  },
  'marvin': {
    filter: 'invert',
    measurement: '%',
  },
  'phobos': {
    filter: 'blur',
    measurement: 'px',
  },
  'heat': {
    filter: 'brightness',
    measurement: '',
  },
  'none': {
    filter: '',
    measurement: ''
  }

};

// Масштаб изображения
scaleDecreaseElement.addEventListener('click', () => {
  let value = parseInt(scaleValueElement.value, 10);
  value -= SCALE_STEP;
  if (value <= MIN_SCALE) {
    value = MIN_SCALE;
  }
  imgPreview.style.transform = `scale(${value / 100})`;
  scaleValueElement.value = `${value}%`;
});

scaleIncreasesElement.addEventListener('click', () => {
  let value = parseInt(scaleValueElement.value, 10);
  value += SCALE_STEP;
  if (value >= MAX_SCALE) {
    value = MAX_SCALE;
  }
  imgPreview.style.transform = `scale(${value / 100})`;
  scaleValueElement.value = `${value}%`;
});

// Применение эффекта на картинку и параметров слайдера.
effectsRadioElements.forEach((element) => {
  if (element.checked && element.id === 'effect-none'){
    effectLevelElement.classList.add('hidden');
  }
  element.addEventListener('change', () => {
    for (let i = 0; i < effectsRadioElements.length; i++) {
      const iterableEffectName = effectsRadioElements[i].id.replace('effect-', '');
      imgPreview.classList.remove(`effects__preview--${iterableEffectName}`);
    }

    const currentEffectName = element.id.replace('effect-', '');
    if (element.checked) {
      if (element.id !== 'effect-none'){
        effectLevelElement.classList.remove('hidden');
      }
      imgPreview.classList.add(`effects__preview--${currentEffectName}`);
      effectsRadioElements[0].value = currentEffectName;
      if (currentEffectName === 'chrome') {
        sliderElement.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 1,
          },
          start: 1,
          step: 0.1,
        });

      } else if (currentEffectName === 'sepia') {
        sliderElement.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 1,
          },
          start: 1,
          step: 0.1,
        });

      } else if (currentEffectName === 'marvin') {
        sliderElement.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 100,
          },
          start: 100,
          step: 1,
        });

      } else if (currentEffectName === 'phobos') {
        sliderElement.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 3,
          },
          start: 3,
          step: 0.1,
        });

      } else if (currentEffectName === 'heat') {
        sliderElement.noUiSlider.updateOptions({
          range: {
            min: 1,
            max: 3,
          },
          start: 3,
          step: 0.1,
        });

      } else {
        imgPreview.style.removeProperty('filter');
        document.querySelector('.effect-level__value').value = '';
        effectLevelElement.classList.add('hidden');
      }

    }

  });

});

// Создание слайдера
noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function(value) {
      if(Number.isInteger(value)) {
        return value;
      }
      return value.toFixed(1);
    },
    from: function(value) {
      return parseFloat(value);
    }
  }
});

sliderElement.noUiSlider.on('update', () => {
  for (let i = 0; i < Object.keys(FILTER_EFFECTS).length; i++) {
    const filterKey = Object.keys(FILTER_EFFECTS)[i];
    sliderEffectElement.value = sliderElement.noUiSlider.get();

    if (effectsRadioElements[0].value === filterKey && filterKey !== 'none') {
      imgPreview.style.filter =
       `${FILTER_EFFECTS[filterKey].filter}(${sliderEffectElement.value}${FILTER_EFFECTS[filterKey].measurement})`;
    }
  }
});
