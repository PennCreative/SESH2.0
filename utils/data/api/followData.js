import { clientCredentials } from '../../client';

const dbUrl = clientCredentials.databaseURL;

const getAllFollows = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/follows`)
    .then((response) => response.json())
    .then((response) => resolve(response.json()))
    .catch(reject);
});

const getSingleFollow = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/follows/${id}`)
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const getWhoFollowsMe = (myId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/followed/${myId}`)
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const getFollowedByMe = (myId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/followers/${myId}`)
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const createFollow = (followObj) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/follows`, {
    method: 'POST',
    body: JSON.stringify(followObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const deleteFollow = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/follows/${id}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  getAllFollows, getSingleFollow, getWhoFollowsMe, getFollowedByMe, createFollow, deleteFollow,
};
