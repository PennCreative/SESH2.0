import React, { useState, useEffect } from 'react';
import SeshForm from '../components/forms/SeshForm';
import { getAllSessions } from '../api/seshData';
import SeshCard from '../components/SeshCard';

export default function ShowAllSessions() {
  const [allSesh, setAllSesh] = useState();

  useEffect(() => {
    getAllSessions().then(setAllSesh);
  }, []);

  return (
    <>
      <SeshForm />
      {allSesh?.map((sesh) => (
        <SeshCard key={sesh.title} />
      ))};
    </>
  );
}
