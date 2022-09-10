import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSingleSesh } from '../../api/seshData';
import SeshCard from '../../components/SeshCard';

export default function ShowSesh() {
  const router = useRouter();
  const { firebaseKey } = router.query;
  const [sesh, setSesh] = useState();

  useEffect(() => {
    getSingleSesh(firebaseKey).then(setSesh);
  }, [firebaseKey]);

  console.warn(firebaseKey);

  return (
    <>
      <SeshCard key={sesh.firebaseKey} seshObj={sesh} />
    </>
  );
}
