import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getUserByHandle } from '../../api/usersData';

export default function ViewProfile() {
  const [userDetails, setUserDetails] = useState({});
  const router = useRouter();
  const { handle } = router.query;

  useEffect(() => {
    getUserByHandle(handle).then(setUserDetails);
  }, [handle]);

  return (
    <>
      <>{userDetails}</>
    </>
  );
}
