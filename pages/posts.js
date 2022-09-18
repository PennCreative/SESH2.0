import React, { useState, useEffect } from 'react';
import PostForm from '../components/forms/PostForm';
import { getPosts } from '../api/postsData';
import PostCard from '../components/PostCard';

export default function ShowAllPosts() {
  const [allPosts, setAllPosts] = useState();

  useEffect(() => {
    getPosts().then(setAllPosts);
  }, []);

  return (
    <>
      <PostForm />
      {allPosts?.map((post) => (
        <PostCard postObj={post} key={post.firebaseKey} onUpdate={getPosts()} />
      ))};
    </>
  );
}
