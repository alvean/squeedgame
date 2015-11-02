Router.route('/commitscore/:token/:score', {
    template: 'commitscore',
    data: function(){
        //console.log(this.params.token + " " + this.params.score);
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


Template.commitscore.helpers ({
    adrtoken: function(){
    return window.location.pathname;
    }
});