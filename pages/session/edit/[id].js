import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SeshForm from '../../../components/forms/SeshForm';
import { getSingleSession } from '../../../utils/data/api/sessionData';

export default function editSession() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [editSesh, setEditSesh] = useState({});
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const { id } = router.query;

  console.log(router, editSesh);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    getSingleSession(id).then(setEditSesh);
  }, [router]);

  return (
    <div className="formPage">
      <SeshForm obj={editSesh} />
    </div>
  );
}
