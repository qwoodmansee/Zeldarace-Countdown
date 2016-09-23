/**
 * Created by Quinton on 9/22/2016.
 */

//setting up main subscribe to get the timer we need
Template.TimerLayout.onCreated(function(){
   var self = this;
    self.autorun(function() {
        var username = FlowRouter.getParam('username');
        self.subscribe('singleTimer', username);
    })
});

Template.HomeLayout.loggedInUsername = function() {
    if (Meteor.user() != null) {
        return Meteor.user().profile.name;
    }
};

//allow custom template for nav bar button
Template.myAtNavButton.replaces("atNavButton");