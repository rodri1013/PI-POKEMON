const axios = require('axios');
const { Pokemon, Type } = require('../db.js');
const UrlPokemonApi = 'https://pokeapi.co/api/v2/pokemon?limit=40';


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
        speed: pokeApiDetail.data.stats[5].base_stat,
        height: pokeApiDetail.data.height,
        weight: pokeApiDetail.data.weight,
        image: pokeApiDetail.data.sprites.other.dream_world.front_default,
        types: pokeApiDetail.data.types.map((t) => t.type.name),
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
  try {
    const apiInfo = await getAllPokemonApi();
    const dbInfo = await getDbPokemonInfo();
    const wholeInfo = await apiInfo.concat(dbInfo);
    return wholeInfo;
  } catch (error) {
    next (error);
    //return ('Fatal error');
    //console.error(error);
  };
};


module.exports = {
  getAllPokemon
}