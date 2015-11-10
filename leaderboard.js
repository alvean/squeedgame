// Set up a collection to contain player information. On the server,
// it is backed by a MongoDB collection named "players".

if (Meteor.isClient) {
    Router.route("/leaderboard");

    Template.leaderboard.helpers({
        players: function () {
            var currentRound = Config.get("roundCounter", 0);

            return Players.find({round: currentRound, score: {$gt: 0}},{sort: {score: -1}, limit: 5});;
        }
    });

}

/*


 col = Players.aggregate([
 //{round: currentRound, score: {$gt: 0}},
 {$sort: {score: -1}, limit: 5},
 {$match: {currentRound: currentRound}},
 {$group: {_id: "$email", score: { $max: "$score" }}}
 ]);
    */