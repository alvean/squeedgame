if (Meteor.isClient) {
    Router.route("/thankyou", function () {
        this.render("thankyou");
    });



    Template.thankyou.events({
        'click .btnsubmitscore': function () {
            Router.go('/');
        }
    });
}
