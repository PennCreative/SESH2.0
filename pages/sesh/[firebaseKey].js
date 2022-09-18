import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSingleSesh } from '../../api/seshData';
import SeshDetailsCard from '../../components/SeshDetailsCard';

export default function ShowSesh() {
  const router = useRouter();
  const { firebaseKey } = router.query;
  const [sesh, setSesh] = useState();

  useEffect(() => {
    getSingleSesh(firebaseKey).then(setSesh);
  }, [firebaseKey]);

  return (
    <>
      <SeshDetailsCard seshObj={sesh} firebaseKey={firebaseKey} onUpdate={() => null} />
    </>
  );
}
