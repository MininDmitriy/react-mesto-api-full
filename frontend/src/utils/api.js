class Api {
  constructor(data) {
    this._url = data.url;
    this._headers = data.headers;
  }

  getInfoAboutProfile() {
    return fetch(`${this._url}users/me`, {
      method: 'GET',
      headers: this._headers
    }).then(this._checkResponse);
  }

  getInfoAboutCards() {
    return fetch(`${this._url}cards`, {
      method: 'GET',
      headers: this._headers
    }).then(this._checkResponse);
  }

  changeProfile({newName, newInfo}) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: `${newName}`,
        about: `${newInfo}`
      })
    }).then(this._checkResponse);
  }

  changeAvatar({avatarNew}) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: `${avatarNew}`,
      })
    }).then(this._checkResponse);
  }

  addNewCard({name, link}) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: `${name}`,
        link: `${link}`
      })
    }).then(this._checkResponse);
  }

  deleteCard(id) {
    return fetch(`${this._url}cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, cardHaveMyLike) {
    if(cardHaveMyLike) {
      return fetch(`${this._url}cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers
      }).then(this._checkResponse);
    } else {
      return fetch(`${this._url}cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers
      }).then(this._checkResponse);
    }
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }
}

const api = new Api({
  url: 'https://api.dbminin.students.nomoredomains.club/',
  headers: {
    // authorization: 'b1d31de1-5ebb-4a9e-a4d6-eae276edeb78',
    'content-type': 'application/json'
  }
})

export default api;