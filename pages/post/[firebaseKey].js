/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getPosts } from '../../api/postsData';
import PostCard from '../../components/PostCard';
// import { useAuth } from '../../utils/context/authContext';

export default function IndPinPage(onUpdate) {
  const router = useRouter();
  const [posts, setposts] = useState([]);
  const { firebaseKey } = router.query;
  // const { user } = useAuth();

  const getAllPostDetails = () => {
    getPosts().then((postsArray) => {
      setposts(postsArray.filter((post) => post.user === post?.user.handle));
    });
  };

  useEffect(() => {
    getAllPostDetails(firebaseKey);
  }, [firebaseKey]);

  return (
    <>
      {posts?.map((post) => (
        <PostCard postObj={getAllPostDetails} key={post.firebaseKey} onUpdate={onUpdate} />
      ))}
    </>
  );
}
