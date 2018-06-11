var express = require('express');
var app = express();
var itemRouter = express.Router();

itemRouter.route('/').get(function (req, res) {
    console.log(req.headers);
    // res.send(JSON.stringify(req))
    res.send("asd................")
});

module.exports = itemRouter;