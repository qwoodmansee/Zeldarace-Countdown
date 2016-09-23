/**
 * Created by Quinton on 9/21/2016.
 */

FlowRouter.route('/:username', {
    name: 'timer',
    action(params) {
        console.log("username route called");
        Tracker.autorun(function() {
            if (Meteor.user() != null && Meteor.user().profile.name === params.username) {
                BlazeLayout.render('HomeLayout', {main: 'TimerLayoutOwner', sidebar: 'SidebarLoggedIn'});
            } else if (Meteor.userId()) {
                BlazeLayout.render('HomeLayout', {main: 'TimerLayout', sidebar: 'SidebarLoggedIn'});
            } else {
                BlazeLayout.render('HomeLayout', {main: 'TimerLayout', sidebar: 'SidebarLoggedOut'});
            }
        });
    }
});

FlowRouter.route('/', {
    name: 'index',
    action: function(params) {
        console.log("index route called");
        Tracker.autorun(function() {
            if (!Meteor.userId()) {
                console.log("username check failed");
                BlazeLayout.render('MainLayout', {main:'WelcomeLayout'})
            } else if (Meteor.user() != null) {
                FlowRouter.go('/' + Meteor.user().profile.name);
            }
        });
    }
});

FlowRouter.route('/user/logout', {
    name: 'logout',
    action: function(params) {
        Meteor.logout();
        FlowRouter.go('/');
    }
});