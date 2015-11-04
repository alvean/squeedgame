/**
 * Created by Alvean on 02/11/2015.
 */
// On server startup, create some players if the database is empty.
if (Meteor.isServer) {
    Meteor.startup(function () {

    });



    // Listen to incoming HTTP requests, can only be used on the server
    WebApp.connectHandlers.use("/commitscore", function(req, res, next) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        return next();
    });


    Meteor.methods({
        submitRegistrationForm: function(doc) {
            check(doc, Schema.registrationSchema);

            var playerToken = Meteor.uuid();
            return {token: playerToken, doc: doc};
        }
    });

    Meteor.methods({
        insertStudentPlayer: function(result) {
            Students.update(
                {email: result.doc.email},
                {
                    name: result.doc.name,
                    phone: result.doc.phone,
                    email: result.doc.email,
                    prog: result.doc.prog,
                    focus: result.doc.focus
                },
                { upsert: true }
            );

            Players.insert({
                email: result.doc.email,
                token: result.token,
                name: result.doc.name,
                round: Config.get("roundCounter"),
                score: 0
            });
        },

        insertPlayerScore: function(rettoken, retscore) {
            var player = Players.findOne({token: rettoken});
            if (player) {
                Players.update (
                    {_id: player._id},
                    {
                        email: player.email,
                        token: player.token,
                        name: player.name,
                        round: player.round,
                        score: retscore
                    },
                    {update: true}
                );
            }
        },

        incrementRoundCounter: function() {
            Config.inc("roundCounter");
        },

        logit: function(mess) {
            console.log(mess);
        }
    });









}