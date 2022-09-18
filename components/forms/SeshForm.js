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
import { createSesh, updateSesh } from '../../api/seshData';

const initialState = {
  creator: '',
  title: '',
  description: '',
  address: '',
  city: '',
  state: '',
  time: '',
  image: 'defaultImg.png',
  contest: false,
};

export default function SeshForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  // const [checked, setChecked] = useState(obj.contest);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
    // setChecked(obj.contest);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // setChecked(e.target.checked);
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateSesh(formInput)
        .then(() => router.push(`/sesh/${obj.firebaseKey}`));
    } else {
      const payload = {
        ...formInput, creator: user.handle, time: new Date().toLocaleDateString(),
      };
      createSesh(payload).then(() => {
        router.push('/sesh');
      });
    }
  };
  return (
    <div onSubmit={handleSubmit} className="card cardForm text-center text-dark bg-light mb-3">
      <div className="card-header">
        {obj.firebaseKey ? 'Update' : 'Create' } Sesh
      </div>
      <div className="card-body">
        <Row className="mb-3">
          <Form.Group as={Col} controlId="image">
            <Form.Label>Photo of Spot</Form.Label>
            <InputGroup className="mb-2">
              <Form.Control value={formInput.image} onChange={handleChange} type="url" name="image" placeholder="" />
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col} controlId="title">
            <Form.Label>Title</Form.Label>
            <InputGroup className="mb-2">
              <Form.Control value={formInput.title} onChange={handleChange} type="text" name="title" placeholder="Classic Skate" />
            </InputGroup>
          </Form.Group>
          {/* <Form.Group className="mb-3" id="formGridCheckbox">
            <Col xs="mb-3" className="competition">
              <Form.Check
                type="checkbox"
                id="contest"
                defaultChecked={checked}
                value={checked}
                onChange={handleChange}
                label="Competition"
              />
            </Col>
          </Form.Group> */}
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
          {obj.firebaseKey ? 'Update' : 'Create'} Sesh
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
    creator: PropTypes.string,
    address: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    time: PropTypes.string,
    contest: PropTypes.bool,
    title: PropTypes.string,
    firebaseKey: PropTypes.string,
    image: PropTypes.string,
    uid: PropTypes.string,
    handle: PropTypes.string,
  }),
};

SeshForm.defaultProps = {
  obj: initialState,
};
