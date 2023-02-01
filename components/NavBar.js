/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { BsPersonCircle, BsFillDoorOpenFill } from 'react-icons/bs';
import React from 'react';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import { signOut } from '../utils/auth';
import { getUserById } from '../utils/data/api/userData';

export default function NavBar() {
  const { user } = useAuth();
  const router = useRouter();
  const userId = user.id;

  const checkIfUserExistsThenRoute = () => {
    getUserById(user.id).then((response) => {
      if (response) {
        router.push(`/profile/${userId}}`);
      } else {
        router.push('/profile/new');
      }
    });
  };

  return (
    <nav className="navbar navbar-expand-md nav">
      <div className="container-fluid">
        <Link passHref href="/">
          <a className="navbar-brand" href="#">
            <img className="navLogo" src="/navbarLogo.png" alt="Sesh" />
          </a>
        </Link>
        <Link passHref href="../session">
          <a className="nav-link">
            Find a Sesh
          </a>
        </Link>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav me-auto">
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
