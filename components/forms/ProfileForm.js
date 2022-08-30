import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
// import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { GoSignOut } from 'react-icons/go';
import { useAuth } from '../../utils/context/authContext';
import { createUser, updateUser } from '../../api/usersData';
import { signOut } from '../../utils/auth';

const initialState = {
  firstName: '',
  lastName: '',
  type: 'person',
  handle: '',
  image: '',
  ride: '',
  city: '',
  state: '',
};

function ProfileForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user, checkAndSetHandle } = useAuth();
  useEffect(() => {
    if (obj.handle) setFormInput(obj);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.handle) {
      updateUser(obj.handle, formInput)
        .then(() => router.push(`/profile/${obj.handle}`));
    } else {
      const payloadValue = { ...formInput, uid: user.uid };
      const packagedPayload = {};
      const payloadKey = formInput.handle;
      packagedPayload[payloadKey] = payloadValue;
      createUser(packagedPayload).then(() => {
        checkAndSetHandle(user);
        router.push('/');
      });
    }
  };
  // const deleteMyAccount = () => {
  //   if (window.confirm(`Delete ${obj.handle}'s Entire Account?`)) {
  //     deleteUserShallow(obj.handle).then(() => {
  //       router.push('/');
  //       checkAndSetHandle(user);
  //     });
  //   }
  // };
  console.warn();
  return (
    <div onSubmit={handleSubmit} className="card cardForm text-center text-dark bg-light mb-3">
      <div className="card-header">
        {user.handle ? 'Update' : 'Create' } Profile
      </div>
      <div className="card-body">
        <Row className="mb-3">

          <Form.Group as={Col} controlId="image">
            <Form.Label>Profile Image</Form.Label>
            <Form.Control onChange={handleChange} type="url" name="image" placeholder="Image Url" />
          </Form.Group>
          <Form.Group as={Col} controlId="handle">
            <Form.Label>Nickname</Form.Label>
            <InputGroup className="mb-2">
              <InputGroup.Text>@</InputGroup.Text>
              <Form.Control value={user.handle} onChange={handleChange} type="text" name="handle" placeholder="Username" />
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col} controlId="ride">
            <Form.Label>Ride</Form.Label>
            <Form.Select value={user.ride} onChange={handleChange} name="ride" defaultValue="Choose...">
              <option value="Skateboard">Skateboard</option>
              <option value="Longboard">Longboard</option>
              <option value="Bmx">BMX</option>
              <option value="Scooter">Scooter</option>
              <option value="Heelys">Heelys</option>
            </Form.Select>
          </Form.Group>

        </Row>
        <Row className="mb-3">

          <Form.Group as={Col} controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control value={user.firstName} onChange={handleChange} name="firstName" type="text" placeholder="John" />
          </Form.Group>

          <Form.Group as={Col} controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control onChange={handleChange} name="lastName" type="text" placeholder="Doe" />
          </Form.Group>

        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control onChange={handleChange} name="city" type="text" placeholder="City" />
          </Form.Group>

          <Form.Group as={Col} controlId="state">
            <Form.Label>State</Form.Label>
            <Form.Control value={user.state} onChange={handleChange} name="state" type="text" placeholder="State" />
          </Form.Group>
        </Row>
        <ButtonGroup vertical>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            {obj.handle ? 'Update' : 'Create'} Profile
          </Button>
          <Button variant="link">Continue as Guest</Button>
          <Button variant="danger" type="submit" onClick={signOut}>
            <GoSignOut />
          </Button>
        </ButtonGroup>
      </div>
      <div className="card-footer text-muted">
        Sesh &#8482;
      </div>
    </div>
  );
}

ProfileForm.propTypes = {
  obj: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    handle: PropTypes.string,
    image: PropTypes.string,
    ride: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    uid: PropTypes.string,
  }),
};

ProfileForm.defaultProps = {
  obj: initialState,
};

export default ProfileForm;
