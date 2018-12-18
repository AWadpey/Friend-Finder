var friendsData = require("../data/friends");

module.exports = function(app) {

    app.get("/api/friends", function(req, res){
        res.json(friendsData);
    });


    //figure out how to set up the body with the new data being entered
    app.post("/api/friends", function(req, res){

    })

}