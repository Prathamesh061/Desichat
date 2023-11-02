const router = require("express").Router();
const authentication = require("../middleware/authentication");
const notifications = require("../controllers/notifications-controller");

router.post("/notification", authentication, notifications.createNotification);

router.delete(
  "/notification/:id",
  authentication,
  notifications.removeNotification
);

router.get("/notifications", authentication, notifications.getNotifications);

router.patch(
  "/isReadNotification/:id",
  authentication,
  notifications.isReadNotification
);

router.delete(
  "/deleteAllNotification",
  authentication,
  notifications.deleteAllNotifications
);

module.exports = router;
