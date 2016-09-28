import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import {Timers} from '../../../api/timers/Timers.js';

import '../../partialLayouts/GoalList/GoalList.js';
import '../../partialLayouts/Scorecard/Scorecard.js';
import './TimerNonOwner.html';
import './TimerNonOwner.css';

Template.TimerNonOwner.onCreated(function(){
    var self = this;
    self.countdown = null;

    self.createTimer = function(id, endtime){
        var endTime = endtime;
        var clock = document.getElementById(id);
        var hoursSpan = clock.querySelector('.hours');
        var minutesSpan = clock.querySelector('.minutes');
        var secondsSpan = clock.querySelector('.seconds');
        $('#' + id).show();
        self.countdown = this;
        function updateClock(){
            var t = self.getTimeRemaining(endTime);
            hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
            minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
            secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
            if(t.total<=0){
                clearInterval(timeinterval);
            }
        }

        updateClock(endtime); // run function once at first to avoid delay
        window.timeinterval = setInterval(updateClock, 1000);
    };

    self.getTimeRemaining = function(endtime) {
        var t = endtime - new Date().getTime();
        var seconds = Math.floor( (t/1000) % 60 );
        var minutes = Math.floor( (t/1000/60) % 60 );
        var hours = Math.floor( (t/(1000*60*60)) % 24 );
        var days = Math.floor( t/(1000*60*60*24) );
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    };
    self.autorun(function() {
        self.subscribe('singleTimer', FlowRouter.getParam('username'));
    });
});


Template.TimerNonOwner.onRendered(function() {
    $('.collapsible').collapsible({
        accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
});


Template.TimerNonOwner.helpers({
    UnactiveTimeFormatted() {
        var timer = Timers.findOne();
        if (timer) {
            var t = timer['length'] * 60 * 1000;
            var endTime = timer.timeStarted.getTime() + timer['length'] * 60 * 1000;
            var now = new Date().getTime();

            if (endTime - now < 0) {
                return {
                    'total': 0,
                    'hours': '00',
                    'minutes': '00',
                    'seconds': '00'
                };
            } else {
                var seconds = Math.floor((t / 1000) % 60);
                var minutes = Math.floor((t / 1000 / 60) % 60);
                var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
                return {
                    'total': t,
                    'hours': ('0' + hours).slice(-2),
                    'minutes': ('0' + minutes).slice(-2),
                    'seconds': ('0' + seconds).slice(-2)
                };
            }
        }
    },

    OwnerUsername() {
        return FlowRouter.getParam('username');
    },

    TimerNotRunning() {
        var timer = Timers.findOne();
        if (timer.running) {
            //if a countdown doesnt already exist
            if (Template.instance().countdown == null) {
                //create and start countdown
                Template.instance().createTimer('countdown', timer.timeStarted.getTime() + timer['length'] * 60 * 1000);
            }

            return false;
        }
        if (Template.instance().countdown != null) {
            clearInterval(timeinterval);
            $('#countdown').hide();
            Template.instance().countdown = null;
        }
        return true;
    },

    /**
     * @return {boolean}
     */
    TimerExists() {
        var timer = Timers.findOne();
        if (timer) {
            $('.goal-and-scorecard').show()
            return true;
        } else {
            $('.goal-and-scorecard').hide()
            return false;
        }
    }
});
