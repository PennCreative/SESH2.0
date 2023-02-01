/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getPostById } from '../../utils/data/api/postData';
import PostCard from '../../components/PostCard';
// import { useAuth } from '../../utils/context/authContext';

export default function ViewPost() {
  const router = useRouter();
  const [post, setpost] = useState([]);
  const { id } = router.query;
  // const { user } = useAuth();

  const getPostDetails = () => {
    getPostById(id).then(setpost);
  };

  useEffect(() => {
    getPostDetails(id);
  }, [id]);
  return (
    <>
      <PostCard postObj={post} onUpdate={() => null} />
    </>
  );
}
