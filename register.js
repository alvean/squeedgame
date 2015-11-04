if (Meteor.isClient) {
    Router.route("/", function () {
        this.render("register");
    });

    AutoForm.hooks({
        registrationForm: {
            onSuccess: function(formType, result) {
                Meteor.call('insertStudentPlayer', result);

                // Redirect user to game
                // 10.20.30.158:3000/games/88?t=
                window.location = "/commitscore/" + result.token + "/253";
            }
        }
    });

    Template.register.helpers({
        registrationSchema: function() {
            return Schema.registrationSchema;
        }
    });
}

