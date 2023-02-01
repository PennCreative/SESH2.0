import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PostForm from '../../../components/forms/PostForm';
import { getPostById } from '../../../utils/data/api/postData';

export default function EditPost() {
  const [editPost, setEditPost] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getPostById(id).then(setEditPost);
  }, [id]);

  return (<PostForm obj={editPost} />);
}
