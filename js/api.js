import { showAlert } from './util.js';

const imgFilter = document.querySelector('.img-filters');

const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';
const Routes = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const Methods = {
  GET: 'GET',
  POST: 'POST',
};

const errorText = 'Не удалось загрузить данные. Попробуйте обновить страницу.';

const getData = (onSuccess) => {
  fetch(`${BASE_URL}${Routes.GET_DATA}`)
    .then((response) => {
      if(response.ok) {
        imgFilter.classList.remove('img-filters--inactive');
        return response.json();
      } else {
        throw new Error();
      }
    })
    .catch(() => {
      showAlert(errorText);
    }
    )
    .then((photos) => {
      onSuccess(photos);
    });
};

const sendData = (onSuccess, onFail, body, finalSubmit) => {
  fetch(`${BASE_URL}${Routes.SEND_DATA}`,
    {
      method: Methods.POST,
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    })
    .finally(() => {
      finalSubmit();
    });
};


export { getData, sendData };
