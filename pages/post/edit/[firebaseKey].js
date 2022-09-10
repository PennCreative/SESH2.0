import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PostForm from '../../../components/forms/PostForm';
import { getSinglePost } from '../../../api/postsData';

export default function EditPost() {
  const [editPost, setEditPost] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSinglePost(firebaseKey).then(setEditPost);
  }, [firebaseKey]);

  return (<PostForm obj={editPost} />);
}
