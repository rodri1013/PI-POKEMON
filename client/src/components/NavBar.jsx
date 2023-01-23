import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';
import Logo1 from '../assets/cooltext1.png';
import Logo2 from '../assets/cooltext4.png';

export default function NavBar() {
  return (
      <header id='navegador' className={styles.header}>
        <Link to='/'>
          <img  className={styles.logo} src={ Logo1 } alt='pkh' />
        </Link>
       <div> 
          <Link to='/create' className={styles.created} >
          <img  className={styles.logo2} src={ Logo2 } alt='pkc' />
          </Link>
        </div>
      </header>

  );
}