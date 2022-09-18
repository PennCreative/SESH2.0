import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';
import { getAllSessions } from '../api/seshData';
import { viewMySeshes } from '../api/mergedData';
import SeshCard from '../components/SeshCard';

export default function ShowAllSessions() {
  const router = useRouter();
  const [allSesh, setAllSesh] = useState();
  const [mySesh, setMySesh] = useState();

  const getAllSesh = () => {
    getAllSessions().then(setAllSesh);
    viewMySeshes().then(setMySesh);
  };
  console.warn(mySesh);
  useEffect(() => {
    getAllSesh();
  }, []);

  return (
    <div className="seshCardContainer">
      <div className="createSesh">
        <Button
          variant="primary"
          type="submit"
          onClick={() => {
            router.push('/sesh/new');
          }}
        >Create Session
        </Button>
      </div>
      <div className="seshDisplayContainer">
        {allSesh?.map((sesh) => (
          <SeshCard obj={sesh} key={sesh.firebaseKey} onUpdate={getAllSesh} />
        ))}
        {/* {mySesh?.map((sesh) => (
          <SeshCard obj={sesh} key={sesh.firebaseKey} onUpdate={getAllSesh} />
        ))} */}
      </div>
    </div>
  );
}
