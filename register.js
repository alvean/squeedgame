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
            custom: function () {
                if (Meteor.isClient && this.isSet) {
                    var student = Students.findOne({email: this.value});
                    if (student) {
                        var form = $("form#registrationForm");

                        form.find("input[name=name]").val(student.name);
                        form.find("input[name=phone]").val(student.phone);
                        form.find("input[name=prog]").val(student.prog);
                        form.find("input[name=focus]").val(student.focus);
                    }
                }
            },
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
                Meteor.call('insertStudentPlayer', result.data);

                // Redirect user to game
                window.location = "/commitscore/" + result.token;
            }
        }
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
            return {token: playerToken, data: doc};
        }
    });

    Meteor.methods({
        insertStudentPlayer: function(result) {
            console.log(result);

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
                round: 0,
                score: "0"
            });
        }
    });
}