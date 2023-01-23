import React, { Fragment } from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPokemon,
  getPokemonType,
  filterPokemonType,
  filterPokemonCreated,
  filterPokemonAttack,
  orderPokemonName } from '../redux/actions';
import { Link } from 'react-router-dom';
import CardPokemon from './CardPokemon';
import styles from './Home.module.css';
import Pagination from './Pagination';
import Search from './Search';
import NavBar from './NavBar';


export default function Home() {
  const dispatch = useDispatch();
  const allPokemon = useSelector((state) => state.pokemon);
  const allPokemonType = useSelector((state) => state.types);

  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonPerPage /*setPokemonPerPage*/] = useState(12);
  const [order,setOrder] = useState('');

  const indexOfLastPokemon = currentPage * pokemonPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
  const currentPokemon = allPokemon.slice(indexOfFirstPokemon,indexOfLastPokemon);

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  useEffect(() => {
    dispatch(getPokemon());
  }, [dispatch]); //get pokemon when componentdidmount

  useEffect(() => {
    dispatch(getPokemonType());
  }, [dispatch]);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getPokemon());
  };

  const handleFilterType = (e) => {
    e.preventDefault();
    dispatch(filterPokemonType(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value); 
  };

  const handleFilterCreated = (e) => {
    e.preventDefault();
    dispatch(filterPokemonCreated(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value); 
  };

  const handleFilterAttack = (e) => {
    e.preventDefault();
    dispatch(filterPokemonAttack(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value); 
  };

//this set a state so we can perform the Order.
  const handleOrderName = (e) => {
    e.preventDefault();
    dispatch(orderPokemonName(e.target.value));
    setOrder(e.target.value); 
    setCurrentPage(1);
  };


  return (
    <div>
      <NavBar />
      <Search />
      <div >
        <div>
        <button
          className={styles.button}
          onClick={(e) => {handleClick(e)}}>
          Pokemon come back!!
        </button>
          <select className={styles.name} onChange={(e) => handleOrderName(e)} value={order}>
            <option value='name'>Name</option>
            <option value='asc'>A-Z</option>
            <option value='desc'>Z-A</option>
          </select>
          <select onChange={(e) => handleFilterAttack(e)} value={order}>
            <option value='attack'>Attack</option>
            <option value='more aggressive'>More Aggressive</option>
            <option value='less aggresive'>Less Aggressive</option>
          </select>
          <select onChange={(e) => handleFilterType(e)} value={order}>
            <option value='type'>Type</option>
            {/* {allPokemonType?.sort((a, b) => (a.name > b.name ? 1 : -1)).map((t) => (<option value={t.name} key={t.id}> */}
              {allPokemonType?.sort((a, b) => a.name.localeCompare(b.name)).map((t) => (<option value={t.name} key={t.id}>
              {`${t.name.charAt(0).toUpperCase() + t.name.slice(1)}`}
            </option>))}
          </select>
          <select onChange={(e) => handleFilterCreated(e)} value={order}>
            <option value='all'>All</option>
            <option value='existent'>Existent</option>
            <option value='created'>Created</option>
          </select> 
          <Pagination
            pokemonPerPage={pokemonPerPage}
            allPokemon={allPokemon.length}
            pagination={pagination}
            currentPage={currentPage}
          />
          {currentPokemon?.map((p) => {
            return (
              <Fragment>
                <Link to={`/home/${p.id}`}>
                  <CardPokemon
                    name={p.name}
                    image={p.image}
                    types={p.types}
                    key={p.id}
                  />
                </Link>
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/*    
//const options = useSelector((state) => state.types);
 {options?.map((t) => (<option value={t.name} key={t.id}>
              {t.name}
            </option>))} 


            <option value='normal'>Normal</option>
            <option value='flying'>Flying</option>
            <option value='poison'>Poison</option>
            <option value='ground'>Ground</option>
            <option value='bug'>Bug</option>
            <option value='fire'>Fire</option>
            <option value='water'>Water</option>
            <option value='grass'>Grass</option>
            <option value='electric'>Electric</option>
            <option value='fairy'>Fairy</option>
            <option value='rock'>Rock</option>
            <option value='ice'>Ice</option>
            <option value='shadow'>Shadow</option>
            <option value='steel'>Steel</option>
            <option value='psychic'>Psychic</option>
            <option value='unknown'>Unknown</option>
            <option value='fighting'>Fighting</option>
            <option value='dragon'>Dragon</option>
            <option value='ghost'>Ghost</option>
            <option value='dark'>Dark</option> 
*/