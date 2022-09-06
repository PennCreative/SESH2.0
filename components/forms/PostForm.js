import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../utils/context/authContext';
import { createPost, updatePost } from '../../api/postsData';

const initialState = {
  post: '',
};

export default function PostForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updatePost(formInput)
        .then(() => router.push(`/posts/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, user: user.handle, time: new Date().getTime() };
      createPost(payload).then(() => {
        router.push('/posts');
      });
    }
  };
  return (
    <>
      <Card className="postCardForm">
        <Card.Body>
          <Form.Group className="mb-3" controlId="post">
            <Form.Control as="textarea" rows={3} value={formInput.image} onChange={handleChange} type="text" name="post" placeholder="What's on your mind" />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            {obj.firebaseKey ? 'Update' : 'Create'} Post
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}

PostForm.propTypes = {
  obj: PropTypes.shape({
    post: PropTypes.string,
    time: PropTypes.string,
    uid: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

PostForm.defaultProps = {
  obj: initialState,
};
