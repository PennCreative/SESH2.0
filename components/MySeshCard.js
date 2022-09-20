import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
// import { useRouter } from 'next/router';
import { BsFillTrashFill } from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { deleteSesh } from '../api/seshData';

export default function MySeshCard({ obj, onUpdate }) {
  const { user } = useAuth();

  const deleteThisSesh = () => {
    if (window.confirm(`Delete ${obj.title}?`)) {
      deleteSesh(obj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <>
      <Card className="seshcard">
        <Link href={`/sesh/${obj?.firebaseKey}`} passHref>
          <Card.Img className="seshCardImg" variant="top" src={obj.image} />
        </Link>
        <Card.Body className="smallCard">
          <Card.Title>{obj.title}</Card.Title>
          <Card.Body>
            {obj?.creator === user.handle
              ? (
                <>
                  <Link href={`/sesh/edit/${obj?.firebaseKey}`} passHref>
                    <Button className="smallBtn" variant="outline-primary"><AiFillEdit /></Button>
                  </Link>
                  <Button className="smallBtn" variant="outline-danger" onClick={deleteThisSesh}><BsFillTrashFill /></Button>
                </>
              )
              : ''}
          </Card.Body>
        </Card.Body>
      </Card>
    </>
  );
}
MySeshCard.propTypes = {
  obj: PropTypes.shape({
    title: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    creator: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    link: PropTypes.string,
    description: PropTypes.string,
    time: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
