import React from 'react'
import styles from './Pagination.module.css';

// const Pagination = ({pokemonPerPage, allPokemon, pagination}) => {
//   const pageNumbers = [];

//   for (let i = 1; i <= Math.ceil(allPokemon/pokemonPerPage); i++){
//     pageNumbers.push(i);
//   }
//   return (
//       <nav>
//         <ul className={styles.pagination} >
//           {pageNumbers &&
//             pageNumbers.map(number => {
//               return <li className={styles.number} key ={number}>
//               <button className={styles.button} onClick={() => pagination(number)}>
//               {number}
//               </button>
//               </li>
//             })}
//         </ul>
//     </nav>
//   )
// }


//export default Pagination

const Pagination = ({pokemonPerPage, allPokemon, pagination, currentPage}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allPokemon/pokemonPerPage); i++){
    pageNumbers.push(i);
  }
  return (
    <nav>
       <div className={styles.paginationContainer}> 
        { pageNumbers && pageNumbers.map((number, i) => (
             <button key={i} onClick={() => pagination(number)} className={styles.Pagination+ (currentPage === number ? 'Active' : '')}  >{number} </button>
        ))}
    </div>
    </nav>
  )
}

export default Pagination