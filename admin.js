Router.route("/admin");

if (Meteor.isClient) {
    Template.admin.helpers({
        currentRoundPlayers: function () {
            var currentRound = Config.get("roundCounter", 0);
            return Players.find({round: currentRound}, {sort: {score: -1, name: 1}, limit:5});
        },
        previousRoundPlayers: function () {
            var previousRound = Config.get("roundCounter", 0) - 1;
            if (previousRound > -1) {
                return Players.find({round: previousRound}, {sort: {score: -1, name: 1}, limit:5});
            }
        },
        currentRound: function () {
            return Config.get("roundCounter", 0);
        }
    });

    Template.leaderboard.events({
        'click .incRound': function () {
            Config.inc("roundCounter");
        }
    });
}
