export const baseUrl = 'https://api.dbminin.students.nomoredomains.club';

export const handleRegistration = (userPassword, userEmail) => {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      'password': `${userPassword}`,
      'email': `${userEmail}`
    })
  }).then(checkResponse);
};

export const handleAuthenticate = (userPassword, userEmail) => {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      'password': `${userPassword}`,
      'email': `${userEmail}`
    })
  }).then(checkResponse);
};

export const checkUserJWT = (JWT) => {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${JWT}`,
    }
  }).then(checkResponse);
}

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Что-то пошло не так: ${res.status}`);
}