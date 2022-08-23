import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getAllUsers = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/users.json`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

const getUserByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/users.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => resolve(Object.values(response.data)[0]))
    .catch((error) => reject(error));
});

const getUserByHandle = (handle) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/users/${handle}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const createUser = (userObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/users.json`, userObj)
    .then((response) => resolve(response)).catch(reject);
});

const updateUser = (handle, userObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/users/${handle}.json`, userObj)
    .then((response) => resolve(response)).catch(reject);
});

const deleteUserShallow = (handle) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/users/${handle}.json`)
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  getUserByUid,
  getUserByHandle,
  createUser,
  updateUser,
  getAllUsers,
  deleteUserShallow,
};
