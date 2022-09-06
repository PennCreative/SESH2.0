/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { BsBell, BsPersonCircle, BsFillDoorOpenFill } from 'react-icons/bs';
import React from 'react';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import { signOut } from '../utils/auth';
import { getUserByUid } from '../api/usersData';

export default function NavBar() {
  const { user } = useAuth();
  const router = useRouter();

  const checkIfUserExistsThenRoute = () => {
    getUserByUid(user.uid).then((response) => {
      if (response) {
        router.push(`/profile/${response.handle}`);
      } else {
        router.push('/profile/new');
      }
    });
  };
  return (
    <nav className="navbar navbar-expand-md">
      <div className="container-fluid">
        <Link passHref href="/">
          <a className="navbar-brand" href="#">
            <img className="navLogo" src="navbarLogo.png" alt="logo" />
          </a>
        </Link>
        <Link passHref href="../sessions">
          <a className="nav-link">
            Sessions
          </a>
        </Link>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link passHref href="/">
                <a className="nav-link">
                  <h5><BsBell /></h5>
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Button type="button" variant="outline-dark" className="btn navBtn" onClick={() => checkIfUserExistsThenRoute()}>
                <h5><BsPersonCircle /></h5>
              </Button>
            </li>
            <li className="nav-item">
              <Button type="button" variant="outline-danger" className="btn navBtn" onClick={signOut}>
                <h5><BsFillDoorOpenFill /></h5>
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
