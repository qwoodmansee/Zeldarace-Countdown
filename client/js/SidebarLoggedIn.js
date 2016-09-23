/**
 * Created by Quinton on 9/23/2016.
 */
Template.SidebarLoggedIn.helpers({
    loggedInUsername() {
        if (Meteor.user() != null) {
            return Meteor.user().profile.name;
        }
    }
});
