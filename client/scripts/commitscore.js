Router.route('/commitscore/:someParameter/:otherParameter', {
    template: 'commitscore',
    data: function(){
        console.log(this.params.someParameter + " " + this.params.otherParameter);
        
    }
});

Template.commitscore.helpers ({
    adrtoken: function(){
    return window.location.pathname;
    }
});