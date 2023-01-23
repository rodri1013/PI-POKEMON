import React from 'react';
import styles from './Pagination.module.css';


const Pagination = ({pokemonPerPage, allPokemon, pagination, currentPage}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allPokemon/pokemonPerPage); i++){
    pageNumbers.push(i);
  }
  return (
      <nav>
        <ul className={styles.pagination} >
          {pageNumbers &&
            pageNumbers.map((number, i) => {
              return <li className={styles.number} key={number}>
              <button 
                key={i} 
                className={`${styles.button} ${number === currentPage ? styles.active : ''}`} 
                onClick={() => pagination(number)}>
                {number}
              </button>
              </li>
            })}
        </ul>
    </nav>
  );
};


export default Pagination
