/**
 * Created by Quinton on 9/21/2016.
 */

FlowRouter.route('/:username', {
    name: 'timer',
    action(params) {
        if (Meteor.userId() != null && Meteor.user().profile.name === params.username) {
            BlazeLayout.render('HomeLayout', {main: 'TimerLayoutOwner', sidebar: 'SidebarLoggedIn'});
        } else if (Meteor.userId()) {
            BlazeLayout.render('HomeLayout', {main: 'TimerLayout', sidebar: 'SidebarLoggedIn'});
        } else {
            BlazeLayout.render('HomeLayout', {main: 'TimerLayout', sidebar: 'SidebarLoggedOut'});
        }
    }
});

FlowRouter.route('/', {
    name: 'index',
    action: function(params) {
        Tracker.autorun(function() {
            if (!Meteor.userId()) {
                BlazeLayout.render('MainLayout', {main:'WelcomeLayout'})
            } else {
                FlowRouter.go('/' + Meteor.user().profile.name);
            }
        });
    }
});

FlowRouter.route('/dev/logout', {
    name: 'logout',
    action: function(params) {
        Meteor.logout();
        FlowRouter.go('/');
    }
});