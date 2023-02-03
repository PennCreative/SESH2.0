import { clientCredentials } from '../../client';

const dbUrl = clientCredentials.databaseURL;

const getAllPosts = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/posts`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getPostById = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/posts/${id}`)
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const getPostsByCreatorId = (creatorId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/myposts/${creatorId}`)
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const createPost = (postObj) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/posts`, {
    method: 'POST',
    body: JSON.stringify(postObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const updatePost = (postObj, id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/posts/${id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(postObj),
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const deletePost = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  getAllPosts, getPostById, getPostsByCreatorId, createPost, updatePost, deletePost,
};
