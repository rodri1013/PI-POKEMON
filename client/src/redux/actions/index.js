import axios from 'axios';

const backUrl = 'http://localhost:3001/pokemon';
const backUrlQN = 'http://localhost:3001/pokemon?name=';
const backUrlType = 'http://localhost:3001/type';

export const GET_ALL_POKEMON = 'GET_ALL_POKEMON';
export const FILTER_BY_TYPE = 'FILTER_BY_TYPE';
export const FILTER_BY_CREATED = 'FILTER_BY_CREATED';
export const FILTER_BY_ATTACK = 'FILTER_BY_ATTACK';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const GET_POKEMON_NAME = 'GET_POKEMON_NAME';
export const GET_POKEMON_TYPES = 'GET_POKEMON_TYPES';
export const POST_POKEMON = 'POST_POKEMON';

export function getPokemon(){
  return async function(dispatch) {
    const answer = await axios.get(backUrl);
    return dispatch({
      type: GET_ALL_POKEMON,
      payload: answer.data
    })
  };
};

export function getPokemonName(name) {
  return async function(dispatch) {
    try{
    const answer = await axios.get(backUrlQN + name);
    return dispatch({
      type: GET_POKEMON_NAME,
      payload: answer.data
    })
    } catch (error){
      alert('Pokemon not found')
    }
  };
};

export function getPokemonType(){
  return async function(dispatch) {
    try{
    const answer = await axios.get(backUrlType);
    return dispatch({
      type: GET_POKEMON_TYPES,
      payload: answer.data
    })
    } catch (error){
      console.log(error)
    }
  };
};

// export function postPokemon(payload){
//   return async function () {
//     const response = await axios.post(backUrl, payload)
//     return response;
//   }
//   }

export function postPokemon(pokemon) {
  return async function (dispatch) {
    try {
      dispatch({ type: POST_POKEMON, payload: true });
      await axios.post(backUrl, pokemon);
    } catch (error) {
      console.log(error);
      dispatch({ type: POST_POKEMON, payload: false });
    }
  };
}

export function filterPokemonType(payload) {
  return {
    type: FILTER_BY_TYPE,
    payload
  };
};

export function filterPokemonCreated(payload) {
  return {
    type: FILTER_BY_CREATED,
    payload
  };
};

export function filterPokemonAttack(payload) {
  return {
    type: FILTER_BY_ATTACK,
    payload
  };
};

export function orderPokemonName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload
  };
};
