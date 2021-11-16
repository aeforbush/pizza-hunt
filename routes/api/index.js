// this file imports all of the API routes and prefixes their endpoint names and packages them up
const router = require('express').Router();
const pizzaRoutes = require('./pizza-routes');

router.use('/pizzas', pizzaRoutes);

module.exports = router;