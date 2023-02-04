import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { BsFillTrashFill } from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { getSingleSession, deleteSession } from '../../utils/data/api/sessionData';
import { createAttendance, deleteAttendance, getSessionAttendance } from '../../utils/data/api/attendanceData';

export default function ShowSesh() {
  const router = useRouter();
  const { user } = useAuth();
  const [attendanceDetails, setAttendanceDetails] = useState([]);
  const [attending, setAttending] = useState([]);
  const [sesh, setSesh] = useState([]);
  const [mySesh, setMySesh] = useState([]);
  const id = parseInt(router.asPath.split('/')[2], 10);

  const checkIfAttending = () => {
    getSessionAttendance(id).then((response) => {
      setAttendanceDetails(response);

      const match = attendanceDetails?.filter((obj) => obj.attendee === user.id);
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

  useEffect(() => {
    getSingleSession(id).then(setSesh);
  }, [id]);
  console.log(sesh);
  const deleteThisSesh = () => {
    if (window.confirm(`Delete ${id}?`)) {
      deleteSession(id).then(() => router.push('/sesh'));
    }
  };

  return (
    <>
      <div className="detailPage">
        <Card className="cardDetails">
          <Card.Img className="cardDetailImg" src={sesh?.session_image_url} />
          <div className="cardDetailsRightSide">
            <Card.Body className="cardDetailBody">
              <Card.Title><h1>{sesh?.title}</h1></Card.Title>
              <Card.Subtitle className="cardDetailSubtitle">
                <Link href={`/profile/${user.id}`} passHref>
                  <p className="upperCase">@{sesh?.creator?.handle}&nbsp;</p>
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
              {sesh?.creator?.id === user.id ? (
                <>
                  <Link href={`/session/edit/${sesh?.id}`} passHref>
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
                        attendee: user.id,
                        session: sesh.id,
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
    </>
  );
}

ShowSesh.propTypes = {
  title: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  creator: PropTypes.string,
  name: PropTypes.string,
  image: PropTypes.string,
  link: PropTypes.string,
  description: PropTypes.string,
  time: PropTypes.string,
  id: PropTypes.string,
}.isRequired;
