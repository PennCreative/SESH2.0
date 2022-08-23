/* eslint-disable jsx-a11y/anchor-is-valid */
import { BsBell, BsPersonCircle, BsFillDoorOpenFill } from 'react-icons/bs';
import React from 'react';
import Link from 'next/link';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container-fluid">
        <Link passHref href="/">
          <a className="navbar-brand" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01">
            <img className="navLogo" src="navbarLogo.png" alt="logo" />
          </a>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link passHref href="/">
                <a className="nav-link">
                  Sessions
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link passHref href="/">
                <a className="nav-link">
                  <h5><BsBell /></h5>
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link passHref href="/profile">
                <a className="nav-link">
                  <h5><BsPersonCircle /></h5>
                </a>
              </Link>
            </li>
            <button type="button" className="btn btn-danger" onClick={signOut}>
              <h5><BsFillDoorOpenFill /></h5>
            </button>
          </ul>
        </div>
      </div>
    </nav>
  );
}
