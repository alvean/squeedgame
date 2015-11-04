if (Meteor.isServer) {

    Router.onBeforeAction(Iron.Router.bodyParser.urlencoded({
        extended: false
    }));

    Router.route('/commitscore', function() {
        body = this.request.body;
        console.log("Commit score for token: " + body.token + " Score: "  + body.score);
        this.response.write("token: " + body.token + "  Score: " + body.score);
        this.response.end("Call served");
        Meteor.call('insertPlayerScore', this.request.body.token, this.request.body.score);
    }, {where: 'server'});


    Meteor.startup(function () {
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
                round: Config.get("roundCounter",0),
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
                        score: parseInt(retscore)
                    },
                    {update: true}
                );
            }
        },

        incrementRoundCounter: function() {
            Config.inc("roundCounter");
        }
    });
}
