Router.route('/game', {
    template:'game',
    path:'/game/:_GameId',
    data: function(){
        gameToken = { _id : this.params._GameId };
        return gameToken;
    }
});
