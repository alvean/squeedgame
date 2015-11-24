if (Meteor.isClient) {
    Router.route("/thankyou", function () {
        this.render("thankyou");
    });
}
