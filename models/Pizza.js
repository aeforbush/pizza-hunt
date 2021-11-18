// importing the Schema constructor and model function
const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String,
      required: 'You need to provide a pizza name.',
      // just like JS .trim() removes white space before and after the input string
      trim: true
    },
    createdBy: {
      type: String,
      required: true,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    size: {
      type: String,
      // can't use a custom string for validate because of the enum array  || must use Mongoose validate option
      required: true,
      enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],
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
      getters: true,
    },
    // id is set to false bc it's a virtual Mongoose returns and we don't need it.
    id: false,
  }
);

// get total count of comments and replies on retrieval || virtuals add more info to db response
PizzaSchema.virtual("commentCount").get(function () {
    // reduce method to tally the total of all comments and replies (using accumulator and a current value)
  return this.comments.reduce(
    (total, comment) => total + comment.replies.length + 1, 0
  );
});

// create the Pizza model using the PizzaSchema
const Pizza = model("Pizza", PizzaSchema);

// export the Pizza model
module.exports = Pizza;
