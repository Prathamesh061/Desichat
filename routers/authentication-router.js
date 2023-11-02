const router = require("express").Router();
const auth = require("../controllers/authentications-controller");

router.post("/register", auth.register);

router.post("/login", auth.login);

router.post("/logout", auth.logout);
router.post("/refresh_token", auth.generateAccessToken);

module.exports = router;
