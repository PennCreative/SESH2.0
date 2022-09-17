import React, { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';
import PostForm from './forms/PostForm';
import SeshCard from './SeshCard';
import PostCard from './PostCard';
import { getAllSessions } from '../api/seshData';
import { getPosts } from '../api/postsData';

export default function ProfilePagination() {
  const router = useRouter();
  const [allSesh, setAllSesh] = useState();
  const [allPosts, setAllPosts] = useState();

  // seshChild.map(getSingleSesh(eventId).then();)
  useEffect(() => {
    getPosts().then(setAllPosts);
    getAllSessions().then(setAllSesh);
  }, []);
  console.warn(allPosts);
  return (
    <Tabs
      defaultActiveKey="home"
      transition={false}
      id="noanim-tab-example"
      className="mb-3"
    >
      <Tab eventKey="home" title="Posts">
        <PostForm />
        {allPosts?.map((post) => (
          <PostCard postObj={post} key={post.firebaseKey} />
        ))}
      </Tab>
      <Tab eventKey="profile" title="Sessions">
        <Button
          variant="primary"
          type="submit"
          onClick={() => {
            router.push('/sesh/new');
          }}
        >Create Session
        </Button>
        <div className="mySeshes">
          <p>Attending:</p>
          {allSesh?.map((sesh) => (
            <SeshCard obj={sesh} key={sesh.firebaseKey} />
          ))}

        </div>
      </Tab>
    </Tabs>
  );
}
