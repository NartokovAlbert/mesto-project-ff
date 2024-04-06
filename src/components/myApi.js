const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-10",
  headers: {
    authorization: "029812ac-db75-4940-a281-61e95d3e0b25",
    "Content-Type": "application/json",
  },
};

// Проверка запроса
function requestCheck(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

//Получение данных о пользователе
export const userInfo = async () => {
  try {
    const res = await fetch(`${config.baseUrl}/users/me`, {
      method: "GET",
      headers: config.headers,
    });
    return requestCheck(res);
  } catch (err) {
    console.log("ошибка", err);
  }
};

//Получение данных о карточек
export const cardsInfo = async () => {
  try {
    const res = await fetch(`${config.baseUrl}/cards`, {
      headers: config.headers,
    });
    return requestCheck(res);
  } catch (err) {
    console.log("ошибка", err);
  }
};

//Ред.данные пользователя
export const editUserData = async ({ name, about }) => {
  try {
    const res = await fetch(`${config.baseUrl}/users/me`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({
        name,
        about,
      }),
    });
    return requestCheck(res);
  } catch (err) {
    console.log("ошибка запроса", err);
  }
};
//создать карточку
export const createNewCard = async (name, link) => {
  try {
    const res = await fetch(`${config.baseUrl}/cards`, {
      method: "POST",
      headers: config.headers,
      body: JSON.stringify({
        name,
        link,
      }),
    });
    return requestCheck(res);
  } catch (err) {
    console.log("ошибка запроса", err);
  }
};

//Добавление лайка
export const addLikeCard = async (cardId) => {
  try {
    const res = await fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: config.headers,
    });
    return requestCheck(res);
  } catch (err) {
    console.log("ошибка запроса", err);
  }
};
//Удаление лайка
export const removeCardLike = async (cardId) => {
  try {
    const res = await fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: config.headers,
    });
    return requestCheck(res);
  } catch (err) {
    console.log("ошибка запроса", err);
  }
};

//удаление карточки
export const userDeleteCard = async (cardId) => {
  try {
    const res = await fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: config.headers,
    });
    return requestCheck(res);
  } catch (err) {
    console.log("ошибка удаления карточки", err);
  }
};

//Изменить аватара
export const userAvatar = async ({ avatar }) => {
  try {
    const res = await fetch(`${config.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({
        avatar,
      }),
    });
    return requestCheck(res);
  } catch (err) {
    console.log(avatar, err);
  }
};
