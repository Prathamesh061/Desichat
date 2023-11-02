const router = require("express").Router();
const posts = require("../controllers/posts-controller");
const authentication = require("../middleware/authentication");

router
  .route("/posts")
  .post(authentication, posts.createPost)
  .get(authentication, posts.getPosts);

router
  .route("/post/:id")
  .patch(authentication, posts.updatePost)
  .get(authentication, posts.getPost)
  .delete(authentication, posts.deletePost);

router.patch("/post/:id/like", authentication, posts.likePost);

router.patch("/post/:id/unlike", authentication, posts.unLikePost);

router.get("/user_posts/:id", authentication, posts.getUserPosts);

router.patch("/savePost/:id", authentication, posts.savePost);

router.patch("/unSavePost/:id", authentication, posts.unSavePost);

router.get("/getSavePosts", authentication, posts.getSavePosts);

module.exports = router;
