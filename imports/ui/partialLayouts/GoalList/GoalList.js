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
       return Template.instance().goals.get();
    },

    numGoalsChosen() {
        return Template.instance().goalsSelected.get().length
    },

    numGoalsRequired() {
        return Template.instance().numGoalsRequired.get();

    },

    allChosen() {
        return Template.instance().goalsSelected.get().length === Template.instance().numGoalsRequired.get();
    }

});

Template.GoalList.events({
   'click .goal-card': function(event) {
       var timer = Timers.findOne();
       if (Meteor.userId()) {
           var pageViewer = PageViewers.findOne({username: Meteor.user().profile.name, ownerUsername: FlowRouter.getParam('username')});
       }
       if (timer) {
           var obj = $(event.target);
           //assume selecting goals after time is running are the last chance you get
           if (timer.running) {
               //select a goal if it isnt already selected
               if (Template.instance().goalsSelected.get().length < Template.instance().numGoalsRequired.get()) {
                   if (!this.required) {
                       this.required = true;
                       obj.addClass('required');
                       for (var i=0; i<timer.goals.length; i++) {
                           if (this.name === timer.goals[i].name) {
                               var currentGoalsSelected = Template.instance().goalsSelected.get();
                               currentGoalsSelected.push(i);
                               Template.instance().goalsSelected.set(currentGoalsSelected);
                               if (pageViewer) {
                                   PageViewers.update(pageViewer._id, {$set: {'goalsSelected': currentGoalsSelected}});

                               }
                           }
                       }
                   }
               } else if (obj.hasClass('required')) {
                   //selecting goal after a timer is start means completing or uncompleting it
                   if (obj.hasClass('complete')) {
                       obj.removeClass('complete').addClass('locked').removeClass('green');
                   } else {
                       obj.addClass('complete').removeClass('locked').addClass('green');
                   }
               }
           } else if (!$(event.target).hasClass('locked')) {
               if (this.required) {
                   this.required = false;
                   for (var i=0; i<timer.goals.length; i++) {
                       if (this.name === timer.goals[i].name) {
                           var currentGoalsSelected = Template.instance().goalsSelected.get();
                           for (var j=0; j < currentGoalsSelected.length; j++) {
                               if (currentGoalsSelected[j] === i) {
                                   currentGoalsSelected.splice(j, 1);
                               }
                           }
                           Template.instance().goalsSelected.set(currentGoalsSelected);
                           obj.removeClass('required');
                           if (pageViewer) {
                               PageViewers.update(pageViewer._id, {$set: {'goalsSelected': currentGoalsSelected}});
                           }
                       }
                   }
               } else if (Template.instance().goalsSelected.get().length < Template.instance().numGoalsRequired.get()) {
                   this.required = true;
                   obj.addClass('required');
                   for (var i=0; i<timer.goals.length; i++) {
                       if (this.name === timer.goals[i].name) {
                           var currentGoalsSelected = Template.instance().goalsSelected.get();
                           currentGoalsSelected.push(i);
                           Template.instance().goalsSelected.set(currentGoalsSelected);
                           if (pageViewer) {
                               PageViewers.update(pageViewer._id, {$set: {'goalsSelected': currentGoalsSelected}});
                           }
                       }
                   }

               }
           }
       }

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
        var requiredGoalObjects = Template.instance().data.goals;
        var requiredGoalNames = [];
        for (var i=0; i < requiredGoalObjects.length; i++) {
            requiredGoalNames.push(requiredGoalObjects[i].innerHTML.trim());
        }
        return requiredGoalNames;
    },

    Score() {
        return Session.get('score');
    }
});
Template.StreamCard.events({
    'click .streamcard-goal': function(event) {

        var obj = $(event.target);
        if (obj.hasClass('complete')) {
            obj.removeClass('complete').addClass('pink').removeClass('green');
        } else {
            obj.addClass('complete').removeClass('pink').addClass('green');
        }
    }
});