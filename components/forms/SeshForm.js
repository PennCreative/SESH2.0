import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
// import { createAttendance } from '../../api/attendanceData';
import { useAuth } from '../../utils/context/authContext';
import { createSession, updateSession } from '../../utils/data/api/sessionData';

const initialState = {
  creator: 0,
  title: '',
  description: '',
  address: '',
  city: '',
  state: '',
  session_image_url: '',
  contest: false,
};

export default function SeshForm({ obj }) {
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
      updateSession(formInput, obj.id)
        .then(() => router.push(`/session/${obj.id}`));
    } else {
      const payload = {
        ...formInput, creator_id: user.id,
      };
      createSession(payload).then(() => {
        router.push('/session');
      });
    }
  };

  return (
    <div onSubmit={handleSubmit} className="card cardForm text-center text-dark bg-light mb-3">
      <div className="card-header">
        {obj.id ? 'Update' : 'Create' } Sesh
      </div>
      <div className="card-body">
        <Row className="mb-3">
          <Form.Group as={Col} controlId="session_image_url">
            <Form.Label>Photo of Spot</Form.Label>
            <InputGroup className="mb-2">
              <Form.Control value={formInput.session_image_url} onChange={handleChange} type="url" name="session_image_url" placeholder="" />
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col} controlId="title">
            <Form.Label>Title</Form.Label>
            <InputGroup className="mb-2">
              <Form.Control value={formInput.title} onChange={handleChange} type="text" name="title" placeholder="Classic Skate" />
            </InputGroup>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control value={formInput.address} onChange={handleChange} name="address" type="text" placeholder="123 Circle St." />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control value={formInput.city} onChange={handleChange} name="city" type="text" placeholder="City" />
          </Form.Group>

          <Form.Group as={Col} controlId="state">
            <Form.Label>State</Form.Label>
            <Form.Control value={formInput.state} onChange={handleChange} name="state" type="text" placeholder="State" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} value={formInput.description} onChange={handleChange} type="text" name="description" placeholder="Tell us about the spot" />
          </Form.Group>
        </Row>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          {obj.id ? 'Update' : 'Create'} Sesh
        </Button>

      </div>
      <div className="card-footer text-muted">
        Sesh &#8482;
      </div>
    </div>
  );
}

SeshForm.propTypes = {
  obj: PropTypes.shape({
    creator: PropTypes.shape({
      id: PropTypes.number,
      handle: PropTypes.string,
    }),
    address: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    description: PropTypes.string,
    contest: PropTypes.bool,
    title: PropTypes.string,
    id: PropTypes.number,
    session_image_url: PropTypes.string,
    uid: PropTypes.string,
    handle: PropTypes.string,
  }),
};

SeshForm.defaultProps = {
  obj: initialState,
};
