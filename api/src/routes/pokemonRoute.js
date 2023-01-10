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
      const pokemonName = await pokemonApiDb.filter((el) => 
        el.name.toLowerCase().includes(name.toLowerCase())
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
    const {name, hp, attack, defense, speed, height, weight, types, image, createdInDb} = req.body;
    const newPokemon = await Pokemon.create({
      //name: name.toLowerCase(),
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
    // const exist = await Pokemon.findOne({ where: { name: name } });
    //   if (exist) {return res.json({ info: "Name already exists" })}
    //if (!name) return res.json({ Attention: ' Name must be provided' });//Only if name is empty
    if(Array.isArray(types) && types.length){ 
      const dbTypes = await Promise.all( //variable with a promise all resolution.
        types.map((type) => { //check data by mapping and looking for matching data in our database.
          return Type.findOne({where:{ name: type}}) 
        })
      )
     await newPokemon.setTypes(dbTypes) //Once promise Pokemon.create is resolved we add the type.
     return res.status(201).send('Pokemon created successfully');
    }
  } catch (error) {
    next(error);
    //res.status(400).send('Types is empty')
  }
});

module.exports = router;