/**
 * Created by Quinton on 9/21/2016.
 */

FlowRouter.route('/home', {
   name: 'home',
    action() {
       BlazeLayout.render('HomeLayout');
    }
});

FlowRouter.route('/', {
    name: 'index',
    action: function(params) {
        Meteor.logout();
        Tracker.autorun(function() {
            if (!Meteor.userId()) {
                BlazeLayout.render('MainLayout', {main:'WelcomeLayout'})
            } else {
                BlazeLayout.render('HomeLayout', {main: 'TimerLayout'})
            }
        });
    }
});
