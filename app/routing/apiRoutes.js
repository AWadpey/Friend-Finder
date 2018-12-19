var friendsData = require("../data/friends");

module.exports = function(app) {

    app.get("/api/friends", function(req, res){
        res.json(friendsData);
    });


    app.post("/api/friends", function(req, res){
        
        var myFriend = req.body;

		for(var i = 0; i < myFriend.scores.length; i++) {
			if(myFriend.scores[i] == "1 - Strongly Disagree") {
				myFriend.scores[i] = 1;
			} else if(myFriend.scores[i] == "5 - Strongly Agree") {
				myFriend.scores[i] = 5;
			} else {
				myFriend.scores[i] = parseInt(myFriend.scores[i]);
			}
		}

		var scoreArray = [];

		for(var i = 0; i < friendsData.length; i++) {

			var scoreComparison = friendsData[i];
			var scoreDifference = 0;
			
			for(var k = 0; k < scoreComparison.scores.length; k++) {
				var differenceOneScore = Math.abs(scoreComparison.scores[k] - myFriend.scores[k]);
				scoreDifference += differenceOneScore;
			}

			scoreArray[i] = scoreDifference;
		}

		var myNewFriend = scoreArray[0];
		var friendIndex = 0;

		for(var i = 1; i < scoreArray.length; i++) {
			if(scoreArray[i] < myNewFriend) {
				myNewFriend = scoreArray[i];
				friendIndex = i;
			}
		}

		friendsData.push(myFriend);

		res.json(friendsData[friendIndex]);
    });

};