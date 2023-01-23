import React from 'react';
import styles from './CardPokemon.module.css';


const CardPokemon = ({ name, types, image}) => {
  return (
    <div className={styles.card}>
       <h3 className={styles.name}>{name}</h3>
          <img src={image} alt='images' className={styles.img}/>
            <ul className={styles.typeStyle}>
              <li className={styles.type}>
                {typeof types[0] === 'string'
                  ? types[0]
                  : types[0]?.name}
                {typeof types[1] === 'string'
                  ? ' ~ ' + types[1]
                  : types[1]?.name}
              </li>
            </ul>
    </div>
  );
};

export default CardPokemon


/*
The CardPokemon component uses the typeof operator to check the type of the types prop.
If types is an array of strings, it will render the first and second elements of the array 
separated by a hyphen. If types is an array of objects, it will render the name property of the
first and second elements of the array, separated by a hyphen. 
If types is an empty array or has fewer than two elements, it will not render anything.
*/
