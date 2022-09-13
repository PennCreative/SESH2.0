import axios from 'axios';
import { clientCredentials } from '../utils/client';
// import { createNotification } from './notificationsData';
// import { getSingleSesh } from './seshData';
// import { getUserByHandle } from './usersData';

const dbUrl = clientCredentials.databaseURL;

const createAttendance = (attObj, user, seshObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/attendance.json`, attObj)
    .then((response) => {
      const payload = { attendeeId: user.handle, eventId: seshObj.firebaseKey };
      axios.patch(`${dbUrl}/attendance/${response.data.name}.json`, payload)
        .then(resolve);
    }).catch(reject);
});

export default {
  createAttendance,
};
