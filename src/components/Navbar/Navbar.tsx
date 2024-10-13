import React from 'react';
import Image from 'next/image';
import Logo from '../../../public/img/logo.png';
import UserImage from '../../../public/img/Avatar.png'; 
import "./navbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'; 

const Navbar = () => {
  return (
    <nav className="my-navbar">
      <div className="my-container">
        <a href="/" className="my-navbar-brand">
          <Image src={Logo} alt="Logo" className="logo" />
        </a>
        <ul className="my-navbar-nav">
          <li className="nav-item">
            <a href="/" className="nav-link">Home</a>
          </li>
          <li className="nav-item">
            <a href="/eventos" className="nav-link">Eventos</a>
          </li>
          <li className="nav-item">
            <a href="/locais" className="nav-link">Locais</a>
          </li>
        </ul>
        <div className="my-navbar-right">
          <div className="user-info">
            <Image src={UserImage} alt="User" className="user-image" />
            <span className="user-name">Olá, Nome</span>
            <div className="dropdown-icon">
              <FontAwesomeIcon className='tamanho-dropdown' icon={faChevronDown} />
            </div> 
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;