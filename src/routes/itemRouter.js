var express = require('express');
var app = express();
var itemRouter = express.Router();
var axios = require("axios")
itemRouter.route('/').get(function (req, res) {
    console.log(req.headers.asd);
    // res.send(JSON.stringify(req))
    res.send("asd................")

    axios.get(`https://graph.facebook.com/oauth/access_token?client_id=232064780897684&client_secret=3f93548590d82c2e8c93f02929436801&grant_type=client_credentials`,
    ).then(function (a) {
        console.log(a)
        axios.get(`https:// graph.facebook.com/debug_tokeninput_token=${req.headers.asd}&access_token=${a.data.access_token}`).then((e)=>{
            console.log(e)
        }).catch((s)=>{
            console.log(s)
            
        })
    })
        .catch(err => console.log(err))
});


module.exports = itemRouter;