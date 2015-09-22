Schema = {
    registrationSchema: new SimpleSchema({
        name: {
            type: String,
            label: "Namn"
        },
        phonenumber: {
            type: String,
            label: "Telefonnummer"
        },
        email: {
            type: String,
            regEx: SimpleSchema.RegEx.Email,
            label: "E-post"
        },
        prog: {
            type: String,
            label: "Program"
        },
        inriktning: {
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