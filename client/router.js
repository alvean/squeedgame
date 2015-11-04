/*
Router.route('/commitscore/', { where: 'server' })
    .post(function () {
        console.log('For great justice!');
        console.log('token: ' + this.params.token + '  score: ' + this.params.score);
        Meteor.call('insertPlayerScore', this.params.token, this.params.score);
    });
*/
/*
Router.map(function () {
  this.route('commitscore', {
    path: "/api/team/new",
    where: "server",
    action: function(){
            if (this.request.method == 'POST') {
              console.log(this.request.body)
            }
       }
  });
});
*/

/*Router.route('/commitscore/:token/:score', function() {
        console.log('apa bepa');
        body = this.request.body;
        // this.response.write(body);
        this.response.end("Call served");


}, {where: 'server'})
*/
/*
Router.route('/commitscore/', {
  where: 'server'
}).post(function() {
  Router.go('/leaderboard');
  Meteor.call('logit', 'apa bepa');
});
*/

/*
Router.route('/commitscore/:token/:score', {
    template: 'commitscore',
    data: function(){
        console.log('For great justice! token: ' + this.params.token + '  score: ' + this.params.score);
        Meteor.call('insertPlayerScore', this.params.token, this.params.score);
    }
});
*/

/*
Router.route('/commitscore/', { where: 'server' })
    .post(function () {
        console.log("apabepa");
        Meteor.call('logit',"POST sucessful");
    });
*/

