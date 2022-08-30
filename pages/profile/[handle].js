import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getUserByHandle } from '../../api/usersData';
import ProfilePage from '../../components/ProfilePage';

export default function ViewProfile() {
  const [userDetails, setUserDetails] = useState({});
  const router = useRouter();
  const { handle } = router.query;

  useEffect(() => {
    getUserByHandle(handle).then(setUserDetails);
  }, [handle]);
  console.warn(userDetails);
  // firstName, lastName, handle, image, city, state, ride,
  return (
    <>
      <ProfilePage firstName={userDetails.firstName} lastName={userDetails.lastName} handle={userDetails.handle} image={userDetails.image} city={userDetails.city} state={userDetails.state} ride={userDetails.ride} />
    </>
  );
}
