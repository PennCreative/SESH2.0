/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import ProfilePagination from './ProfilePagination';

export default function ProfilePage(
  {
    firstName, lastName, handle, image, city, state, ride, postObj, attendingObj, eventObj, onUpdate,
  },
) {
  console.log(ride);
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
            <img className="profilePic" src={image} alt="profile pic" />
            <div className="userDetailSection">
              <h3>{firstName} {lastName}</h3>
              <h5>@{handle}</h5>
            </div>
            <div className="btnGroup">
              <Link href={`/profile/edit/${handle}`} passHref>
                <Button variant="info">EDIT</Button>
              </Link>
              <Button variant="info">Share</Button>
            </div>
            <div className="userDetailSection lowerUDS">
              <p>{ride}&#39;r outta {city}, {state}</p>
            </div>
          </div>
          <div className="profileRightSide">
            <ProfilePagination handle={handle} posts={postObj} attending={attendingObj} event={eventObj} onUpdate={onUpdate} />
          </div>
        </div>
      </div>
    </>
  );
}

ProfilePage.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  handle: PropTypes.string,
  image: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  ride: PropTypes.string,
}.isRequired;
