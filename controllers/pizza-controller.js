const { Pizza } = require("../models");
const { db } = require("../models/Pizza");

// functions will be created as methods of the pizzaController object
// used as callback functions for Express (req, res)
const pizzaController = {
  // get all pizzas || callback func for GET/api/pizzas route
  getAllPizza(req, res) {
    Pizza.find({})
      .then((dbPizzaData) => res.json(dbPizzaData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get one pizza by id
  getPizzaById({ params }, res) {
    // instead of accessing the entire req, params is destructured out of it
    Pizza.findOne({ _id: params.id })
      .then((dbPizzaData) => {
        // If no pizza is found, send 404
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza found with this id." });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // create Pizza by destructuring the body out of the express req object
  // in MongoDB the methods are .insertOne() or .insertMany()
  createPizza({ body }, res) {
    Pizza.create(body)
      .then((dbPizzaData) => res.json(dbPizzaData))
      .catch((err) => res.status(400).json(err));
  },

  // update pizza by id || .updateOne() & .updateMany updates docs without returning them
  updatePizza({ params, body }, res) {
      // {new: true} returns the updated document
    Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza found with this id!" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // delete pizza || this method provides a little more data unlike .deleteOne() or .deleteMany
  deletePizza({params}, res) {
      Pizza.findOneAndDelete({_id: params.id})
      .then(dbPizzaData => {
          if (!dbPizzaData) {
              res.status(404).json({message: 'No pizza found with this id!'});
              return;
          }
          res.json(dbPizzaData);
      })
      .catch(err => res.status(400).json(err));
  }
};

module.exports = pizzaController;