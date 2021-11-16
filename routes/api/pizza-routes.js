const router = require('express').Router();
// desrtucture the method names out of the controller object and use those names directly
const {
    getAllPizza,
    getPizzaById,
    createPizza,
    updatePizza,
    deletePizza
} = require('../../controllers/pizza-controller');

// set up GET all and POST at api/pizzas || simply using name as callback
router
.route('/')
.get(getAllPizza)
.post(createPizza);

// set up GET one, PUT, and DELETE at /api/pizzas/:id
router
.route('/:id')
.get(getPizzaById)
.put(updatePizza)
.delete(deletePizza);

module.exports = router; 