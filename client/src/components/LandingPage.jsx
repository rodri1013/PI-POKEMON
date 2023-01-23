import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';



//import BG from '../assets/bglanding.jpg';
const LandingPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.titlePosition}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>POKEMON</h1>
      </div>
        <Link to="/home">
          <button className={styles.button}>Curious? Come in!!</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;




