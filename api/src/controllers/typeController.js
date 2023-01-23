const axios = require('axios');
const { Type } = require('../db.js');
const UrlPokemonApiType = 'https://pokeapi.co/api/v2/type' ;


async function getAllTypeApi(req, res, next) {
  try{
    const getApiTypes = (await axios(UrlPokemonApiType)).data.results
    getApiTypes.forEach((type) => {
      Type.findOrCreate({
        where: { 
          name: type.name
        },
      });
    });
    return res.json(await Type.findAll());
      } catch (error) {
      next(error);
  }
};

// const getAllTypeApi = async() => {
  
//     let getApiTypes = (await axios.get(UrlPokemonApiType).data.results);
//     getApiTypes = getApiTypes.map(t => t.name);
//     getApiTypes.forEach (type => {
//       Type.findOrCreate({
//         where: {
//           name: type
//         }
//       })
//     })
//   return await Type.findAll();
// }
//B




module.exports = {
  getAllTypeApi
}