import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getPokemonType, postPokemon } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import styles from './CreatedPokemon.module.css';



const stringRegExp = /^[a-z-]{1,20}$/
const urlRegExp = /(http|https?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/  ;
const numberRegExp = /^([1-9]{1,2}|1[0-9]{1,2}|2[0-4][0-9]|250)$/;
const heightRegExp = /^([1-9]\d{0,1}|100)$/;
const weightRegExp = /^([1-9]\d{0,2}|1000)$/;

const validate = (input) => {
  let errors = {};
  if (!input.name) {
    errors.name = 'Name is required';
  } else if (!stringRegExp.test(input.name)) {
    errors.name = 'Name can only contain:lowercase, - and length 1-20';
  }
  if(!input.image){
    errors.image = 'Image is required';
    } else if (!urlRegExp.test(input.image)){
    errors.image = 'Image URL invalid';
  }
  if (!input.hp) {
    errors.hp = 'Hp is required';
  } else if (!numberRegExp.test(input.hp)) {
    errors.hp = 'Hp must be between 1 and 250';
  }
  if (!input.attack) {
    errors.attack = 'Attack is required';
  } else if (!numberRegExp.test(input.attack)) {
    errors.attack = 'Attack must be between 1 and 250';
  }
  if (!input.defense) {
    errors.defense = 'Defense is required';
  } else if (!numberRegExp.test(input.defense)) {
    errors.defense = 'Defense must be between 1 and 250';
  }
  if (!input.speed) {
    errors.speed = 'Speed is required';
  } else if (!numberRegExp.test(input.speed)) {
    errors.speed = 'Speed must be between 1 and 250';
  }
  if (!input.height) {
    errors.height = 'Height is required';
  } else if (!heightRegExp.test(input.height)) {
    errors.height = 'Height must be between 1 and 100';
  }
  if (!input.weight) {
    errors.weight = 'Weight is required';
  } else if (!weightRegExp.test(input.weight)) {
    errors.weight = 'Weight must be between 1 and 1000';
  }
  return errors;
};


const CreatedPokemon = () => {
  const dispatch = useDispatch();
  const history = useHistory();//
  const types = useSelector((state) => state.types)//useSelector provides the state.types
  const [errors,setErrors] = useState({}); 

  //I keep the form in a state
  const [input, setInput] = useState({
    name: '',
    hp: '',
    attack: '',
    defense: '',
    speed: '',
    height: '',
    weight: '',
    image: '',
    types: [],
  });
  
  useEffect(() => {
    dispatch(getPokemonType());
  },[dispatch]);

  const handleSelectChange = (e) => {
    if(input.types.length >=2) return;
    setInput({
      ...input,
      types: [...input.types, e.target.value],
    });
  };

  //We add to our input state, what we catch from the input when user provides a new value. 
  const handleInputChange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name] : e.target.value
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    dispatch(postPokemon(input));
    alert('Pokemon created successfully')
    setInput({
      name: '',
      hp: '',
      attack: '',
      defense: '',
      speed: '',
      height: '',
      weight: '',
      image: '',
      types: [],
    });
    history.push('/home')//We send the user to our home page
  }

  const sortedTypes = types.sort((a, b) => a.name.localeCompare(b.name));

  
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <h3 className={styles.title}>Blow your mind!!</h3>
      

          <label htmlFor='name'>Name: </label>
          <input
            onChange={(e) => handleInputChange(e)}
            // id='name'
            name='name'
            type='text'
            value={input.name}
            className={styles.input}
          />
          {errors.name && <p className={styles.error}> {errors.name}</p>}
      
      
          <label htmlFor='image'>Image: </label>
          <input
            onChange={(e) => handleInputChange(e)}
            name='image'
            type='text'
            value={input.image}
            className={styles.input}
          />
          {errors.image && <p className={styles.error}> {errors.image}</p>}
        
          
          <label htmlFor='hp'>Hp: </label>
          <input
            onChange={(e) => handleInputChange(e)}
            name='hp'
            type='number'
            value={input.hp}
            className={styles.input}
          />
          {errors.hp && <p className={styles.error}> {errors.hp}</p>}
      

          <label htmlFor='attack'>Attack: </label>
          <input
            onChange={(e) => handleInputChange(e)}
            name='attack'
            type='number'
            value={input.attack}
            className={styles.input}
          />
          {errors.attack && <p className={styles.error}> {errors.attack}</p>}
      
          <label htmlFor='defense'>Defense: </label>
          <input
            onChange={(e) => handleInputChange(e)}
            name='defense'
            type="number"
            value={input.defense}
            className={styles.input}
          />
          {errors.defense && <p className={styles.error}> {errors.defense}</p>}
      
          <label htmlFor='speed'>Speed: </label>
          <input
            onChange={(e) => handleInputChange(e)}
            name='speed'
            type='number'
            value={input.speed}
            className={styles.input}
          />
          {errors.speed && <p className={styles.error}> {errors.speed}</p>}
      
          <label htmlFor='height'>Height: </label>
          <input
            onChange={(e) => handleInputChange(e)}
            name='height'
            type='number'
            value={input.height}
            className={styles.input}
          />
          {errors.height && <p className={styles.error}> {errors.height}</p>}
      
          <label htmlFor='weight'>Weight: </label>
          <input
            onChange={(e) => handleInputChange(e)}
            name='weight'
            type='number'
            value={input.weight}
            className={styles.input}
          />
          {errors.weight && <p className={styles.error}> {errors.weight}</p>}
        
          <p className={styles.typess}>
          <select onChange={(e) => handleSelectChange(e)}>
            {sortedTypes.map((t) => (
            <option  value={t.name}>{t.name}</option>))}
          </select>
            <ul>
              <li>{input.types.map((t) => t + ' , ')}</li>
            </ul>
          </p>
        <Link to='/home'>
      <button type='submit' className={styles.atras}>Back</button></Link>
      <button type='submit' className={styles.bottom}>Create Pokemon</button>
    </form>
  </div>
  );
};

export default CreatedPokemon


// multiple={true} maxLength={2}