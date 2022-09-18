import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
// import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { deleteSesh } from '../api/seshData';
import { viewAttendanceDetails } from '../api/mergedData';
import { createAttendance, removeAttendance } from '../api/attendanceData';

export default function SeshCard({ obj, onUpdate }) {
  const { user } = useAuth();
  // const router = useRouter();
  const [attendanceDetails, setAttendanceDetails] = useState({});
  const [attending, setAttending] = useState();
  const [mySesh, setMySesh] = useState({});

  const deleteThisSesh = () => {
    if (window.confirm(`Delete ${obj.title}?`)) {
      deleteSesh(obj.firebaseKey).then(() => onUpdate());
    }
  };

  const checkIfAttending = () => {
    const eventId = obj?.firebaseKey;
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attendanceDetails, attending]);

  return (
    <>
      <Card className="seshcard">
        <Card.Img className="seshCardImg" variant="top" src={obj.image} />
        <Card.Body>
          <Card.Title>{obj.title}</Card.Title>
          <Card.Subtitle>@{obj.creator}</Card.Subtitle>
          <Card.Subtitle>{obj.time}</Card.Subtitle>
          <Card.Text>
            {obj.city}, {obj.state}
          </Card.Text>
          <Card.Body>
            <Link href={`/sesh/${obj?.firebaseKey}`} passHref>
              <Button variant="info">View</Button>
            </Link>
            {obj?.creator === user.handle
              ? (
                <>
                  <Link href={`/sesh/edit/${obj?.firebaseKey}`} passHref>
                    <Button variant="info">EDIT</Button>
                  </Link>
                  <Button variant="link" onClick={deleteThisSesh}>Delete Sesh</Button>
                </>
              )
              : ''}
            {attending
              ? (
                <>
                  <Button
                    type="button"
                    className="btn editBtn btn-dark"
                    id={mySesh.firebaseKey}
                    onClick={() => {
                      removeAttendance(mySesh.firebaseKey).then(() => { checkIfAttending(); onUpdate(); });
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
    time: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
