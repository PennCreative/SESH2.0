import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const createAttendance = (attObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/attendance.json`, attObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/attendance/${response.data.name}.json`, payload)
        .then(resolve);
    }).catch(reject);
});

const removeAttendance = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/attendance/${firebaseKey}.json`)
    .then(() => resolve('removed'))
    .catch((error) => reject(error));
});

const getAttending = (handle) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/attendance.json?orderBy="attendeeId"&equalTo="${handle}"`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const getAttendees = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/attendance.json?orderBy="eventId"&equalTo="${firebaseKey}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

export {
  createAttendance,
  removeAttendance,
  getAttending,
  getAttendees,
};
