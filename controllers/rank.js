var Rank = require('../models/rank');

exports.postRanks = function (req, res) {
    var rank = new Rank();
    rank.star = req.body.star;
    rank.user = req.user._id;
    rank.dish = req.body.dish_id;
    rank.save(function (err) {
        if (err)
            res.status(400).json(err);
        else
            res.status(201).json(rank);
    });
};

exports.getRanks = function (req, res) {
    Rank.find(function (err, ranks) {
        if (err)
            res.status(400).json(err);
        else
            res.status(200).json(ranks);
    });
};

exports.getRankFromDish = function (req, res) {
    Rank.find({dish: req.body.dish_id}, function (err, rank) {
        if (err)
            res.status(400).json(err);
        else if (!rank[0])
            res.status(404).end();
        else
            res.status(200).json(rank);
    });
};

exports.getRank = function (req, res) {
    Rank.find({_id: req.params.rank_id}, function (err, rank) {
        if (err)
            res.status(400).json(err);
        else if (!rank[0])
            res.status(404).end();
        else
            res.status(200).json(rank);
    });
};

exports.putRank = function (req, res) {
    Rank.update({_id: req.params.rank_id}, {star: req.body.star}, function (err, num, raw) {
        if (err)
            res.status(400).json(err);
        else
            res.status(204).end();
    });
};

exports.deleteRank = function (req, res) {
    Rank.remove({_id: req.params.rank_id}, function (err) {
        if (err)
            res.status(400).json(err);
        else
            res.status(204).end();
    });
};
