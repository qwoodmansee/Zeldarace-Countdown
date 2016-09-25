/**
 * VM for any page which uses the standard application layout
 * Created by Quinton on 9/24/2016.
*/

import './AppLayout.html';
import './AppLayout.css';

//setting up main subscribe to get the timer we need
Template.AppLayout.onCreated(function(){
    var self = this;
    self.autorun(function() {
        var username = FlowRouter.getParam('username');
        self.subscribe('singleTimer', username);
    })
});

Template.AppLayout.helpers({
    loggedInUsername() {
        if (Meteor.user() != null) {
            return Meteor.user().profile.name;
        }
    },
    ownerUsername() {
        return FlowRouter.getParam('username');
    }

});
