/**
 * Views Goal List stored with associated timer
 * Created by Quinton on 9/24/2016.
 */

import {Timers} from "../../../api/timers/Timers.js"
import {PageViewers} from "../../../api/pageViewers/PageViewers.js"

import './GoalList.html'
import './GoalList.css'

//check equality in html
Template.registerHelper('equals', function (a, b) {
    return a === b;
});

Template.GoalList.onCreated(function() {
    var self = this;

    //set up reactives associated with goal card
    self.goals = new ReactiveVar([]);
    self.goalsSelected = new ReactiveVar([]);
    self.numGoalsRequired = new ReactiveVar(0);
    self.completedGoals = new ReactiveVar([]);

    self.autorun(function() {
        self.subscribe('singleTimer', FlowRouter.getParam('username'), {
            onReady: function() {
                var goalsCurrentlySelected = [];

                // this will be final now since singleTimer's on ready has been called
                var timer = Timers.findOne();

                if (timer) {
                    //initialize reactives to initial timer value
                    var goals = timer['goals'];
                    Session.set("goals", goals);
                    self.goals.set(goals);
                    for (var i = 0; i < goals.length; i++) {
                        //set required goals as chosen
                        if (goals[i].required === true) {
                            goalsCurrentlySelected.push(i);
                        }
                    }
                    self.goalsSelected.set(goalsCurrentlySelected);
                    self.numGoalsRequired.set(timer['goalsRequired']);

                    //subscribe to pageViewers and make sure if you aren't added to it yet to add yourself
                    self.subscribe('pageViewers', {
                        onReady: function() {
                            //logged in users get a pageViewer entry/are tracked on page
                            if (Meteor.userId()) {
                                //if we are setting this up there should be a page viewer at this point, but we will make sure
                                var viewers = PageViewers.findOne({
                                    username: Meteor.user().profile.name,
                                    ownerUsername: FlowRouter.getParam('username')
                                });
                            }

                            //set up a function to be called whenever the timer is updated
                            var query = Timers.find();
                            var handle = query.observeChanges({
                                changed: function(id, fields) {

                                    if (fields['running'] === true) {
                                        //timer started by owner

                                    } else if (fields['running'] === false) {

                                        if (fields.hasOwnProperty('goals')) {
                                            // new timer from existing running timer
                                            Session.set("goals", goals);
                                            self.goals.set(fields['goals']);
                                            goalsCurrentlySelected = [];
                                            for (var i = 0; i < self.goals.get().length; i++) {
                                                //set required goals as chosen
                                                if (self.goals.get()[i].required === true) {
                                                    goalsCurrentlySelected.push(i);
                                                }
                                            }
                                            self.goalsSelected.set(goalsCurrentlySelected);
                                            if (fields.hasOwnProperty('goalsRequired')) {
                                                self.numGoalsRequired.set(fields['goalsRequired']);
                                            }

                                            //change the viewers goal selected if applicable
                                            if (viewers) {
                                                PageViewers.update(viewers._id, {$set: {'goalsSelected': goalsCurrentlySelected}});
                                            }



                                        } else {
                                            // timer ended (hit 00:00:00) - this actually might not happen
                                        }
                                    }

                                    if (fields.hasOwnProperty('goals')) {
                                        // new timer from non started timer
                                        Session.set("goals", goals);
                                        self.goals.set(fields['goals']);
                                        var goalsSelected = [];
                                        for (var i = 0; i < self.goals.get().length; i++) {
                                            //set required goals as chosen
                                            if (self.goals.get()[i].required === true) {
                                                goalsSelected.push(i);
                                            }
                                        }
                                        self.goalsSelected.set(goalsSelected);
                                        if (fields.hasOwnProperty('goalsRequired')) {
                                            self.numGoalsRequired.set(fields['goalsRequired']);
                                        }

                                        //change the viewers goal selected if applicable
                                        if (viewers) {
                                            PageViewers.update(viewers._id, {$set: {'goalsSelected': goalsSelected}});
                                        }
                                    }
                                }
                            });
                        }
                    });
                }
            }
        });
    });

    //this function will run anytime selected goals change, and will update the highlighted goals accordingly
    self.autorun(function() {
        // get all the selected goals (makes this reactive and happen on changes)
        var selectedIndexes = self.goalsSelected.get();

        // get all the goal card objects
        $('.goal-card').each(function(index) {
            if (selectedIndexes.indexOf(index) === -1 ) {
                //if goal is not selected make sure it doesnt have required class
                $(this).removeClass('required');
            } else {
                //if goal is selected give it the required (and locked since it's prechosen) class
                $(this).addClass('required');

            }
        });


    });
    Session.setDefault('createWindowSessionVar', false);
});

Template.GoalList.onRendered(function(){

});

Template.GoalList.helpers({
    userLoggedIn() {
        return Meteor.userId();
    },

    goals() {
       return Session.get('goals');
    },

    numGoalsRequired() {
        return Template.instance().numGoalsRequired.get();
    },

});

Template.GoalList.events({
   'click .goal-card': function(event) {
       //get the goals
       var goals = Session.get('goals');
       for (var i=0; i < goals.length; i++) {
           if (goals[i].name === this.name) {
               if (goals[i].complete) {
                   goals[i].complete = false;
               } else {
                   goals[i].complete = true;
               }
               break;
           }
       }

       //set the goals once changed
       Session.set('goals', goals);
   },

   'click #stream-card-open': function() {
       var requiredGoalObjects = $('.required');


        if (!$('#stream-card-open').hasClass('disabled')) {
            var popout = new Popout({
                template : 'StreamCard',
                on : 'createWindowSessionVar',
                win : true, // or tab : true
                context : {goals: requiredGoalObjects, goalsCompleted: Template.instance().completedGoals}
            });
            popout.show();
            $('#stream-card-open').addClass('disabled');
        } else {
            Session.set('createWindowSessionVar', true);
        }

   }
});

//popout logic
Template.StreamCard.onCreated(function() {
    var self = this;

});

Template.StreamCard.helpers({
    goals() {
        return Session.get('goals');
    },

    timer() {
        var time = Session.get('currentTimerRemaining');
        if (time.seconds > 0) {
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
    }
});
Template.StreamCard.events({
    'click .streamcard-goal': function(event) {
        //get the goals
        var goals = Session.get('goals');
        for (var i=0; i < goals.length; i++) {
            if (goals[i].name === this.name) {
                if (goals[i].complete) {
                    goals[i].complete = false;
                } else {
                    goals[i].complete = true;
                }
                break;
            }
        }

        //set the goals once changed
        Session.set('goals', goals);
    }
});