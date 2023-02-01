import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SeshForm from '../../../components/forms/SeshForm';
import { getSingleSession } from '../../../utils/data/api/sessionData';

export default function New() {
  const [editSesh, setEditSesh] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleSession(id).then(setEditSesh);
  }, [id]);

  return (
    <div className="formPage">
      <SeshForm obj={editSesh} />
    </div>
  );
}
