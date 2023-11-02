const router = require("express").Router();
const authentication = require("../middleware/authentication");
const users = require("../controllers/users-controller");

router.get("/search", authentication, users.searchUser);

router.get("/user/:id", authentication, users.getUser);

router.patch("/user", authentication, users.updateUser);

router.patch("/user/:id/follow", authentication, users.follow);
router.patch("/user/:id/unfollow", authentication, users.unfollow);

router.get("/suggestionsUser", authentication, users.suggestionsUser);

module.exports = router;
