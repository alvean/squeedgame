Router.route('/commitscore/:token/:score', {
    template: 'commitscore',
    data: function(){
        Meteor.call('insertPlayerScore', this.params.token, this.params.score);

    }
});

/*
Router.route('/commitscore/', { where: 'server' })
    .post(function () {
        console.log("apabepa");
        Meteor.call('logit',"POST sucessful");
    });
*/


if (Meteor.isClient) {
    Template.commitscore.events({
        'click .btnsubmitscore': function () {
            Router.go('/');
        }
    });
}



