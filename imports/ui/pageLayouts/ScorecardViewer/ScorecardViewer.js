/**
 * Created by qwoodmansee on 1/19/2017.
 */

import './ScorecardViewer.html';
import './ScorecardViewer.css';
import '../../partialLayouts/Scorecard/Scorecard.js';
import {PageViewers} from '../../../api/pageViewers/PageViewers.js';

Template.ScorecardViewer.onCreated(function() {
    var self = this;

    self.timerViewers = new ReactiveVar([]);

    if (FlowRouter.getParam("timerOwner") != undefined && FlowRouter.getParam("timerOwner") != null
        && FlowRouter.getParam("scorecardOwner") != "" && FlowRouter.getParam("scorecardOwner") == undefined) {
        // if we are on a timer with no specific racer's scorecard selected
        self.subscribe('singleTimer', FlowRouter.getParam('timerOwner'));
        self.subscribe('pageViewers', {
            onReady: function () {
                if (Meteor.userId()) {
                    var viewers = PageViewers.find({
                        ownerUsername: FlowRouter.getParam('timerOwner'),
                    });

                    if (viewers != null) {
                        viewers = viewers.fetch();

                        self.timerViewers.set(viewers);
                    }
                }
            }
        });
    } else if (FlowRouter.getParam("timerOwner") != undefined && FlowRouter.getParam("timerOwner") != null
        && FlowRouter.getParam("scorecardOwner") != "" && FlowRouter.getParam("scorecardOwner") != undefined) {
        // if we are on a timer with a specific racer's scorecard selected
        self.subscribe('singleTimer', FlowRouter.getParam('timerOwner'));
        self.subscribe('pageViewers', {
            onReady: function () {
                if (Meteor.userId()) {
                    var viewers = PageViewers.find({
                        ownerUsername: FlowRouter.getParam('timerOwner'),
                        username: FlowRouter.getParam('scorecardOwner')
                    });

                    if (viewers != null) {
                        viewers = viewers.fetch();
                        self.timerViewers.set(viewers);
                    }
                }
            }
        });
    }
});
Template.ScorecardViewer.helpers({
    ViewerIsOwner() {
        if (Meteor.user()) {
            return FlowRouter.getParam('timerOwner') === Meteor.user().profile.name;
        } else {
            return false;
        }
    },

    ScorecardOwner() {
        return FlowRouter.getParam('scorecardOwner')
    },

    TimerOwner() {
        return FlowRouter.getParam('timerOwner')
    },

    viewers() {
        return Template.instance().timerViewers.get();
    }
});

Template.ScorecardViewer.onRendered(function () {
    $('.collapsible').collapsible({});
});
