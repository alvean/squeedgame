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
        }
    })
};