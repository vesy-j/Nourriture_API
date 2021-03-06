var Notification = require('../models/notification');

exports.getNotifications = function (req, res) {
    Notification.find(function (err, Notifications) {
        if (err)
            res.status(400).json(err);
        else
            res.status(200).json(Notifications);
    });
};
/* delete  getNotifications delete (droit )*/
exports.getMyNotifications = function (req, res) {
    Notification.find({user: req.user._id}, function (err, Notifications) {
        if (err)
            res.status(400).json(err);
        else
            res.status(200).json(Notifications);
    });
};

exports.getMyUnreadNotifications = function (req, res) {
    Notification.find({user: req.user._id, read: false}, function (err, Notifications) {
        if (err)
            res.status(400).json(err);
        else
            res.status(200).json(Notifications);
    });
};

exports.readNotification = function (req, res) {
    Notification.update({
        _id: req.body.notification_id,
        user: req.user._id,
        read: false
    }, {read: true}, function (err, num, raw) {
        if (err)
            res.status(400).json(err);
        else
            res.status(204).end();
    });
};

/*exports.getNotification = function (req, res) {
 Notification.find({_id: req.params.Notification_id}, function (err, Notification) {
 if (err)
 res.status(400).json(err);
 else if (!Notification)
 res.status(404).end();
 else
 res.status(200).json(Notification);
 });
 };*/

exports.putNotification = function (req, res) {
    Notification.update({_id: req.params.notification_id, user: req.user._id}, {
        content: req.body.content,
        read: req.body.read
    }, function (err, num, raw) {
        if (err)
            res.status(400).json(err);
        else
            res.status(204).end();
    });
};

/*
 exports.deleteNotification = function (req, res) {
 Notification.remove({user: req.user._id, _id: req.params.Notification_id}, function (err) {
 if (err)
 res.status(400).json(err);
 else
 res.status(204).end();
 });
 };*/
