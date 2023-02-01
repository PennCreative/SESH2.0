import React, { useState, useEffect } from 'react';
import PostForm from '../components/forms/PostForm';
import { getAllPosts } from '../utils/data/api/postData';
import PostCard from '../components/PostCard';

export default function ShowAllPosts() {
  const [allPosts, setAllPosts] = useState();

  useEffect(() => {
    getAllPosts().then(setAllPosts);
  }, []);

  return (
    <>
      <PostForm />
      {allPosts?.map((post) => (
        <PostCard postObj={post} key={post.firebaseKey} onUpdate={getAllPosts()} />
      ))};
    </>
  );
}
