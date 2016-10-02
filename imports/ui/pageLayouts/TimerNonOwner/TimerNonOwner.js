import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import {Timers} from '../../../api/timers/Timers.js';
import {PageViewers} from '../../../api/pageViewers/PageViewers.js';


import '../../partialLayouts/GoalList/GoalList.js';
import '../../partialLayouts/Scorecard/Scorecard.js';
import './TimerNonOwner.html';
import './TimerNonOwner.css';

Template.TimerNonOwner.onCreated(function(){
    var self = this;
    self.countdown = null;

    //these reactives act as observables that are changed when the timer changes
    self.timerExists = new ReactiveVar(false);
    self.timerRunning = new ReactiveVar(false);
    self.timerStartTime = new ReactiveVar(null);
    self.timerLength = new ReactiveVar(null);

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
        self.subscribe('singleTimer', FlowRouter.getParam('username'), {
            onReady: function() {
                // this will be final now since singleTimer's on ready has been called
                var timer = Timers.findOne();

                if (timer) {
                    //initialize reactives to initial timer value
                    self.timerExists.set(true);
                    self.timerRunning.set(timer['running']);
                    self.timerLength.set(timer['length']);
                    if (self.timerRunning.get() === true) {
                        self.timerStartTime.set(timer['timeStarted']);
                        // create and start countdown
                        self.createTimer('countdown', self.timerStartTime.get().getTime() + self.timerLength.get() * 60 * 1000);

                    } else {
                        self.timerStartTime.set(null);
                    }
                }

                //subscribe to pageViewers and make sure if you aren't added to it yet to add yourself
                self.subscribe('pageViewers', {
                    onReady: function() {
                        var viewers = null;
                        //logged in users get a pageViewer entry/are tracked on page
                        if (Meteor.userId()) {
                            //get pageviewers table
                            viewers = PageViewers.findOne({username: Meteor.user().profile.name, ownerUsername: FlowRouter.getParam('username')});

                            //create a viewer object to insert into the db
                            var requiredGoals = [];
                            if (timer) {
                                for (var i = 0; i < timer.goals.length; i++) {
                                    if (timer.goals[i].required) {
                                        requiredGoals.push(i);
                                    }
                                }

                                //basically perform a client side upsert - have to work around since this is untrusted code
                                if (!viewers) {
                                    //if none existing, create a page viewer to go into the table
                                    var newPageViewer = {
                                        username: Meteor.user().profile.name,
                                        ownerUsername: FlowRouter.getParam('username'),
                                        timerId: timer.owner,
                                        score: 0,
                                        goalsSelected: requiredGoals
                                    };
                                    PageViewers.insert(newPageViewer);


                                } else {
                                    //already exists, just update
                                    PageViewers.update(viewers._id, {
                                        $set: {'score': 0, 'goalsSelected': requiredGoals}
                                    });
                                }

                                //update viewers variable for observe timer function to use
                                viewers = PageViewers.findOne({username: Meteor.user().profile.name, ownerUsername: FlowRouter.getParam('username')});

                            }
                        }

                        //set up a function to be called whenever the timer is updated
                        var query = Timers.find();
                        var handle = query.observeChanges({
                           changed: function(id, fields) {

                               if (fields['running'] === true) {
                                   // timer started
                                   self.timerRunning.set(true);
                                   self.timerStartTime.set(fields['timeStarted']);

                                   // create and start countdown
                                   self.createTimer('countdown', self.timerStartTime.get().getTime() + self.timerLength.get() * 60 * 1000);


                               } else if (fields['running'] === false) {

                                   if (fields.hasOwnProperty('goals')) {
                                       // new timer from existing running timer
                                       self.timerRunning.set(false);
                                       self.timerStartTime.set(null);
                                       self.timerLength.set(fields['length']);
                                       clearInterval(timeinterval);
                                       $('#countdown').hide();

                                   } else {
                                       // timer ended (hit 00:00:00) - this actually might not happen
                                       self.timerRunning.set(false);
                                       clearInterval(timeinterval);
                                       $('#countdown').hide();
                                   }
                               }

                               if (fields.hasOwnProperty('goals')) {
                                   // new timer from non started timer
                                   self.timerStartTime.set(null);
                                   self.timerLength.set(fields['length']);
                               }
                           }
                        });
                    }
                });

                //if timer doesn't exist must tell page and hide timer specific things
                if (timer) {
                    self.timerExists.set(true);
                    $('.goal-and-scorecard').show();
                } else {
                    self.timerExists.set(false);
                    $('.goal-and-scorecard').hide();
                }
            }
        });
    });
});

Template.TimerNonOwner.onRendered(function() {
    $('.collapsible').collapsible({});

});


Template.TimerNonOwner.helpers({
    UnactiveTimeFormatted() {
        var timerLength = Template.instance().timerLength.get();
        if (timerLength && !Template.instance().timerStartTime.get()) {
            var t = timerLength * 60 * 1000;
            var seconds = Math.floor((t / 1000) % 60);
            var minutes = Math.floor((t / 1000 / 60) % 60);
            var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
            return {
                'total': t,
                'hours': ('0' + hours).slice(-2),
                'minutes': ('0' + minutes).slice(-2),
                'seconds': ('0' + seconds).slice(-2)
            };
        } else {
            return {
                'total': 0,
                'hours': '00',
                'minutes': '00',
                'seconds': '00'
            };
        }
    },

    OwnerUsername() {
        return FlowRouter.getParam('username');
    },

    TimerNotRunning() {
        return !Template.instance().timerRunning.get();
    },

    TimerExists() {
        return Template.instance().timerExists.get();
    }
});
