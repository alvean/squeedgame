Schema = {
    registrationSchema: new SimpleSchema({
        name: {
            type: String,
            label: "Namn"
        },
        phone: {
            type: String,
            label: "Telefonnummer"
        },
        email: {
            type: String,
            regEx: SimpleSchema.RegEx.Email,
            label: "Email"
        },
        prog: {
            type: String,
            label: "Program"
        },
        focus: {
            type: String,
            label: "Inriktning, examensår"
        },
    })
};

if (Meteor.isClient) {
    Router.route("/", function () {
        this.render("register");
    });

    AutoForm.hooks({
        registrationForm: {
            onSuccess: function(formType, result) {
                // Redirect user to game
                window.location = "/commitscore/" + result.token;
                Students.insert({
                   name: result.name,
                   phone: result.phone,
                   email: result.email,
                   prog: result.prog,
                   focus: result.focus

                });

                Players.insert({
                    email: result.email,
                    token: result.token,
                    round: roundCounter,
                    score: "0"
                });
            }
        },
    });

    Template.register.helpers({
        registrationSchema: function() {
            return Schema.registrationSchema;
        },
    });
}

if (Meteor.isServer) {
    Meteor.methods({
        submitRegistrationForm: function(doc) {
            check(doc, Schema.registrationSchema);

            var playerToken = Meteor.uuid();
            return {token: playerToken};
        }
    });
}