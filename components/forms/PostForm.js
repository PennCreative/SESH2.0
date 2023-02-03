import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../utils/context/authContext';
import { createPost, updatePost } from '../../utils/data/api/postData';

const initialState = {
  content: '',
};

export default function PostForm({ obj, onUpdate }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.id) setFormInput(obj);
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
    if (obj.id) {
      updatePost(formInput)
        .then(() => router.push(`/profile/${obj.creator}`));
    } else {
      const payload = { ...formInput, creator: user.id };
      createPost(payload).then(() => {
        onUpdate();
        setFormInput(initialState);
      });
    }
  };
  return (
    <>
      <Card className="postCardForm">
        <Card.Body>
          <Form.Group className="mb-3" controlId="content">
            <Form.Control as="textarea" rows={3} value={formInput.content} onChange={handleChange} type="text" name="content" placeholder="What's on your mind" />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            {obj.id ? 'Update' : 'Create'} Post
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}

PostForm.propTypes = {
  obj: PropTypes.shape({
    content: PropTypes.string,
    creator: PropTypes.shape({
      id: PropTypes.number,
      email: PropTypes.number,
      active: PropTypes.number,
      is_staff: PropTypes.bool,
      uid: PropTypes.string,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      handle: PropTypes.string,
      ride: PropTypes.string,
      bio: PropTypes.string,
      profile_image_url: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
    }),
    uid: PropTypes.string,
    id: PropTypes.number,
  }),
  onUpdate: PropTypes.func.isRequired,
};

PostForm.defaultProps = {
  obj: initialState,
};
