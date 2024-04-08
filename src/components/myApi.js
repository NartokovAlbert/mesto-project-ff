//Данные АПИ
const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-10",
  headers: {
    authorization: "029812ac-db75-4940-a281-61e95d3e0b25",
    "Content-Type": "application/json",
  },
};

//отправляем запроса
const pullRequest = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
};

//Массив всех получаемых данных
const allInfo = async () => {
  return Promise.all([profileInfo(), profileCards()]);
};

//Загрузка данных о пользователе
const profileInfo = async () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then((res) => pullRequest(res))
    .catch((err) => {
      console.log("Ошибка", err);
    });
};

//Получаем информацию о карточке
const profileCards = async () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then((res) => pullRequest(res))
    .catch((err) => {
      console.log("Ошибка", err);
    });
};

//Обновление  данных о пользователе
const profileUserInfo = async (userProfileData) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: userProfileData.name,
      about: userProfileData.about,
    }),
  })
    .then((res) => pullRequest(res))
    .catch((err) => {
      console.log("Ошибка", err);
    });
};

//Добавление карточек
const getNewCard = async (cardData) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: cardData.name,
      link: cardData.link,
    }),
  })
    .then((res) => pullRequest(res))
    .catch((err) => {
      console.log("Ошибка", err);
    });
};

//Поставили лайк
const profileLike = async (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  })
    .then((res) => pullRequest(res))
    .catch((err) => {
      console.log("Ошибка", err);
    });
};

//Удалили лайк
const deleteLike = async (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => pullRequest(res))
    .catch((err) => {
      console.log("Ошибка", err);
    });
};

//Удаление карточки
const deleteCardProfile = async (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => pullRequest(res))
    .catch((err) => {
      console.log("Ошибка", err);
    });
};

//Отправка аватара
const profileAvatar = async (avatarLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink,
    }),
  })
    .then((res) => pullRequest(res))
    .catch((err) => {
      console.log("Ошибка", err);
    });
};

export {
  profileInfo,
  profileCards,
  allInfo,
  profileUserInfo,
  getNewCard,
  profileLike,
  deleteLike,
  deleteCardProfile,
  profileAvatar,
};
