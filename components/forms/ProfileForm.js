import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
// import Link from 'next/link';
import PropTypes from 'prop-types';
import { GoSignOut } from 'react-icons/go';
import { registerUser, signOut } from '../../utils/auth';
import { updateUser } from '../../utils/data/api/userData';
// import { useAuth } from '../../utils/context/authContext';

export default function ProfileForm({ user, onUpdate }) {
  const router = useRouter;

  const [formInput, setFormInput] = useState({
    firstName: '',
    lastName: '',
    handle: '',
    ride: '',
    bio: '',
    image: '',
    city: '',
    state: '',
    uid: '',
  });

  useEffect(() => {
    if (user.id) {
      setFormInput(user);
    }
  }, [user, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      uid: formInput.uid,
      first_name: formInput.firstName,
      last_name: formInput.lastName,
      handle: formInput.handle,
      ride: formInput.ride,
      bio: formInput.bio,
      profile_image_url: formInput.image,
      city: formInput.city,
      state: formInput.state,
    };
    if (user.id) {
      updateUser(userData, user.id);
      router.push(`../../users/${user.id}`);
    } else {
      registerUser(userData).then(() => onUpdate(user.id));
    }
  };

  return (
    <div onSubmit={handleSubmit} className="card cardForm text-center text-dark bg-light mb-3">
      <div className="card-header">
        {user.id ? 'Update' : 'Create' } Profile
      </div>
      <div className="card-body">
        <Row className="mb-3">

          <Form.Group as={Col} controlId="image">
            <Form.Label>Profile Image</Form.Label>
            <Form.Control value={formInput.image} onChange={handleChange} type="url" name="image" placeholder="Image Url" />
          </Form.Group>
          <Form.Group as={Col} controlId="handle">
            <Form.Label>Nickname</Form.Label>
            <InputGroup className="mb-2">
              <InputGroup.Text>@</InputGroup.Text>
              <Form.Control value={formInput.handle} onChange={handleChange} type="text" name="handle" placeholder="Username" />
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col} controlId="ride">
            <Form.Label>Ride</Form.Label>
            <Form.Select value={formInput.ride} onChange={handleChange} name="ride">
              <option value="Skateboard">Skateboard</option>
              <option value="Longboard">Longboard</option>
              <option value="Bmx">BMX</option>
              <option value="Scooter">Scooter</option>
              <option value="Heely">Heelys</option>
              <option value="RollerBlade">Rollerblades</option>
            </Form.Select>
          </Form.Group>

        </Row>
        <Row className="mb-3">

          <Form.Group as={Col} controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control value={formInput.firstName} onChange={handleChange} name="firstName" type="text" placeholder="John" />
          </Form.Group>

          <Form.Group as={Col} controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control value={formInput.lastName} onChange={handleChange} name="lastName" type="text" placeholder="Doe" />
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
        </Row>
        <ButtonGroup vertical>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            {user ? 'Update' : 'Create'} Profile
          </Button>
          {/* <Button variant="link">Continue as Guest</Button> */}
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
  user: PropTypes.shape({
    uid: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
