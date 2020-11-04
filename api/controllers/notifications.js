var notificationsService = require("../services/notification.service");

const errorHandler = (err, res) => {
  console.log(err.message);
  return res.status(500).send({ message: err.message });
};

const listAllNotifications = async (req, res) => {
  try {
    const reuslt = await notificationsService.listAllNotifications();
    res.status(200).send(reuslt);
  } catch (err) {
    errorHandler(err, res);
  }
};

const retrieveNotifications = async (req, res) => {
  let searchQuery = req.query;

  try {
    const reuslt = await notificationsService.retrieveNotifications(
      searchQuery
    );
    res.status(200).send(reuslt);
  } catch (err) {
    errorHandler(err, res);
  }
};

const getUserNotifications = async (req, res) => {
  let userId = req.query._id;

  try {
    const reuslt = await notificationsService.getUserNotifications(
      userId
    );
    res.status(200).send(reuslt);
  } catch (err) {
    errorHandler(err, res);
  }
}

const getAdminNotifications = async (req,res) => {

  try {
    const reuslt = await notificationsService.getAdminNotifications();
    res.status(200).send(reuslt);
  } catch (err) {
    errorHandler(err, res);
  }
}

const getGlobalNotifications = async (req,res) => {

  try {
    const reuslt = await notificationsService.getGlobalNotifications();
    res.status(200).send(reuslt);
  } catch (err) {
    errorHandler(err, res);
  }
}

const createNotification = async (req, res) => {
  let userId= req.body._id;

  try {
    const reuslt = await notificationsService.createUserNotification(
      userId
    );
    res.status(200).send(reuslt);
  } catch (err) {
    errorHandler(err, res);
  }
};

const updateNotification = async (req, res) => {
  let updatedNotification = req.body.notification;
  const id = req.body._id;

  try {
    const reuslt = await notificationsService.updateNotifications(
      id,
      updatedNotification
    );
    res.status(200).send(reuslt);
  } catch (err) {
    errorHandler(err, res);
  }
};

const deleteNotification = async (req, res) => {
  let deletedNotification = req.body.notification;

  try {
    const reuslt = await notificationsService.deleteNotifications(
      deletedNotification
    );
    res.status(200).send(reuslt);
  } catch (err) {
    errorHandler(err, res);
  }
};

// module.exports.notify = function(req, res) {
//   notifyUtil.notify(req);

//   return res.status(200).send({ message: "hello" });
// };

module.exports = {
  createNotification,
  updateNotification,
  deleteNotification,
  retrieveNotifications,
  getUserNotifications,
  getAdminNotifications,
  getGlobalNotifications,
  listAllNotifications
};
