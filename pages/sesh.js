import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';
import { getAllSessions } from '../api/seshData';
import SeshCard from '../components/SeshCard';

export default function ShowAllSessions() {
  const router = useRouter();
  const [allSesh, setAllSesh] = useState();

  useEffect(() => {
    getAllSessions().then(setAllSesh);
  }, []);

  return (
    <>
      <Button
        variant="primary"
        type="submit"
        onClick={() => {
          router.push('/sesh/new');
        }}
      >Create Session
      </Button>
      {allSesh?.map((sesh) => (
        <SeshCard seshObj={sesh} key={sesh.firebaseKey} />
      ))};
    </>
  );
}
