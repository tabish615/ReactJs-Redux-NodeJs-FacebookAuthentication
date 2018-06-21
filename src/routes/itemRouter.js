var express = require('express');
var app = express();
var itemRouter = express.Router();
var axios = require("axios");
var User = require('../models/User');

itemRouter.route('/').get(function (req, res) {
    console.log(req.headers.asd);

    // Verify Facebook access token

    // first we get App access token
    axios.get(`https://graph.facebook.com/oauth/access_token?client_id=232064780897684&client_secret=3f93548590d82c2e8c93f02929436801&grant_type=client_credentials`,
    ).then(function (appAccessToken) {
        console.log(appAccessToken)

        // Second we get user id
        axios.get(`https://graph.facebook.com/debug_token?input_token=${req.headers.asd}&access_token=${appAccessToken.data.access_token}`)
            .then((userId) => {
                console.log(userId)

                // User Profile
                axios.get(`https://graph.facebook.com/${userId.data.data.user_id}?access_token=${req.headers.asd}&fields=email,name,picture`)
                    .then((userProfile) => {
                        console.log(userProfile)
                        res.send(userProfile.data)
                    }).catch(err => console.log(err))
            }).catch((s) => {
                console.log(s)
            })
    })
        .catch(err => console.log(err))
});

itemRouter.route('/add').post(function (req, res) {
    var user = new User({name:req.body.name,email:req.body.email,id:req.body.id,picture:req.body.picture})
   console.log(req, 'kuch');
    user.save(
        function(error,data){
            if(error){
                res.send({error:error})
            }
            else{
                res.send({data:data})
            }
        })
})


module.exports = itemRouter;