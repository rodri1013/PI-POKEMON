import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';
//import Logo from '..assets/poklogo.png';

export default function NavBar() {
  return (
      <header id='navegador' className={styles.header}>
        <Link to="/">
          <img  className={styles.logo} src='https://i.imgur.com/avg4dfp.png' alt='404' />
        </Link>
       <div> <Link to='/create' className={styles.created} >
              Crear Pokemon
            </Link></div>
  
      </header>

  );
}