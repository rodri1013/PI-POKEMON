const { Router } = require('express');
const { getAllPokemon } = require('../controllers/pokemonController');
const { Pokemon, Type } = require('../db.js');
const router = Router();
//router.use('/', getAllPokemon);

router.get('/', async (req, res, next) => {
  try {
    const { name } = req.query;
    const pokemonApiDb = await getAllPokemon(); 
    if (name) { //Check if name is inside the const.
      const pokemonName = await pokemonApiDb.filter((n) => 
        n.name.toLowerCase().includes(name.toLowerCase())
      );
      pokemonName.length
        ? res.status(200).send(pokemonName)
        : res.status(404).send(`There is no pokemon called: ${name}`);
    } else {
      res.status(200).send(pokemonApiDb);
    }
  } catch (error) {
    next(error);
  };
});

router.get('/:id', async (req, res, next) => {
  try {
    const{ id } = req.params;
    const pokemonApiDb = await getAllPokemon()
    if (id) {
      const pokemonId = pokemonApiDb.filter(pk => pk.id == id);
      pokemonId.length
      ? res.status(200).json(pokemonId)
      : res.status(404).send(`Pokemon ${id} not found`);
    }
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    let {name, hp, attack, defense, speed, height, weight, types, image, createdInDb} = req.body;
    let pokemonCreated = await Pokemon.create({
      name,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      image,
      createdInDb,
    });
    let typesDb = await Type.findAll({ where: { name: types } });
    pokemonCreated.addType(typesDb);
    res.status(201).send('Pokemon created successfully');
    
  } catch (error) {
    next(error);
  }
});


router.delete("/:id", async  (req, res, next) => {
  try {
      const { id } = req.params;
      let pokemonsTotal = await getAllPokemon();
      if (id){
          let pokemonId = await pokemonsTotal.filter(e => e.id == id);
          await Pokemon.destroy({
              where: {id: id}
          })
          pokemonId.length?
          res.status(200).send(pokemonId) :
          res.status(404).send('Pokemon not found!');
      }
      pokemonsTotal = pokemonsTotal.filter(e => e.id != id)
  } catch (error) {
      next(error)
  }
});

module.exports = router;