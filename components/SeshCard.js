import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { createAttendance, viewAttendanceDetails, removeAttendance } from '../api/attendanceData';

export default function SeshCard({ obj }) {
  const { user } = useAuth();
  const [attendanceDetails, setAttendanceDetails] = useState({});
  const [attending, setAttending] = useState();
  const [mySesh, setMySesh] = useState({});
  const eventId = obj?.firebaseKey;

  const checkIfAttending = () => {
    viewAttendanceDetails(eventId).then((response) => {
      setAttendanceDetails(response);
      const match = attendanceDetails.attendees?.filter((attObj) => attObj.attendeeId === user.handle);
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
  }, [attendanceDetails, attending]);

  return (
    <>
      <Card className="seshcard">
        <Card.Img className="seshCardImg" variant="top" src={obj.image} />
        <Card.Body>
          <Card.Title>{obj.title}</Card.Title>
          <Card.Subtitle>@{obj.creator}</Card.Subtitle>
          <Card.Text>
            {obj.city}, {obj.state}
          </Card.Text>
          <Card.Body>
            <Link href={`/sesh/${obj?.firebaseKey}`} passHref>
              <Button variant="link">View</Button>
            </Link>
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
                      eventId: obj.firebaseKey,
                    };
                    createAttendance(payload).then(() => checkIfAttending());
                  }}
                  className="btn editBtn btn-info"
                >Attend
                </Button>
              )}
          </Card.Body>
        </Card.Body>
      </Card>
    </>
  );
}
SeshCard.propTypes = {
  obj: PropTypes.shape({
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
