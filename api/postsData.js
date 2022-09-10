// posts API calls
import axios from 'axios';
import { clientCredentials } from '../utils/client';
// import { getUserByHandle } from './usersData';

const dbUrl = clientCredentials.databaseURL;

const getPosts = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/post.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const deletePost = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/post/${firebaseKey}.json`)
    .then(() => resolve('deleted'))
    .catch((error) => reject(error));
});

const getSinglePost = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/post/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const createPost = (postObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/post.json`, postObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/post/${response.data.name}.json`, payload)
        .then(resolve);
    }).catch(reject);
});

const updatePost = (postObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/post/${postObj.firebaseKey}.json`, postObj)
    .then(resolve)
    .catch(reject);
});

export {
  getPosts,
  createPost,
  deletePost,
  getSinglePost,
  updatePost,
};
