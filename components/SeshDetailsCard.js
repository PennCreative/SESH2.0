import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { BsFillTrashFill } from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { deleteSession } from '../utils/data/api/sessionData';
import { createAttendance, deleteAttendance, getSessionAttendance } from '../utils/data/api/attendanceData';

export default function SeshDetailsCard({ seshObj }) {
  const router = useRouter();
  const { user } = useAuth();
  const [attendanceDetails, setAttendanceDetails] = useState({});
  const [attending, setAttending] = useState([]);
  const [mySesh, setMySesh] = useState({});
  console.log(seshObj);
  const checkIfAttending = () => {
    getSessionAttendance(seshObj?.id).then((response) => {
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
  }, []);

  const deleteThisSesh = () => {
    if (window.confirm(`Delete ${seshObj.id}?`)) {
      deleteSession(seshObj.id).then(() => router.push('/session'));
    }
  };

  return (
    <div className="detailPage">
      <Card className="cardDetails">
        <Card.Img className="cardDetailImg" src={seshObj?.session_image_url} />
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
                <Link href={`/sesh/edit/${seshObj?.id}`} passHref>
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
                      attendeeId: user.handle,
                      eventId: seshObj.id,
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
