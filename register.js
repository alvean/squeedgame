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
            label: "Elektronisk brefadress"
        },
        prog: {
            type: String,
            label: "Inriktning, examen"
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
                window.location = "/game/" + result.token;
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