// Set up a collection to contain player information. On the server,
// it is backed by a MongoDB collection named "players".

if (Meteor.isClient) {
    Router.route("/leaderboard");

    Template.leaderboard.helpers({
        players: function () {
            var currentRound = Config.get("roundCounter", 0);

            return Players.find({round: currentRound, score: {$ne: 0}},{sort: {score: -1}, limit: 5});;
        },

        max3players: function () {
            return Players.find({score: {$ne: 0}},{sort: {score: -1}, limit: 3});
        }
    });

}

