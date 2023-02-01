import { clientCredentials } from '../../client';

const dbUrl = clientCredentials.databaseURL;

const getAllComments = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/comments`)
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const getSingleComment = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/comments/${id}`)
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const getPostComments = (postId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/postcomments/${postId}`)
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const createComment = (commentObj) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/comments`, {
    method: 'POST',
    body: JSON.stringify(commentObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const updateComment = (commentObj, id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/comments/${id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const deleteComment = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/comments/${id}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  getAllComments, getSingleComment, getPostComments, createComment, updateComment, deleteComment,
};
