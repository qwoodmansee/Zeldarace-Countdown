/**
 * Setting up routing between all pages in the application
 * Created by Quinton on 9/21/2016.
 */

import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

//base templates
import '../../ui/baseLayouts/AppLayout/AppLayout.js';
import '../../ui/baseLayouts/MainLayout/MainLayout.js';
import '../../ui/baseLayouts/PopoutLayout/PopoutLayout.js';
//page layouts
import '../../ui/pageLayouts/TimerNonOwner/TimerNonOwner.js';
import '../../ui/pageLayouts/TimerOwner/TimerOwner.js';
import '../../ui/pageLayouts/ScorecardViewer/ScorecardViewer.js';
import '../../ui/pageLayouts/Welcome/Welcome.js';
import '../../ui/pageLayouts/ActiveRaceList/ActiveRaceList.js';


//partial layouts
import '../../ui/partialLayouts/SidebarLoggedIn/SidebarLoggedIn.js';
import '../../ui/partialLayouts/SidebarLoggedOut/SidebarLoggedOut.js';


FlowRouter.route('/currentRaces', {
    name: 'currentRaces',
    action: function() {
        BlazeLayout.render('MainLayout', {main:'ActiveRaceList'})
    }
});

FlowRouter.route('/:timerOwner/scorecard/:scorecardOwner', {
    name: 'scorecardView',
        action(params) {
            Tracker.autorun(function() {
                if (Meteor.user() != null) {
                    BlazeLayout.render('PopoutLayout', {main: 'ScorecardViewer', navbar: 'SidebarLoggedIn'});
                } else {
                    BlazeLayout.render('PopoutLayout', {main: 'ScorecardViewer', navbar: 'SidebarLoggedOut'});
                }
            });
        }
});
FlowRouter.route('/:timerOwner/scorecards', {
    name: 'scorecardView',
        action(params) {
            Tracker.autorun(function() {
                if (Meteor.user() != null) {
                    BlazeLayout.render('PopoutLayout', {main: 'ScorecardViewer', navbar: 'SidebarLoggedIn'});
                } else {
                    BlazeLayout.render('PopoutLayout', {main: 'ScorecardViewer', navbar: 'SidebarLoggedOut'});
                }
            });
        }
});

FlowRouter.route('/:username', {
    name: 'timer',
    action(params) {
        Tracker.autorun(function() {
            if (Meteor.user() != null && Meteor.user().profile.name === params.username) {
                BlazeLayout.render('AppLayout', {main: 'TimerOwner', navbar: 'SidebarLoggedIn'});
            } else if (Meteor.userId()) {
                BlazeLayout.render('AppLayout', {main: 'TimerNonOwner', navbar: 'SidebarLoggedIn'});
            } else {
                BlazeLayout.render('AppLayout', {main: 'TimerNonOwner', navbar: 'SidebarLoggedOut'});
            }
        });
    }
});

FlowRouter.route('/', {
    name: 'index',
    action: function(params) {
        Tracker.autorun(function() {
            if (!Meteor.userId()) {
                BlazeLayout.render('MainLayout', {main:'WelcomeLayout'})
            } else if (Meteor.user() != null) {
                FlowRouter.go('/' + Meteor.user().profile.name);
            }
        });
    }
});

FlowRouter.route('/user/logout', {
    name: 'logout',
    action: function(params, queryParams) {
        Meteor.logout();
        FlowRouter.go('/' + queryParams['redir']);
    }
});

