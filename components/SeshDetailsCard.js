import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { BsFillTrashFill } from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { deleteSession, getSingleSession } from '../utils/data/api/sessionData';
import { createAttendance, deleteAttendance, getSessionAttendance } from '../utils/data/api/attendanceData';

export default function SeshDetailsCard() {
  const router = useRouter();
  const { user } = useAuth();
  const [attendanceDetails, setAttendanceDetails] = useState({});
  const [attending, setAttending] = useState([]);
  const [mySesh, setMySesh] = useState({});
  const seshId = parseInt(router.asPath.split('/')[2], 10);
  const [sesh, setSesh] = useState({});

  const getSesh = () => {
    getSingleSession(seshId).then(setSesh);
  };

  const checkIfAttending = () => {
    getSessionAttendance(sesh?.id).then((response) => {
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
    getSesh();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteThisSesh = () => {
    if (window.confirm(`Delete ${sesh.id}?`)) {
      deleteSession(sesh.id).then(() => router.push('/session'));
    }
  };
  console.log(sesh);
  return (
    <div className="detailPage">
      <Card className="cardDetails">
        <Card.Img className="cardDetailImg" src={sesh?.session_image_url} />
        <div className="cardDetailsRightSide">
          <Card.Body className="cardDetailBody">
            <Card.Title><h1>{sesh?.title}</h1></Card.Title>
            <Card.Subtitle className="cardDetailSubtitle">
              <Link href={`/profile/${sesh?.creator.id}`} passHref>
                <p className="upperCase">@{sesh?.creator}&nbsp;</p>
              </Link>
              <p> created an event in <b> {sesh?.city}, {sesh?.state}</b></p>
            </Card.Subtitle>
            <p>{sesh?.time}</p>
            <Card.Text>
              {sesh?.description}
              <br />
            </Card.Text>
          </Card.Body>
          <div className="cardDetailsBtn">
            {sesh?.creator === user.id ? (
              <>
                <Link href={`/sesh/edit/${sesh?.id}`} passHref>
                  <Button className="editBtn" variant="primary"><AiFillEdit /></Button>
                </Link>
                <Button variant="danger" onClick={deleteThisSesh}><BsFillTrashFill /></Button>
              </>
            ) : '' }
            {attending
              ? (
                <>
                  <Button
                    type="button"
                    variant="primary"
                    className="btn editBtn"
                    id={mySesh.id}
                    onClick={() => {
                      deleteAttendance(mySesh.id).then(() => checkIfAttending());
                    }}
                  >Nevermind
                  </Button>
                </>
              )
              : (
                <Button
                  type="button"
                  variant="primary"
                  onClick={() => {
                    const payload = {
                      attendeeId: user.id,
                      eventId: sesh.id,
                    };
                    createAttendance(payload).then(() => checkIfAttending());
                  }}
                  className="btn editBtn"
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
  session_image_url: PropTypes.string,
  link: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.string,
}.isRequired;
