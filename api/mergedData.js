import { getSingleSesh } from './seshData';
import { getAttendees, getAttending } from './attendanceData';
// import { getUserByHandle } from './usersData';

const viewAttendanceDetails = (seshFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleSesh(seshFirebaseKey), getAttendees(seshFirebaseKey)])
    .then(([seshObject, seshAttendeesArray]) => {
      resolve({ ...seshObject, attendees: seshAttendeesArray });
    }).catch((error) => reject(error));
});

// const viewMySeshes = (myHandle) => new Promise((resolve, reject) => {
//   Promise.all([getSingleSesh(myHandle), getAttending(myHandle)])
//     .then(([seshObject, seshAttendingArray]) => {
//       resolve({ ...seshObject, attending: seshAttendingArray });
//     }).catch((error) => reject(error));
// });

const viewMySeshes = (handle) => new Promise((resolve, reject) => {
  getAttending(handle)
    .then((attObj) => {
      getAttendees(attObj.eventId)
        .then((eventObj) => {
          resolve({ attObj, eventObj });
        });
    }).catch(reject);
});

export { viewMySeshes, viewAttendanceDetails };
