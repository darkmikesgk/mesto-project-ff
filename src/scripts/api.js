const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-8/",
  headers: {
    token: "dd6cce3f-a27e-4c09-af7d-93c6a1fea6ca",
    "Content-Type": "application/json",
  },
};
export const getProfile = () => {
  return fetch(config.baseUrl + "users/me", {
    headers: {
      authorization: config.headers.token,
    },
  })
    .then((result) => {
      if (result.ok) {
        return result.json();
      }
      return Promise.reject(`Что-то пошло не так: ${result.status}`);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
};

export const getCardList = () => {
  return fetch(config.baseUrl + "cards", {
    headers: {
      authorization: config.headers.token,
    },
  })
    .then((result) => {
      if (result.ok) {
        return result.json();
      }
      return Promise.reject(`Что-то пошло не так: ${result.status}`);
    })
    .catch((err) => {
      console.log(`Ошибка. Запрос не выполнен: ${err}`);
    });
};

export const updateProfile = (name, about) => {
  return fetch(config.baseUrl + "users/me", {
    method: "PATCH",
    headers: {
      authorization: config.headers.token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then((result) => {
    if (result.ok) {
      return result.json();
    }
    return Promise.reject(`Что-то пошло не так: ${result.status}`);
  });
};

export const addNewCard = (name, link) => {
  return fetch(config.baseUrl + "cards", {
    method: "POST",
    headers: {
      authorization: config.headers.token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  })
    .then((result) => {
      if (result.ok) {
        return result.json();
      }
      return Promise.reject(`Что-то пошло не так: ${result.status}`);
    })
    .catch((err) => {
      console.log(`Ошибка. Запрос не выполнен: ${err}`);
    });
};

export const removeCard = (data) => {
  return fetch(config.baseUrl + `cards/${data}`, {
    method: "DELETE",
    headers: {
      authorization: config.headers.token,
    },
  })
    .then((result) => {
      if (result.ok) {
        return result.json();
      }
      return Promise.reject(`Что-то пошло не так: ${result.status}`);
    })
    .catch((err) => {
      console.log(`Ошибка. Запрос не выполнен: ${err}`);
    });
};

export const likeCardCountPlus = (data) => {
  return fetch(config.baseUrl + `cards/likes/${data}`, {
    method: "PUT",
    headers: {
      authorization: config.headers.token,
    },
  })
    .then((result) => {
      if (result.ok) {
        return result.json();
      }
      return Promise.reject(`Что-то пошло не так: ${result.status}`);
    })
    .catch((err) => {
      console.log(`Ошибка. Запрос не выполнен: ${err}`);
    });
};

export const likeCardCountMinus = (data) => {
  return fetch(config.baseUrl + `cards/likes/${data}`, {
    method: "DELETE",
    headers: {
      authorization: config.headers.token,
    },
  })
    .then((result) => {
      if (result.ok) {
        return result.json();
      }
      return Promise.reject(`Что-то пошло не так: ${result.status}`);
    })
    .catch((err) => {
      console.log(`Ошибка. Запрос не выполнен: ${err}`);
    });
};

export const updateAvatar = (avatar) => {
  return fetch(config.baseUrl + "users/me/avatar", {
    method: "PATCH",
    headers: {
      authorization: config.headers.token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: avatar,
    }),
  })
    .then((result) => {
      if (result.ok) {
        return result.json();
      }
      return Promise.reject(`Что-то пошло не так: ${result.status}`);
    })
    .catch((err) => {
      console.log(`Ошибка. Запрос не выполнен: ${err}`);
    });
};
