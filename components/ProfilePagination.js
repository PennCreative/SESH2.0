/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';
import PostForm from './forms/PostForm';
import MySeshCard from './MySeshCard';
import PostCard from './PostCard';
import { getMySessions } from '../utils/data/api/sessionData';
import { getAllPosts } from '../utils/data/api/postData';
import { useAuth } from '../utils/context/authContext';

export default function ProfilePagination({ handle }) {
  const router = useRouter();
  const user = useAuth();
  const [mySeshes, setMySeshes] = useState([]);
  const [allPosts, setAllPosts] = useState();

  const getPosts = () => {
    getAllPosts().then(setAllPosts);
  };
  const getMySeshes = () => {
    getMySessions(handle).then(setMySeshes);
  };

  useEffect(() => {
    getAllPosts();
    getMySeshes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handle]);

  return (
    <Tabs
      defaultActiveKey="home"
      transition={false}
      id="noanim-tab-example"
      className="mb-3"
    >
      <Tab eventKey="home" title="Posts">
        {user.user.handle === handle ? <PostForm onUpdate={getPosts} /> : ''}
        <div className="thePosts">
          {allPosts?.map((post) => (
            <PostCard postObj={post} key={post.firebaseKey} onUpdate={getPosts} />
          ))}
        </div>
      </Tab>
      <Tab eventKey="profile" title="My Sessions">
        <Button
          variant="primary"
          type="submit"
          onClick={() => {
            router.push('/sesh/new');
          }}
        >Create a Sesh
        </Button>
        <div className="mySeshes">
          {mySeshes?.map((sesh) => (
            <MySeshCard obj={sesh} key={sesh.firebaseKey} onUpdate={getMySeshes} />
          ))}
        </div>
      </Tab>
    </Tabs>
  );
}
