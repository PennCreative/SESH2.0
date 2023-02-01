/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import { FaShare } from 'react-icons/fa';
import { useAuth } from '../../utils/context/authContext';
import { getUserById } from '../../utils/data/api/userData';
// import { getAttending } from '../../api/attendanceData';
import { getAllPosts } from '../../utils/data/api/postData';
import { getMySessions } from '../../utils/data/api/sessionData';
import ProfilePagination from '../../components/ProfilePagination';

export default function ViewProfile() {
  const [userDetails, setUserDetails] = useState({});
  // const [attending, setAttending] = useState({});
  const { user } = useAuth();
  const [event, setEvent] = useState([]);
  const [posts, setPosts] = useState({});
  const router = useRouter();
  const { id } = router.query;

  const profilePageDetails = () => {
    getAllPosts().then(setPosts);
  };

  const update = () => {
    getMySessions(id).then(setEvent);
    // getAttending(Id).then(setAttending);
    getUserById(id).then(setUserDetails);
    profilePageDetails();
  };

  useEffect(() => {
    update();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      <div className="profilePage">
        <div
          className="bannerImg"
          alt="banner"
          style={{
            backgroundImage: "url('https://images.rove.me/w_1920,q_85/avc8ocqzzgeuoydqoapa/norway-longboarding.jpg')",
          }}
        />
        <div className="profileContent">
          <div className="profileLeftSide">
            <img className="profilePic" src={userDetails?.image} alt="profile pic" />
            <div className="userDetailSection">
              <h3>{userDetails?.firstName} {userDetails?.lastName}</h3>
              <h5>@{userDetails?.Id}</h5>
            </div>
            <div className="btnGroup">
              {id === user.Id
                ? (
                  <Link href={`/profile/edit/${id}`} passHref>
                    <Button variant="primary">EDIT</Button>
                  </Link>
                )
                : ''}

              <Button variant="primary"><FaShare /> </Button>
            </div>
            <div className="userDetailSection lowerUDS">
              <p>{userDetails?.ride}&#39;n outta {userDetails?.city}, {userDetails?.state}</p>
            </div>
          </div>
          <div className="profileRightSide">
            <ProfilePagination id={id} posts={posts} events={event} onUpdate={update} />
          </div>
        </div>
      </div>
    </>
  );
}
