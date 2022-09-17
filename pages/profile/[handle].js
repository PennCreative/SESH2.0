import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getUserByHandle, getAttending } from '../../api/usersData';
import { getPosts } from '../../api/postsData';
import { getAllSessions } from '../../api/seshData';
import ProfilePage from '../../components/ProfilePage';

export default function ViewProfile() {
  const [userDetails, setUserDetails] = useState({});
  const [attending, setAttending] = useState({});
  const [event, setEvent] = useState({});
  const [posts, setPosts] = useState({});
  const router = useRouter();
  const { handle } = router.query;

  useEffect(() => {
    getAllSessions().then(setEvent);
    getAttending(handle).then(setAttending);
    getPosts().then(setPosts);
    getUserByHandle(handle).then(setUserDetails);
  }, [handle]);

  return (
    <>
      <ProfilePage firstName={userDetails.firstName} lastName={userDetails.lastName} handle={userDetails.handle} image={userDetails.image} city={userDetails.city} state={userDetails.state} ride={userDetails.ride} postObj={posts} attendingObj={attending} eventObj={event} />
    </>
  );
}
