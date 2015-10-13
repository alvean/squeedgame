// Set up a collection to contain player information. On the server,
// it is backed by a MongoDB collection named "players".

if (Meteor.isClient) {
    Router.route("/leaderboard");

    Template.leaderboard.helpers({
        players: function () {
            return Players.find({}, {sort: {score: -1, name: 1}});
        },
        selectedName: function () {
            var player = Players.findOne(Session.get("selectedPlayer"));
            return player && player.name;
        },
        topScore: function() {
            return Players.findOne({}, {sort: {score: -1, name: 1}});
        }
    });

    Template.leaderboard.events({
        'click .inc': function () {
            Players.update(Session.get("selectedPlayer"), {$inc: {score: 5}});
        }
    });

    Template.leaderboard.events({
        'click .killify': function () {
            Meteor.call('removeAllPosts')
        }
    });

    Template.player.helpers({
        selected: function () {
            return Session.equals("selectedPlayer", this._id) ? "selected" : '';
        }
    });

    Template.player.events({
        'click': function () {
            Session.set("selectedPlayer", this._id);
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

// On server startup, create some players if the database is empty.
if (Meteor.isServer) {
    Meteor.startup(function () {
        if (Players.find().count() === 0) {
            var names = ["Ada Lovelace", "Grace Hopper", "Marie Curie",
                "Carl Friedrich Gauss", "Nikola Tesla", "Claude Shannon"];
            _.each(names, function (name) {
                Players.insert({
                    name: name,
                    round: 0,
                    score: Math.floor(Random.fraction() * 10) * 5
                });
            });
        }
    });
}
