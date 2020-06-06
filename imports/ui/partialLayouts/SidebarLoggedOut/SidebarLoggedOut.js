/**
 * Created by Quinton on 9/24/2016.
 */

import './SidebarLoggedOut.html'
import './SidebarLoggedOut.css'

Template.SidebarLoggedOut.helpers({
    OwnerUsername() {
        return FlowRouter.getParam('username');
    }
});

Template.SidebarLoggedOut.events({
    'click #twitch-login-link' : function() {
        Meteor.loginWithTwitch({requestPermissions: ['user_read']}, function (err) {
            if (err) console.log('login failed: ' + err)
        });
    }
});