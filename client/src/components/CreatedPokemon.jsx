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

// const validate = (input) => {
//   let errors = {};
//   if (!input.name) {
//     errors.name = 'Name is required';
//   } else if (!stringRegExp.test(input.name)) {
//     errors.name = 'Name can only contain:lowercase, - and length 1-20';
//   }
//   if(!input.image){
//     errors.image = 'Image url format is required';
//     } else if (!urlRegExp.test(input.image)){
//     errors.image = 'Image URL invalid';
//   }
//   if (!input.hp) {
//     errors.hp = 'Hp is required';
//   } else if (!numberRegExp.test(input.hp)) {
//     errors.hp = 'Hp must be between 1 and 250';
//   }
//   if (!input.attack) {
//     errors.attack = 'Attack is required';
//   } else if (!numberRegExp.test(input.attack)) {
//     errors.attack = 'Attack must be between 1 and 250';
//   }
//   if (!input.defense) {
//     errors.defense = 'Defense is required';
//   } else if (!numberRegExp.test(input.defense)) {
//     errors.defense = 'Defense must be between 1 and 250';
//   }
//   if (!input.speed) {
//     errors.speed = 'Speed is required';
//   } else if (!numberRegExp.test(input.speed)) {
//     errors.speed = 'Speed must be between 1 and 250';
//   }
//   if (!input.height) {
//     errors.height = 'Height is required';
//   } else if (!heightRegExp.test(input.height)) {
//     errors.height = 'Height must be between 1 and 100';
//   }
//   if (!input.weight) {
//     errors.weight = 'Weight is required';
//   } else if (!weightRegExp.test(input.weight)) {
//     errors.weight = 'Weight must be between 1 and 1000';
//   }
//   if (!input.types) {
//     errors.types = 'At least select 1 or max 2 types'
//   }
//   return errors;
// };

const validationRules = {
  name: {
    required: true,
    pattern: stringRegExp,
    errorMessage: 'Required name format: lowercase, - and length 1-20'
  },
  image: {
    required: true,
    pattern: urlRegExp,
    errorMessage: 'Required URL format'
  },
  hp: {
    required: true,
    pattern: numberRegExp,
    errorMessage: 'Required value between 1 to 250'
  },
  attack: {
    required: true,
    pattern: numberRegExp,
    errorMessage: 'Required value between 1 to 250'
  },
  defense: {
    required: true,
    pattern: numberRegExp,
    errorMessage: 'Required value between 1 to 250'
  },
  speed: {
    required: true,
    pattern: numberRegExp,
    errorMessage: 'Required value between 1 to 250'
  },
  height: {
    required: true,
    pattern: heightRegExp,
    errorMessage: 'Required value between 1 to 100'
  },
  weight: {
    required: true,
    pattern: weightRegExp,
    errorMessage: 'Required value between 1 to 1000'
  },
  types: {
    required: true,
    minLength: 1,
    maxLength: 2,
    errorMessage: 'At least select 1 or max 2 types'
  }
};

const validate = (input) => {
  let errors = {};
  for (const key in validationRules) {
    const { required, pattern, minLength, maxLength, errorMessage } = validationRules[key];
    if (required && !input[key]) {
      errors[key] = errorMessage;
    } else if (pattern && !pattern.test(input[key])) {
      errors[key] = errorMessage;
    } else if (minLength && input[key].length < minLength) {
      errors[key] = errorMessage;
    } else if (maxLength && input[key].length > maxLength) {
      errors[key] = errorMessage;
    }
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
    if(e.target.value !== 'type') {
      setInput({
        ...input,
        types: [...input.types, e.target.value],
      });
    }
  };
  
  const handleRemoveType = (index) => {
    const newTypes = input.types.filter((_, i) => i !== index);
    setInput({ ...input, types: newTypes });
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
      }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(input);
  //   dispatch(postPokemon(input));
  //   alert('Pokemon created successfully')
  //   setInput({
  //     name: '',
  //     hp: '',
  //     attack: '',
  //     defense: '',
  //     speed: '',
  //     height: '',
  //     weight: '',
  //     image: '',
  //     types: [],
  //   });
  //   history.push('/home')//We send the user to our home page
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(input);
    setErrors(validationErrors);
    if(Object.keys(validationErrors).length === 0  &&  !Object.values(input).some(i => i === '')){
        const success = dispatch(postPokemon(input));
        if (success) {
          alert('Pokemon created successfully');
        }
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
        })
        history.push('/home');
    }
};

  const sortedTypes = types.sort((a, b) => a.name.localeCompare(b.name));
  //const isButtonDisabled = Object.keys(errors).length !== 0 || Object.values(input).some(x => x === '');
  
  return (
  <div className={styles.background}>
    <div className={styles.container}>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <h3 className={styles.title}>Blow your mind!!</h3>
      
          <div>
            <label htmlFor='name'>Name: </label>
              <input
                type='text'
                id='name'
                name='name'
                value={input.name}
                className={styles.input}
                onChange={(e) => handleInputChange(e)}
                />
                {errors.name && <p className={styles.error}> {errors.name}</p>}
          </div>

          <div>
            <label htmlFor='image'>Image: </label>
              <input
                type='text'
                id='image'
                name='image'
                value={input.image}
                className={styles.input}
                onChange={(e) => handleInputChange(e)}
                />
                {errors.image && <p className={styles.error}> {errors.image}</p>}
          </div>

          <div>
            <label htmlFor='hp'>Hp: </label>
              <input
                type='number'
                id='hp'
                name='hp'
                value={input.hp}
                className={styles.input}
                onChange={(e) => handleInputChange(e)}
                />{''}
                {errors.hp && <p className={styles.error}> {errors.hp}</p>}
          </div>

          <div>
            <label htmlFor='attack'>Attack: </label>
              <input
                type='number'
                id='attack'
                name='attack'
                value={input.attack}
                className={styles.input}
                onChange={(e) => handleInputChange(e)}
                />{''}
                {errors.attack && <p className={styles.error}> {errors.attack}</p>}
          </div>

          <div>
            <label htmlFor='defense'>Defense: </label>
            <input
                type='number'
                id='dfense'
                name='defense'
                value={input.defense}
                className={styles.input}
                onChange={(e) => handleInputChange(e)}
                />{''}
                {errors.defense && <p className={styles.error}> {errors.defense}</p>}
          </div>

          <div>
            <label htmlFor='speed'>Speed: </label>
            <input
              type='number'
              id='speed'
              name='speed'
              value={input.speed}
              className={styles.input}
              onChange={(e) => handleInputChange(e)}
              />
              {errors.speed && <p className={styles.error}> {errors.speed}</p>}
          </div>

          <div>
            <label htmlFor='height'>Height: </label>
            <input
              type='number'
              name='height'
              id='height'
              value={input.height}
              className={styles.input}
              onChange={(e) => handleInputChange(e)}
              />
              {errors.height && <p className={styles.error}> {errors.height}</p>}
          </div>

          <div>
            <label htmlFor='weight'>Weight: </label>
            <input
              type='number'
              id='weight'
              name='weight'
              value={input.weight}
              className={styles.input}
              onChange={(e) => handleInputChange(e)}
              />
              {errors.weight && <p className={styles.error}> {errors.weight}</p>}
          </div>
        
          <div>
            <select className={styles.select} onChange={handleSelectChange}>
              <option value= 'type'>Type</option>
              {sortedTypes.map((t) => (<option value={t.name}>{t.name}</option>))}
            </select>
            {errors.types && <p className={styles.error}> {errors.types}</p>}
               <div className={styles['selected-types']}>
                {input.types.map((type, index) => (
                  <span key={type} className={styles['selected-type']}>
                    {type}
                      <button onClick={() => handleRemoveType(index)}>x</button>
                  </span>))}
              </div>
            </div>

        <Link to='/home'>
          <button type='submit' className={styles.back}>Back</button></Link>
          <button type='submit' 
            className={styles.buttons}
            //disabled={isButtonDisabled}
            onChange={(e) => handleInputChange(e)}>
            Create Pokemon
          </button>
      </form>
    </div>
  </div>
  );
};

export default CreatedPokemon
