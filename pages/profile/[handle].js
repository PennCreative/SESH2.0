/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import { getUserByHandle } from '../../api/usersData';
import { getAttending } from '../../api/attendanceData';
import { getPosts } from '../../api/postsData';
import { getAllSessions } from '../../api/seshData';
import ProfilePagination from '../../components/ProfilePagination';

export default function ViewProfile() {
  const [userDetails, setUserDetails] = useState({});
  const [attending, setAttending] = useState({});
  const [event, setEvent] = useState([]);
  const [posts, setPosts] = useState({});
  const router = useRouter();
  const { handle } = router.query;

  const profilePageDetails = () => {
    getPosts().then(setPosts);
  };

  const update = () => {
    getAllSessions().then(setEvent);
    getAttending(handle).then(setAttending);
    getUserByHandle(handle).then(setUserDetails);
    profilePageDetails();
  };

  useEffect(() => {
    update();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <img className="profilePic" src={userDetails.image} alt="profile pic" />
            <div className="userDetailSection">
              <h3>{userDetails.firstName} {userDetails.lastName}</h3>
              <h5>@{userDetails.handle}</h5>
            </div>
            <div className="btnGroup">
              <Link href={`/profile/edit/${handle}`} passHref>
                <Button variant="info">EDIT</Button>
              </Link>
              <Button variant="info">Share</Button>
            </div>
            <div className="userDetailSection lowerUDS">
              <p>{userDetails.ride}&#39;r outta {userDetails.city}, {userDetails.state}</p>
            </div>
          </div>
          <div className="profileRightSide">
            <ProfilePagination handle={handle} posts={posts} attending={attending} event={event} onUpdate={update} />
          </div>
        </div>
      </div>
    </>
  );
}
