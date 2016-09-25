import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import {Timers} from '../../../api/timers/Timers.js';

import '../../partialLayouts/GoalList/GoalList.js';
import './TimerNonOwner.html';
import './TimerNonOwner.css';

Template.TimerNonOwner.onCreated(function(){
    var self = this;

    self.autorun(function() {
        self.subscribe('singleTimer', FlowRouter.getParam('username'));
    });
});

Template.TimerNonOwner.helpers({
    RemainingTimeFormatted() {
        var timer = Timers.findOne();
        if (timer) {
            var t = timer['length'] * 60 * 1000;
            if (timer.running) {
                var endTime = timer.timeStarted.getTime() + timer['length'] * 60 * 1000;
                var now = new Date().getTime();
                t = endTime - now
            }
            var seconds = Math.floor( (t/1000) % 60 );
            var minutes = Math.floor( (t/1000/60) % 60 );
            var hours = Math.floor( (t/(1000*60*60)) % 24 );
            return {
                'total': t,
                'hours': ('0' + hours).slice(-2),
                'minutes': ('0' + minutes).slice(-2),
                'seconds': ('0' + seconds).slice(-2)
            };
        }
    },

    OwnerUsername() {
        return FlowRouter.getParam('username');
    },

    /**
     * @return {boolean}
     */
    TimerExists() {
        var timer = Timers.findOne();
        return !!timer;
    }
});
