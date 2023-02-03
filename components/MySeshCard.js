import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
// import { useRouter } from 'next/router';
import { BsFillTrashFill } from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { deleteSession } from '../utils/data/api/sessionData';

export default function MySeshCard({ obj, onUpdate }) {
  const { user } = useAuth();

  const deleteThisSesh = () => {
    if (window.confirm(`Delete ${obj.title}?`)) {
      deleteSession(obj.id).then(() => onUpdate());
    }
  };

  return (
    <>
      <Card className="seshcard">
        <Link href={`/sesh/${obj?.firebaseKey}`} passHref>
          <Card.Img className="seshCardImg" variant="top" src={obj?.session_image_url} />
        </Link>
        <Card.Body className="smallCard">
          <Card.Title>{obj.title}</Card.Title>
          <Card.Body>
            {obj?.creator.id === user.id
              ? (
                <>
                  <Link href={`/session/edit/${obj?.id}`} passHref>
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
    id: PropTypes.number,
    title: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    creator: PropTypes.shape({
      id: PropTypes.number,
    }),
    name: PropTypes.string,
    session_image_url: PropTypes.string,
    link: PropTypes.string,
    description: PropTypes.string,
    time: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
