if (Meteor.isServer) {

    Router.onBeforeAction(Iron.Router.bodyParser.urlencoded({
        extended: false
    }));

    Router.route('/commitscore', function() {
        var ptoken =  this.request.body.token;
        var pscore =  new Buffer(this.request.body.score, "base64").toString("utf-8");
        Meteor.call('insertPlayerScore', ptoken, pscore);
        this.response.writeHead(302, { 'Location': '/thankyou' });
        this.response.end();
    }, {where: 'server'});

    Meteor.startup(function () {
        Meteor.call('initConfig');
    });


    Meteor.methods({
        /*
        getLeaderboard: function(currentRound) {
            console.log("yada");
            colle = Players.aggregate([
                            {$sort: {score: -1}},
                            {$match: {"round": currentRound}},
                            {$group: { _id: "$email", score: {$max: "$score"}}}
                            ]);
            console.log(colle);
            return colle;
        },*/

        submitRegistrationForm: function(doc) {
            check(doc, Schema.registrationSchema);
            var playerToken = Meteor.uuid();
            return {token: playerToken, doc: doc};
        },

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
                prog: result.doc.prog,
                round: Config.get("roundCounter",0),
                score: 0
            });
        },

        insertPlayerScore: function(rettoken, retscore) {
            var player = Players.findOne({token: rettoken});
            if (player) {
                Players.update (
                    {token: player.token},
                    {
                        email: player.email,
                        name: player.name,
                        round: player.round,
                        prog: player.prog,
                        score: parseInt(retscore)
                    },
                    {upsert: true}
                );
            }
        },

        incrementRoundCounter: function() {
            Config.inc("roundCounter");
        },

        initConfig: function() {
            Config.init("roundCounter");
        }
    });
}
