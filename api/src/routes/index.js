const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pokemonRoute = require('./pokemonRoute.js');
const typeRoute = require('./typeRoute.js');


const router = Router();
router.use('/pokemon', pokemonRoute);// middleware same as router.get
router.use('/type', typeRoute);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
