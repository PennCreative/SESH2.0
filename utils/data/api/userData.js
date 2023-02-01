import { clientCredentials } from '../../client';

const dbUrl = clientCredentials.databaseURL;

const getAllUsers = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/users`)
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const getUserByUid = (uid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/users/${uid}`)
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const getUserById = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/users/${id}`)
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const createUser = (userObj) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/users`, {
    method: 'POST',
    body: JSON.stringify(userObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});
const updateUser = (userObj, id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(userObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});
export {
  getAllUsers, getUserByUid, getUserById, createUser, updateUser,
};
