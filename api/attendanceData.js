import axios from 'axios';
import { clientCredentials } from '../utils/client';
import { getSingleSesh, getAttendees } from './seshData';

const dbUrl = clientCredentials.databaseURL;

const createAttendance = (attObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/attendance.json`, attObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/attendance/${response.data.name}.json`, payload)
        .then(resolve);
    }).catch(reject);
});

const viewAttendanceDetails = (seshFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleSesh(seshFirebaseKey), getAttendees(seshFirebaseKey)])
    .then(([seshObject, seshAttendeesArray]) => {
      resolve({ ...seshObject, attendees: seshAttendeesArray });
    }).catch((error) => reject(error));
});

const removeAttendance = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/attendance/${firebaseKey}.json`)
    .then(() => resolve('removed'))
    .catch((error) => reject(error));
});

export {
  createAttendance,
  viewAttendanceDetails,
  removeAttendance,
};
