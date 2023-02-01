import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getUserById } from '../../../utils/data/api/userData';
import ProfileForm from '../../../components/forms/ProfileForm';

export default function EditProfile() {
  const [user, setUser] = useState({});
  const router = useRouter();
  const { userId } = router.query;

  const getUser = () => {
    getUserById(userId).then(setUser);
  };

  useEffect(() => {
    getUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <div className="formPage">
      <ProfileForm user={user} onUpdate={getUser} />
    </div>
  );
}
