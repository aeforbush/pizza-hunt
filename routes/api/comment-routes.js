const router = require("express").Router();
const {
  addComment,
  removeComment,
  addReply,
  removeReply,
} = require("../../controllers/comment-controller");

// /api/comments/:pizzaId
router.route("/:pizzaId")
.post(addComment);

// callback function fo a route has req, res as parameters so explicit arugments are unecessary
// /api/comments/:pizzaId/:commentId
router.route("/:pizzaId/:commentId")
.put(addReply)
.delete(removeComment);

// using  RESTful so we include the parent resources in the endpoint; kind of like saying "go to this pizza, look at this comment and delete this one reply"
router.route("/:pizzaId/:commentId/:replyId")
.delete(removeReply);

module.exports = router;
