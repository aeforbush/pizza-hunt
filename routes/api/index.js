// this file imports all of the API routes and prefixes their endpoint names and packages them up
const router = require('express').Router();
const pizzaRoutes = require('./pizza-routes');
const commentRoutes = require('./comment-routes');


router.use('/pizzas', pizzaRoutes);
router.use('/comments', commentRoutes);


module.exports = router;