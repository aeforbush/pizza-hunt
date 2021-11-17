// importing the Schema constructor and model function
const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String,
    },
    createdBy: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal)
    },
    size: {
      type: String,
      default: "Large",
    },
    toppings: [],
    comments: [
      {
        type: Schema.Types.ObjectId,
        // ref tells which docs to refer to
        ref: "Comment",
      },
    ],
  },
  {
      // tells Mongoose to use these functions
    toJSON: {
      virtuals: true,
      getters: true
    },
    // id is set to false bc it's a virtual Mongoose returns and we don't need it.
    id: false,
  }
);

// get total count of comments and replies on retrieval || virtuals add more info to db response
PizzaSchema.virtual("commentCount").get(function () {
  return this.comments.length;
});

// create the Pizza model using the PizzaSchema
const Pizza = model("Pizza", PizzaSchema);

// export the Pizza model
module.exports = Pizza;
