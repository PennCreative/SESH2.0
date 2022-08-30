/* eslint-disable @next/next/no-img-element */
// import { useRouter } from 'next/router';
// import Link from 'next/link';
import PropTypes from 'prop-types';
// import { useAuth } from '../utils/context/authContext';

export default function ProfilePage(
  {
    firstName, lastName, handle, image, city, state, ride,
  },
) {
  // const router = useRouter();
  // const { user } = useAuth();
  // const host = 'localhost:3000';
  // const path = router.asPath;
  console.warn(firstName);
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
              <h5>{ride}</h5>
              <h3>{firstName} {lastName}</h3>
              <sub>@{handle}</sub>
              <p>{city}, {state}</p>
            </div>
          </div>
          <div className="profileRightSide">
            <h1>Right Side</h1>
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
