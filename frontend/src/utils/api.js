class Api {
  constructor(data) {
    this._url = data.url;
  }

  getInfoAboutProfile() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'content-type': 'application/json'
      }
    }).then(this._checkResponse);
  }

  getInfoAboutCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'content-type': 'application/json'
      }
    }).then(this._checkResponse);
  }

  changeProfile({newName, newInfo}) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        name: `${newName}`,
        about: `${newInfo}`
      })
    }).then(this._checkResponse);
  }

  changeAvatar({avatarNew}) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        avatar: `${avatarNew}`,
      })
    }).then(this._checkResponse);
  }

  addNewCard({name, link}) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        name: `${name}`,
        link: `${link}`
      })
    }).then(this._checkResponse);
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'content-type': 'application/json'
      }
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, cardHaveMyLike) {
    if(cardHaveMyLike) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: {
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
          'content-type': 'application/json'
        }
      }).then(this._checkResponse);
    } else {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
          'content-type': 'application/json'
        }
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
  url: 'http://localhost:3000'
})

export default api;