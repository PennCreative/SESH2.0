import { clientCredentials } from '../../client';

const dbUrl = clientCredentials.databaseURL;

const getAllAttendances = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/attendances`)
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const getSingleAttendance = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/attendances/${id}`)
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const getSessionAttendance = (seshId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/atsesh/${seshId}`)
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const getMyAttendances = (attendeeId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/attending/${attendeeId}`)
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const createAttendance = (attendObj) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/attendances`, {
    method: 'POST',
    body: JSON.stringify(attendObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const deleteAttendance = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/attendances/${id}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  getAllAttendances, getSingleAttendance, getSessionAttendance, getMyAttendances, createAttendance, deleteAttendance,
};
