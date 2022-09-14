import axios from 'axios';
import { clientCredentials } from '../utils/client';
// import { getUserByHandle } from './usersData';

const dbUrl = clientCredentials.databaseURL;

const getAllSessions = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/sesh.json`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});
const getSingleSesh = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/sesh/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const createSesh = (seshObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/sesh.json`, seshObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/sesh/${response.data.name}.json`, payload)
        .then(resolve);
    }).catch(reject);
});

const updateSesh = (seshObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/sesh/${seshObj.firebaseKey}.json`, seshObj)
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const deleteSesh = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/sesh/${firebaseKey}.json`)
    .then(resolve).catch(reject);
});

const getAttendees = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/attendance.json?orderBy="eventId"&equalTo="${firebaseKey}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

export {
  getAllSessions,
  getSingleSesh,
  deleteSesh,
  createSesh,
  updateSesh,
  getAttendees,
};
