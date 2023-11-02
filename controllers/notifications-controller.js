const Notification = require("../models/notification");

const NotificationsController = {
  createNotification: async (req, res) => {
    try {
      const { id, recipients, url, text, content, image } = req.body;

      if (recipients.includes(req.user._id.toString())) return;

      const notification = new Notification({
        id,
        recipients,
        url,
        text,
        content,
        image,
        user: req.user._id,
      });

      await notification.save();

      return res.json({ notification });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  removeNotification: async (req, res) => {
    try {
      const notification = await Notification.findOneAndDelete({
        id: req.params.id,
        url: req.query.url,
      });

      return res.json({ notification });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getNotifications: async (req, res) => {
    try {
      const notifications = await Notification.find({
        recipients: req.user._id,
      })
        .sort("-createdAt")
        .populate("user", "avatar username");

      return res.json({ notifications });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  isReadNotification: async (req, res) => {
    try {
      const notifications = await Notification.findOneAndUpdate(
        { _id: req.params.id },
        {
          isRead: true,
        }
      );

      return res.json({ notifications });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteAllNotifications: async (req, res) => {
    try {
      const notifications = await Notification.deleteMany({
        recipients: req.user._id,
      });

      return res.json({ notifications });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = NotificationsController;
