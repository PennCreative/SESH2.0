import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { BsFillTrashFill } from 'react-icons/bs';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { deleteSesh } from '../api/seshData';
import { viewAttendanceDetails } from '../api/mergedData';
import { createAttendance, removeAttendance } from '../api/attendanceData';

export default function SeshDetailsCard({ seshObj }) {
  const router = useRouter();
  const { user } = useAuth();
  const [attendanceDetails, setAttendanceDetails] = useState({});
  const [attending, setAttending] = useState([]);
  const [mySesh, setMySesh] = useState({});

  const checkIfAttending = () => {
    viewAttendanceDetails(seshObj?.firebaseKey).then((response) => {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attendanceDetails]);

  const deleteThisSesh = () => {
    if (window.confirm(`Delete ${seshObj.firebaseKey}?`)) {
      deleteSesh(seshObj.firebaseKey).then(() => router.push('/sesh'));
    }
  };

  return (
    <div className="detailPage">
      <Card className="cardDetails">
        <Card.Img className="cardDetailImg" src={seshObj.image} />
        <div className="cardDetailsRightSide">
          <Card.Body className="cardDetailBody">
            <Card.Title><h1>{seshObj?.title}</h1></Card.Title>
            <Card.Subtitle className="cardDetailSubtitle">
              <Link href={`/profile/${seshObj?.creator}`} passHref>
                <p className="upperCase">@{seshObj?.creator}&nbsp;</p>
              </Link>
              <p> created an event in <b> {seshObj?.city}, {seshObj?.state}</b></p>
            </Card.Subtitle>
            <p>{seshObj?.time}</p>
            <Card.Text>
              {seshObj?.description}
              <br />
            </Card.Text>
          </Card.Body>
          <div className="cardDetailsBtn">
            {seshObj?.creator === user.handle ? (
              <>
                <Link href={`/sesh/edit/${seshObj?.firebaseKey}`} passHref>
                  <Button className="editBtn" variant="info">EDIT</Button>
                </Link>
                <Button variant="danger" onClick={deleteThisSesh}><BsFillTrashFill /></Button>
              </>
            ) : '' }
            {attending
              ? (
                <>
                  <Button
                    type="button"
                    variant="info"
                    className="btn editBtn"
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
                  className="btn editBtn btn-info"
                >Attend
                </Button>
              )}
          </div>
        </div>
      </Card>
    </div>
  );
}

SeshDetailsCard.propTypes = {
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
}.isRequired;
