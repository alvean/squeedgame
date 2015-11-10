if (Meteor.isClient) {
    Router.route("/", function () {
        this.render("register");
    });

    AutoForm.hooks({
        registrationForm: {
            onSuccess: function(formType, result) {
                Meteor.call('insertStudentPlayer', result);

                // Redirect user to game
                window.location = "http://www.arcadeforge.io/games/88/?t=" + result.token;
            }
        }
    });

    Template.register.helpers({
        registrationSchema: function() {
            return Schema.registrationSchema;
        }
    });
}

