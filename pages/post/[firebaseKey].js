/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSinglePost } from '../../api/postsData';
import PostCard from '../../components/PostCard';
// import { useAuth } from '../../utils/context/authContext';

export default function ViewPost() {
  const router = useRouter();
  const [post, setpost] = useState([]);
  const { firebaseKey } = router.query;
  // const { user } = useAuth();

  const getPostDetails = () => {
    getSinglePost(firebaseKey).then(setpost);
  };

  useEffect(() => {
    getPostDetails(firebaseKey);
  }, [firebaseKey]);
  return (
    <>
      <PostCard postObj={post} firebaseKey={firebaseKey} />
    </>
  );
}
