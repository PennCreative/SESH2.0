import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { deleteSesh } from '../api/seshData';
import { createAttendance, viewAttendanceDetails, removeAttendance } from '../api/attendanceData';

export default function SeshCard({ seshObj }) {
  const router = useRouter();
  const { user } = useAuth();
  const [attendanceDetails, setAttendanceDetails] = useState({});
  // const [attendees, setAttendees] = useState(null);
  const [attending, setAttending] = useState();
  const [mySesh, setMySesh] = useState({});
  const eventId = seshObj?.firebaseKey;

  const checkIfAttending = () => {
    viewAttendanceDetails(eventId).then((response) => {
      setAttendanceDetails(response);
      const match = attendanceDetails.attendees?.filter((obj) => obj.attendeeId === user.handle);
      if (match?.length > 0) {
        setAttending(true);
        setMySesh(...match);
      } else {
        setAttending(false);
      }
    });
  };

  useEffect(() => {
    checkIfAttending();
  }, [attendanceDetails]);

  const deleteThisSesh = () => {
    if (window.confirm(`Delete ${seshObj.firebaseKey}?`)) {
      deleteSesh(seshObj.firebaseKey).then(() => router.push('/sesh'));
    }
  };

  return (
    <Card>
      <Card.Header>{seshObj?.city}, {seshObj?.state}</Card.Header>
      <Card.Body>
        <Card.Title>{seshObj?.creator}</Card.Title>
        <Card.Text>
          {seshObj?.description}
        </Card.Text>
        <Link href={`/sesh/${seshObj?.firebaseKey}`} passHref>
          <Button variant="info">View</Button>
        </Link>
        <Link href={`/sesh/edit/${seshObj?.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="link" onClick={deleteThisSesh}>Delete Sesh</Button>
        {attending
          ? (
            <>
              <Button
                type="button"
                className="btn editBtn btn-dark"
                id={mySesh.firebaseKey}
                onClick={() => {
                  removeAttendance(mySesh.firebaseKey).then(() => checkIfAttending());
                }}
              >Nevermind
              </Button>
            </>
          )
          : (
            <Button
              type="button"
              onClick={() => {
                const payload = {
                  attendeeId: user.handle,
                  eventId: seshObj.firebaseKey,
                };
                createAttendance(payload).then(() => checkIfAttending());
              }}
              className="btn editBtn btn-danger"
            >Attend
            </Button>
          )}
      </Card.Body>
    </Card>
  );
}

SeshCard.propTypes = {
  seshObj: PropTypes.shape({
    title: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    creator: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    link: PropTypes.string,
    description: PropTypes.string,
    time: PropTypes.number,
    firebaseKey: PropTypes.string,
  }).isRequired,
};
