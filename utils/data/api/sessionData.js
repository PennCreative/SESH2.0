import { clientCredentials } from '../../client';

const dbUrl = clientCredentials.databaseURL;

const getAllSessions = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/sessions`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleSession = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/sessions/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getMySessions = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/mysessions/${id}`)
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const createSession = (seshObj) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/sessions`, {
    method: 'POST',
    body: JSON.stringify(seshObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const updateSession = (seshObj, id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/sessions/${id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(seshObj),
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const deleteSession = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/sessions/${id}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  getAllSessions, getSingleSession, getMySessions, createSession, updateSession, deleteSession,
};
