/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import { FaShare } from 'react-icons/fa';
import { useAuth } from '../../utils/context/authContext';
import { getUserById } from '../../utils/data/api/userData';
// import { getWhoFollowsMe, getFollowedByMe } from '../../utils/data/api/followData';
import { getMyAttendances } from '../../utils/data/api/attendanceData';
import { getPostsByCreatorId } from '../../utils/data/api/postData';
import { getMySessions } from '../../utils/data/api/sessionData';
import ProfilePagination from '../../components/ProfilePagination';

export default function ViewProfile() {
  const [userDetails, setUserDetails] = useState({});
  const [attending, setAttending] = useState([]);
  const { user } = useAuth();
  const [mySessions, setMySessions] = useState([]);
  const [posts, setPosts] = useState({});
  const router = useRouter();
  const id = parseInt(router.asPath.split('/')[2], 10);

  const profilePageDetails = () => {
    getPostsByCreatorId(id).then(setPosts);
  };

  const profileDetails = () => {
    getMySessions(id).then(setMySessions);
    getMyAttendances(id).then(setAttending);
    getUserById(id).then(setUserDetails);
    profilePageDetails();
  };

  useEffect(() => {
    profileDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  console.log(attending.length);
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
            <img className="profilePic" src={userDetails?.profile_image_url} alt="profile pic" />
            <div className="userDetailSection">
              <h3>{userDetails?.first_name} {userDetails?.last_name}</h3>
              <sup>Followers:  Following:</sup>
              <h5>@{userDetails?.handle}</h5>
            </div>
            <div className="btnGroup">
              {id === user.id
                ? (
                  <Link href={`/profile/edit/${id}`} passHref>
                    <Button variant="primary">EDIT</Button>
                  </Link>
                )
                : (
                  <Button variant="primary">Follow</Button>
                )}

              <Button variant="primary"><FaShare /> </Button>
            </div>
            <div className="userDetailSection lowerUDS">
              <p>{userDetails?.ride}&#39;n outta {userDetails?.city}, {userDetails?.state}</p>
            </div>
          </div>
          <div className="profileRightSide">
            <ProfilePagination id={id} posts={posts} events={mySessions} onUpdate={profileDetails} />
          </div>
        </div>
      </div>
    </>
  );
}
