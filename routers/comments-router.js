const router = require("express").Router();
const comments = require("../controllers/comments-controller");
const authentication = require("../middleware/authentication");

router.post("/comment", authentication, comments.createComment);

router.patch("/comment/:id", authentication, comments.updateComment);

router.patch("/comment/:id/like", authentication, comments.likeComment);

router.patch("/comment/:id/unlike", authentication, comments.unLikeComment);

router.delete("/comment/:id", authentication, comments.deleteComment);

module.exports = router;
