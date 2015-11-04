if (Meteor.isClient) {
    Template.commitscore.events({
        'click .btnsubmitscore': function () {
            Router.go('/');
        }
    });
}
