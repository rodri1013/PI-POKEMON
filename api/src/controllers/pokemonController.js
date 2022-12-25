const axios = require('axios');
const { Pokemon, Type } = require('../db.js');
const UrlPokemonApi = 'https://pokeapi.co/api/v2/pokemon?limit=50'


// async function getAllPokemonApi(req, res, next) {
//   try {
//     const pokemon = (await axios(UrlPokemonApi)).data.results
//     res.send(pokemon);
//   } catch (error) {
//     next(error);
//   }
// };

const getAllPokemonApi = async(req, res, next)=> {
  try {
    const pokeApiUrl = await axios.get(UrlPokemonApi);
    const pokeApiInfo =  Promise.all(pokeApiUrl.data.results.map(async(answer) => {
      const pokeApiDetail =  await axios.get(answer.url);
      const pokeInfo = {
        id: pokeApiDetail.data.id,
        name: pokeApiDetail.data.name,
        hp: pokeApiDetail.data.stats[0].base_stat,
        attack: pokeApiDetail.data.stats[1].base_stat,
        defense: pokeApiDetail.data.stats[2].base_stat,
        speed: pokeApiDetail.data.stats[3].base_stat,
        height: pokeApiDetail.data.height,
        weight: pokeApiDetail.data.weight,
        image: pokeApiDetail.data.sprites.other.dream_world.front_default,
        types: pokeApiDetail.data.types.map((t) =>  t.type.name),
        createdInDb: false,
      };
      return pokeInfo;
    })
    );
    return pokeApiInfo;
  } catch (error) {
    next(error);
    //return ('fatal error');
  };
};

// const getAllPokemonApi = async () => {
//   const pokemonApiData = await axios
//     .get(UrlPokemonApi)
//     .then((data) => {
//       return data.data.results;
//     })
//     .then((data) => {
//       return Promise.all(data.map((answer) => axios.get(answer.url))); // Enter to each element and do a  get to its' url, we have an array.
//     })
//     .then((data) => {
//       return data.map((answer) => answer.data); // Pokemon data kept in pokemonDataArray.
//     });
//   const pokemonDataArray = pokemonApiData.map((details) => {  //Inside pokemonDataArray I have the properties I want.
//     return {
//       id: details.id,
//       name: details.name,
//       hp: details.stats[0].base_stat,
//       attack: details.stats[1].base_stat,
//       defense: details.stats[2].base_stat,
//       speed: details.stats[3].base_stat,
//       height: details.height,
//       weight: details.weight,
//       image: details.sprites.other.dream_world.front_default,
//       types: details.types.map((t) => t.type.name),
//       createdInDb: false,
//     };
//   });
//   return pokemonDataArray;
// };


const getDbPokemonInfo = async (req, res, next) =>{
  try {
    const pokemonDbInfo =  await Pokemon.findAll({
      include: {
        model: Type,
        attributes: ['name'],
        through: {
          attributes: [],
        }
      }
    });
    return pokemonDbInfo;
  } catch (error) {
    next (error);
  };
};

const getAllPokemon = async (req, res, next) =>{
  //try {
    const apiInfo = await getAllPokemonApi();
    const dbInfo = await getDbPokemonInfo();
    const wholeInfo = await apiInfo.concat(dbInfo);
    return wholeInfo;
  //} catch (error) {
    //next (error);
    //return ('Fatal error');
  //};
};


module.exports = {
  getAllPokemon
}