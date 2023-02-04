/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import { FaShare } from 'react-icons/fa';
import { useAuth } from '../../utils/context/authContext';
import { getUserById } from '../../utils/data/api/userData';
import {
  getWhoFollowsMe, getFollowedByMe, deleteFollow, createFollow,
} from '../../utils/data/api/followData';
import { getAllPosts } from '../../utils/data/api/postData';
import { getMySessions } from '../../utils/data/api/sessionData';
import ProfilePagination from '../../components/ProfilePagination';

export default function ViewProfile() {
  const [userDetails, setUserDetails] = useState({});
  const [following, setFollowing] = useState([]);
  const [follows, setFollows] = useState([]);
  const [myFollow, setMyFollow] = useState({});
  const [isFollowing, setIsFollowing] = useState([]);
  const { user } = useAuth();
  const [mySessions, setMySessions] = useState([]);
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  const id = parseInt(router.asPath.split('/')[2], 10);

  const profilePageDetails = () => {
    getAllPosts().then(setPosts);
  };

  const profileDetails = () => {
    getMySessions(id).then(setMySessions);
    getUserById(id).then(setUserDetails);
    getWhoFollowsMe(id).then(setFollows);
    getFollowedByMe(id).then(setFollowing);
    profilePageDetails();
  };

  const checkIfFollowing = () => {
    const check = follows?.filter((obj) => obj.follower.id === user.id);
    if (check?.length > 0) {
      setIsFollowing(true);
      setMyFollow(...check);
    } else {
      setIsFollowing(false);
    }
  };

  useEffect(() => {
    profileDetails();
    checkIfFollowing();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <>
      <div className="profilePage">
        <div
          className="bannerImg"
          alt="banner"
          style={{
            backgroundImage: "url('https://images.rove.me/w_1920,q_85/avc8ocqzzgeuoydqoapa/norway-longboarding.jpg')",
          }}
        />
        <div className="profileContent">
          <div className="profileLeftSide">
            <img className="profilePic" src={userDetails?.profile_image_url} alt="profile pic" />
            <div className="userDetailSection">
              <h3>{userDetails?.first_name} {userDetails?.last_name}</h3>
              <sup>Followers: {follows.length}  Following: {following.length}</sup>
              <h5>@{userDetails?.handle}</h5>
            </div>
            <div className="btnGroup">
              {id === user.id
                ? (
                  <Link href={`/profile/edit/${id}`} passHref>
                    <Button variant="primary">EDIT</Button>
                  </Link>
                )
                : '' }
              {isFollowing
                ? (
                  <>
                    <Button
                      type="button"
                      variant="primary"
                      className="btn editBtn"
                      id={id}
                      onClick={() => {
                        deleteFollow(myFollow.id).then(() => checkIfFollowing());
                      }}
                    >Unfollow
                    </Button>
                  </>
                )
                : (
                  <Button
                    type="button"
                    variant="primary"
                    onClick={() => {
                      const payload = {
                        follower: user.id,
                        followed: id,
                      };
                      createFollow(payload).then(() => checkIfFollowing());
                    }}
                    className="btn editBtn"
                  >Follow
                  </Button>
                )}

              <Button variant="primary"><FaShare /> </Button>
            </div>
            <div className="userDetailSection lowerUDS">
              <p>{userDetails?.ride}&#39;n outta {userDetails?.city}, {userDetails?.state}</p>
            </div>
          </div>
          <div className="profileRightSide">
            <ProfilePagination id={id} posts={posts} events={mySessions} onUpdate={profileDetails} />
          </div>
        </div>
      </div>
    </>
  );
}
