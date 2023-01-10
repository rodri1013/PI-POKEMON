const axios = require('axios');
const { Type } = require('../db.js');
const UrlPokemonApiType = 'https://pokeapi.co/api/v2/type' ;
//const header = {headers:{'Accept-Encoding': 'identity'}};

async function getAllTypeApi(req, res, next) {
  try{
    const getApiTypes = (await axios(UrlPokemonApiType)).data.results
    getApiTypes.forEach((type) => {
      Type.findOrCreate({
        where: { 
          name: type.name,
        },
      });
    });
    return res.json(await Type.findAll());
      } catch (error) {
      next(error);
  }
};


module.exports = {
  getAllTypeApi
};