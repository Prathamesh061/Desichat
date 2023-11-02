const router = require("express").Router();
const messages = require("../controllers/messages-controller");
const authentication = require("../middleware/authentication");

router.post("/message", authentication, messages.createMessage);

router.get("/conversations", authentication, messages.getConversations);

router.get("/message/:id", authentication, messages.getMessages);

router.delete("/message/:id", authentication, messages.deleteMessages);

router.delete("/conversation/:id", authentication, messages.deleteConversation);

module.exports = router;
