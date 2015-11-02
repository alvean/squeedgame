// Set up a collection to contain player information. On the server,
// it is backed by a MongoDB collection named "players".

if (Meteor.isClient) {
    Router.route("/leaderboard");

    Template.leaderboard.helpers({
        players: function () {
            var currentRound = Config.get("roundCounter", 0);
            return Players.find({round: currentRound}, {sort: {score: -1, name: 1}, limit:5});
        },
        selectedName: function () {
            var player = Players.findOne(Session.get("selectedPlayer"));
            return player && player.name && player.email;
        }
    });

    Template.body.events({
        "submit .new-player": function (event) {
            // Prevent default browser form submit
            event.preventDefault();

            // Get value from form element
            var text = event.target.text.value;

            if (text != "") {
                // Insert a task into the collection
                Players.insert({
                    name: text,
                    score: 0
                });

                // Clear form
                event.target.text.value = "";
            }
        }
    });
}


