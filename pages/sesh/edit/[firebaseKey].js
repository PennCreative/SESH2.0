import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SeshForm from '../../../components/forms/SeshForm';
import { getSingleSesh } from '../../../api/seshData';

export default function New() {
  const [editSesh, setEditSesh] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleSesh(firebaseKey).then(setEditSesh);
  }, [firebaseKey]);

  return (
    <div className="formPage">
      <SeshForm obj={editSesh} />
    </div>
  );
}
