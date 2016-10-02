/**
 * Created by Quinton on 9/23/2016.
 */

import './SidebarLoggedIn.html';
import './SidebarLoggedIn.css';

Template.SidebarLoggedIn.helpers({
    loggedInUsername() {
        if (Meteor.user() != null) {
            return Meteor.user().profile.name;
        }
    },

    OwnerUsername() {
        return FlowRouter.getParam('username');
    },

    currentTimerOwner() {
        if (Meteor.user() != null) {
            return Meteor.user().profile.name == FlowRouter.getParam('username');
        }
    }
});
