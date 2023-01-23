import React from 'react';
import { Link,useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemonDetail } from '../redux/actions';
import styles from './Details.module.css';



const Details = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const pokemonDetails = useSelector((state) => state.detail);



  useEffect(() => {
    dispatch(getPokemonDetail(id));
    return ()=> {dispatch(getPokemonDetail())}
  }, [dispatch, id]);


  return (
    <div className={styles.container}>
      <div className={styles.back}>
      <Link to='/home' className={styles.letter}> Back </Link> 
    </div>

    <div>
    {pokemonDetails.length ? (
      pokemonDetails.map((p) => (
        <Link to={`/home/${p.id}`}>
          <div>
            <h1 className={styles.names}>{p.name}</h1>
            <h2 className={styles.id}>#{p.id}</h2>
          </div>
          <div>
            <img  className={styles.image} src={p.image} alt='PokeImg' width='250px' height='250px' />
            {p.types.length === 2 ? (
              <div>
                <h3 className={styles.type1}>
                <ul className={styles.type}>
                  <li>
                    {
                    typeof p.types[0] === 'string' ? p.types[0] : p.types[0]?.name}~
                     {
                     typeof p.types[1] === 'string' ? p.types[1] : p.types[1]?.name}
                  </li>
                </ul>
                </h3>
              </div>
            ) : (
              <div>
                <h3 className={styles.type2}>{
                typeof p.types[0] === 'string' ? p.types[0] : p.types[0]?.name}</h3>
              </div>
            )} 
            <div>
            <div className={styles.list}>
            <div>
              <p> hp {p.hp}</p>
              <progress max='250' value={p.hp}></progress>
            </div>
            <div>
              <p> attack {p.attack}</p>
              <progress max='250' value={p.attack}></progress>
            </div>
            <div>
              <p> defense {p.defense}</p>
              <progress max='250' value={p.defense}></progress>
            </div>
            <div>
              <p> speed {p.speed}</p>
              <progress max='250' value={p.speed}></progress>
            </div>
            <div>
              <p> height {p.height}</p>
              <progress max='100' value={p.height}></progress>
            </div>
            <div>
              <p> weight {p.weight}</p>
              <progress max='1000' value={p.weight}></progress>
            </div>
            </div>
          </div>
          </div>
        </Link>
      ))
    ) : (
      <img
        src={'https://static.wixstatic.com/media/20abc5_e58061f333744c2899c375ec7f024eb3~mv2.gif'}
        width='250px' height='300px'
        alt='Not found'
      />
    )}
  </div>
  </div>
  )
}
  
export default Details

/* <div className={styles.container}>
<div className={styles.back}>
<Link to='/home' className={styles.letter}> Back </Link> 
</div>
{
  pokemonDetails.length > 0 ?
  <div>
      <h1>{pokemonDetails[0].name}</h1>
     <h1>{pokemonDetails[0].id}</h1>
     <span>Type:</span>
                            {pokemonDetails[0].types.map( (t,i) => (<span key={i}> {t.name} </span>))}
              <img  src={pokemonDetails[0].image} alt='not found'/>
              <p>hp : {pokemonDetails[0].hp}</p>
              <p>attack : {pokemonDetails[0].attack}</p>
              <p>defense : {pokemonDetails[0].defense}</p>
              <p>speed : {pokemonDetails[0].speed}</p>
              <p>height : {pokemonDetails[0].height}</p>
              <p>weight : {pokemonDetails[0].weight}</p>
              <p>types :  {!pokemonDetails[0].createdInDb? pokemonDetails[0].types + ' ' : pokemonDetails[0].types.map((el, index) => pokemonDetails[0].types.length -1 === index? el.name : el.name + (', '))}</p>
  </div>
  : <p> Loading...</p>
}

</div> */


  



/*
<div className={styles.container}>
<div className={styles.back}>
<Link to='/home' className={styles.letter}> Back </Link> 
</div>
{
  pokemonDetails.length > 0 ?
  <div>
      <h1>{pokemonDetails[0].name}</h1>
     <h1>{pokemonDetails[0].name}</h1>
     <span>Type:</span>
                            {myPokemon[0].types.map( (t,i) => (<span key={i}> {t.name} </span>))}
              <img  src={pokemonDetails[0].image?pokemonDetails[0].image.detail : pokemonDetails[0]} alt='not found'/>
              <p>hp : {pokemonDetails[0].hp}</p>
              <p>attack : {pokemonDetails[0].attack}</p>
              <p>defense : {pokemonDetails[0].defense}</p>
              <p>speed : {pokemonDetails[0].speed}</p>
              <p>height : {pokemonDetails[0].height}</p>
              <p>weight : {pokemonDetails[0].weight}</p>
              <p>types :  {!pokemonDetails[0].createdInDb? pokemonDetails[0].types + ' ' : pokemonDetails[0].types.map((el, index) => pokemonDetails[0].types.length -1 === index? el.name : el.name + (', '))}</p>
  </div>
  : <p> Loading...</p>
}

</div>
*/