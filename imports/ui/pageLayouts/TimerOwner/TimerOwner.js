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
                                scorecardValues: scorecardValues,
                                isReady: false
                            };
                            PageViewers.insert(newPageViewer);


                        } else {
                            //already exists, just update
                            PageViewers.update(viewers._id, {
                                $set: {'score': 0, 'currentlyRacing': false, 'scorecardValues': scorecardValues, 'isReady': false}
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
    },

    'click #popout-stream-layout-open': function() {
        var requiredGoalObjects = $('.required');

        if (!$('#popout-stream-layout-open').hasClass('disabled')) {

            var popout = new Popout({
                template : 'StreamLayoutPopout',
                on : 'popoutStreamLayoutSessionVar',
                win : true,
                width: 960,
                height: 525,
                context : {
                    goals: requiredGoalObjects,
                    goalsCompleted: Template.instance().completedGoals,
                    itemMenuGridRows: Template.instance().itemMenuGridRows,
                    EquipMenuGridRows: Template.instance().EquipMenuGridRows,
                    SongGridRows: Template.instance().SongGridRows,
                    MedallionAndExtraGridRows: Template.instance().MedallionAndExtraGridRows,
                    numHeartContainers: Template.instance().numHeartContainers,
                    numGoldSkulls: Template.instance().numGoldSkulls,
                    numRupees: Template.instance().numRupees
                }
            });

            popout.show();
            $('#popout-stream-layout-open').addClass('disabled');
        } else {
            Session.set('createWindowSessionVar', true);
        }

    }
});


//popout logic
Template.StreamLayoutPopout.onCreated(function() {
    var self = this;

});

Template.StreamLayoutPopout.helpers({
    goals() {
        return Session.get('goals');
    },

    timer() {
        var time = Session.get('currentTimerRemaining');
        if (time.seconds != 0 || time.minutes != 0 || time.hours != 0 ) {
            return {
                'hours': ('0' + time.hours).slice(-2),
                'minutes': ('0' + time.minutes).slice(-2),
                'seconds': ('0' + time.seconds).slice(-2)
            };
        } else {
            return {
                'hours': '00',
                'minutes': '00',
                'seconds': '00',
            }
        }

    },
    Score() {
        return Session.get('score');
    },

    numGoalsComplete() {
        var goals = Session.get('goals');
        return goals.filter(function(obj){return obj.complete}).length;
    },

    numGoalsRequired() {
        return Session.get("numGoalsRequired");
    }
});

Template.StreamLayoutPopout.events({
    'click .streamcard-goal': function(event) {
        //get the number of complete goals
        var numGoalsComplete = $('.complete').length;
        var numGoalsTotal =  Session.get('goals').length;
        var numPrechosen = $('.required').length;
        var numGoalsRequired = Session.get('numGoalsRequired');

        //get the goals
        var goals = Session.get('goals');
        for (var i=0; i < goals.length; i++) {
            if (goals[i].name === this.name) {
                var temp = Session.get('score');

                // if goal clicked is required
                if (goals[i].required) {
                    // if goal is becoming incomplete
                    if (goals[i].complete) {
                        // take away 20 points
                        temp -= 20;
                        // if the number of required goals is still met
                        if (numGoalsComplete - 1 >= numGoalsRequired) {
                            //give back 15 points because of another complete goal
                            temp += 15;
                        }
                        goals[i].complete = false;
                    } else{
                        // if the goal is becoming complete add 20 points
                        temp += 20;
                        // if the number of required goals was already met
                        if (numGoalsComplete >= numGoalsRequired) {
                            // take away 15 points from one of the blue goals
                            temp -= 15;
                        }
                        goals[i].inProgress = false;
                        goals[i].complete = true;
                    }
                } else {
                    // if the goal is not required
                    // else if the goal is becoming incomplete and the required number of goals (after removal) is not met
                    if (goals[i].complete) {
                        if (numGoalsComplete - 1 < numGoalsRequired) {
                            // take away 15 points
                            temp -= 15;
                        }
                        goals[i].complete = false;
                    } else if (!goals[i].complete) {

                        // if the goal is becoming complete
                        if (numGoalsComplete < numGoalsRequired) {
                            // and we have not met the number of required goals
                            // give 15 points
                            temp += 15;
                        }
                        goals[i].inProgress = false;
                        goals[i].complete = true;
                    }
                }

                //add bonus for completing all goals if applicable
                if (numGoalsComplete == (numGoalsTotal - 1) && numGoalsTotal > numGoalsRequired * 2) {
                    temp += 50;
                } else if (numGoalsComplete == numGoalsTotal && numGoalsTotal > numGoalsRequired * 2) {
                    temp -= 50;
                }

                Session.set('score', temp);
                break;
            }
        }

        //set the goals once changed
        Session.set('goals', goals);
    },

    'contextmenu .streamcard-goal': function(event) {
        //get the goals
        var goals = Session.get('goals');
        for (var i=0; i < goals.length; i++) {
            if (goals[i].name === this.name) {
                if (goals[i].complete) {
                    var temp = Session.get('score');
                    if (goals[i].required) {
                        temp -= 20;
                    } else {
                        temp -= 15;
                    }
                    Session.set('score', temp);
                    goals[i].complete = false;
                    goals[i].inProgress = true;
                } else if (goals[i].inProgress) {
                    goals[i].complete = false;
                    goals[i].inProgress = false;
                } else {
                    goals[i].inProgress = true;
                }
                break;
            }
        }

        //set the goals once changed
        Session.set('goals', goals);
        return false;

    }
});