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
// import { useAuth } from '../utils/context/authContext';
import { getUserById } from '../utils/data/api/userData';

export default function ProfilePagination() {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [mySeshes, setMySeshes] = useState([]);
  const [allPosts, setAllPosts] = useState();
  const profileId = parseInt(router.asPath.split('/')[2], 10);

  const getPosts = () => {
    getAllPosts().then(setAllPosts);
  };
  const getMySeshes = () => {
    getMySessions(profileId).then(setMySeshes);
  };
  const getUser = () => {
    getUserById(profileId).then(setUser);
  };
  useEffect(() => {
    getAllPosts();
    getMySeshes();
    getUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <Tabs
      defaultActiveKey="home"
      transition={false}
      id="noanim-tab-example"
      className="mb-3"
    >
      <Tab eventKey="home" title="Posts">
        {user.id === profileId ? <PostForm onUpdate={getPosts} /> : ''}
        <div className="thePosts">
          {allPosts?.map((post) => (
            <PostCard postObj={post} key={post.id} onUpdate={getPosts} />
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
            <MySeshCard obj={sesh} key={sesh.id} onUpdate={getMySeshes} />
          ))}
        </div>
      </Tab>
    </Tabs>
  );
}
