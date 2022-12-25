const { Router } = require('express');
const { getAllTypeApi } = require('../controllers/typeController');
const router = Router();



router.use('/', getAllTypeApi)


module.exports = router;