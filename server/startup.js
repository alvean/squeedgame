/**
 * Created by Alvean on 02/11/2015.
 */
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