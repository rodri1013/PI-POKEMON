import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPokemonName } from '../redux/actions';
import styles from './Search.module.css';
import { FaSearch } from 'react-icons/fa';

const Search = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');//we can see what's in the input.

  const handleInput = (e) => {
    e.preventDefault();
    setName(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name.length) {
      alert('Please enter a name');
    } else {
      dispatch(getPokemonName(name));
      setName('');  
    }
  };

  return (
    <form className={styles.searchContainer} onSubmit={(e) => handleSubmit(e)}>
      <div className={styles.searchBox}>
        <input 
          className={styles.searchInput} 
          type='text' 
          value={name} 
          onChange={(e)=> handleInput(e)}
          placeholder='Search Pokemon...'
          id='name'
          />
        <button className={styles.searchButton} type='submit'>
        <FaSearch  size={20}/>
        </button>
      </div>
    </form>
  )
}

export default Search

