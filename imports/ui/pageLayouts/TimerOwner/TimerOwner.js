/**
 * Created by Quinton on 9/23/2016.
 */
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import {Timers} from '../../../api/timers/Timers.js';
import {PageViewers} from '../../../api/pageViewers/PageViewers.js';
import {ItemList} from '../../../helpers/ItemList.js';


import '../../partialLayouts/GenerateTimerModal/GenerateTimerModal.js';
import '../../partialLayouts/GoalList/GoalList.js';
import '../../partialLayouts/Scorecard/Scorecard.js';
import './TimerOwner.html';
import './TimerOwner.css';

Template.TimerOwner.onCreated(function(){
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
                hoursSpan.innerHTML = ('00');
                minutesSpan.innerHTML = ('00');
                secondsSpan.innerHTML = ('00' + "  [Complete]");
                if (typeof timeinterval != 'undefined') {
                    clearInterval(timeinterval);
                }
                //var originalTimer = Timers.findOne({ownerId: Meteor.userId()});
                //Timers.update(originalTimer._id, {$set: {'running': false}});
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
        var timeObj = {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
        Session.set("currentTimerRemaining" , timeObj);
        return timeObj;
    };

    self.tempSub = self.subscribe("timers", {
        onReady: function() {
            //if there is no timer for the user
            if (Timers.find({owner: FlowRouter.getParam('username')}).count() === 0) {
                //get an item list for the first timer
                var itemList = new ItemList();
                var itemsChosen = itemList.generateMultiItemChoices();
                //create a timer object to insert into the db
                var newTimer = {
                    ownerId: Meteor.userId(),
                    owner: FlowRouter.getParam('username'),
                    running: false,
                    timeStarted: new Date(),
                    length: 60,
                    goals: [],
                    goalsRequired: 0,
                    weights: {active:false},
                    randomItems: itemsChosen
                };
                Timers.insert(newTimer);
            }
            self.tempSub.stop();
        }
    });

    self.autorun(function() {
        self.subscribe('singleTimer', FlowRouter.getParam('username'));
        //subscribe to pageViewers and make sure if you aren't added to it yet to add yourself
        self.subscribe('pageViewers', {
            onReady: function() {
                var viewers = null;
                var timer = Timers.findOne({owner: FlowRouter.getParam('username')});

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

                        // initialize an array to hold the values of collected items, hearts, skulls, and rupees
                        scorecardValues = new Array(65);
                        for (var i=0; i < 66; i++) {
                            scorecardValues[i] = 0
                        }
                        scorecardValues[63] = 3 // hearts start at 3

                        //basically perform a client side upsert - have to work around since this is untrusted code
                        if (!viewers) {
                            //if none existing, create a page viewer to go into the table

                            var newPageViewer = {
                                username: Meteor.user().profile.name,
                                ownerUsername: FlowRouter.getParam('username'),
                                score: 0,
                                currentlyRacing: false,
                                scorecardValues: scorecardValues
                            };
                            PageViewers.insert(newPageViewer);


                        } else {
                            //already exists, just update
                            PageViewers.update(viewers._id, {
                                $set: {'score': 0, 'currentlyRacing': false, 'scorecardValues': scorecardValues}
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
                                Session.set('goals', fields['goals']);
                                //if this is false the timer is the same length as before
                                if (fields.hasOwnProperty('length')) {
                                    self.timerLength.set(fields['length']);
                                }
                                clearInterval(timeinterval);
                                $('#countdown').hide();

                            } else if (fields.hasOwnProperty('running')) {
                                // timer was reset
                                // new timer from non started timer
                                self.timerStartTime.set(null);
                                self.timerRunning.set(false);
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
                            Session.set('goals', fields['goals']);

                            //if this is false the timer is the same length as before
                            if (fields.hasOwnProperty('length')) {
                                self.timerLength.set(fields['length']);
                            }
                        }
                    }
                });

                Tracker.autorun(function() {
                    var score = Session.get("score");
                    if (viewers) {
                        PageViewers.update(viewers._id, {
                            $set: {'score': score}
                        });
                    }
                });
            }
        });
    });
});


Template.TimerOwner.onRendered(function() {
    //must move the modal to body so it can sit on top of everything else
    $('.modal-trigger').leanModal();
    $("#generateModal").appendTo("body");

    //hide to my timer button cause it's not needed on owner's page
    $('#to-my-timer').hide();

    $('select').material_select();
    $('.collapsible').collapsible({
    });
});

Template.TimerOwner.helpers({
    TimerRunning() {
        return Template.instance().timerRunning.get();
    },

    UnactiveTimeFormatted() {
        var timerLength = Template.instance().timerLength.get();
        if (timerLength && !Template.instance().timerStartTime.get()) {
            var t = timerLength * 60 * 1000;
            var seconds = Math.floor((t / 1000) % 60);
            var minutes = Math.floor((t / 1000 / 60) % 60);
            var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
            Session.set("currentTimerRemaining" ,
                {'hours': ('0' + hours).slice(-2),
                    'minutes': ('0' + minutes).slice(-2),
                    'seconds': ('0' + seconds).slice(-2)});

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

    PageViewers() {
        var viewers = PageViewers.find({ownerUsername: FlowRouter.getParam('username')});
        viewers = viewers.fetch();
        //return viewers sorted by score
        return viewers.sort(function(a,b) {
            return parseInt(b.score) - parseInt(a.score);
        })
    },

    CurrentlyRacing() {
        //get pageviewers table
        var viewer = PageViewers.findOne({username: Meteor.user().profile.name, ownerUsername: FlowRouter.getParam('username')});
        if (viewer) {
            return viewer.currentlyRacing;
        }
    }
});

Template.TimerOwner.events({
   'click #timer-start-button': function() {
       var originalTimer = Timers.findOne({ownerId: Meteor.userId()});
       Timers.update(originalTimer._id, {$set: {'timeStarted': new Date(), 'running': true}});
   },

   'click #timer-reset-button': function() {
       var originalTimer = Timers.findOne({ownerId: Meteor.userId()});
       Timers.update(originalTimer._id, {$set: {'running': false}});
   },

   'click #join-race-button': function() {
       if (Meteor.userId()) {
           //get pageviewers table
           var viewer = PageViewers.findOne({username: Meteor.user().profile.name, ownerUsername: FlowRouter.getParam('username')});
           if (viewer) {
               PageViewers.update(viewer._id, {
                   $set: {'score': Session.get('score'), 'currentlyRacing': true}
               });
           }
       }
   },

   'click #leave-race-button': function() {
       if (Meteor.userId()) {
           //get pageviewers table
           var viewer = PageViewers.findOne({username: Meteor.user().profile.name, ownerUsername: FlowRouter.getParam('username')});
           if (viewer) {
               PageViewers.update(viewer._id, {
                   $set: {'score': Session.get('score'), 'currentlyRacing': false}
               });
           }
       }
   },

    'click .remove-user': function(e) {
        // Instead of using $(this), you can do:
        var $this = $(e.target);
        var userToRemove = $this[0].id.substring(0, $this[0].id.length - 14);
        var viewers = PageViewers.findOne({username: userToRemove, ownerUsername: FlowRouter.getParam('username')});

        if (viewers) {
            PageViewers.update(viewers._id, {
                $set: {'currentlyRacing': false}
            });
        }
    }
});

