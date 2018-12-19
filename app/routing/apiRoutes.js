var friendsData = require("../data/friends.js");

module.exports = function(app) {

    app.get("/api/friends", function(req, res){
        res.json(friendsData);
    });


    app.post("/api/friends", function(req, res){
        
        var myFriend = req.body;

		for(var i = 0; i < myFriend.score.length; i++) {
			if(myFriend.score[i] == "1 - Strongly Disagree") {
				myFriend.score[i] = 1;
			} else if(myFriend.score[i] == "5 - Strongly Agree") {
				myFriend.score[i] = 5;
			} else {
				myFriend.score[i] = parseInt(myFriend.score[i]);
			}
		}

		var scoreArray = [];

		for(var i = 0; i < friendsData.length; i++) {

			var scoreComparison = friendsData[i];
			var scoreDifference = 0;
			
			for(var a = 0; a < scoreComparison.score.length; a++) {
				var differenceOneScore = Math.abs(scoreComparison.score[a] - myFriend.score[a]);
				scoreDifference += differenceOneScore;
			}

			scoreArray[i] = scoreDifference;
		}

		var myNewFriend = scoreArray[0];
		var friendIndex = 0;

		for(var i = 1; i < scoreDifference.length; i++) {
			if(scoreDifference < myNewFriend) {
				myNewFriend = scoreDifference;
				friendIndex = i;
			}
		}

		friendsData.push(myFriend);

		res.json(friendsData[friendIndex]);
    });

};