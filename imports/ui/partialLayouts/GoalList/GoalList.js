/**
 * Views Goal List stored with associated timer
 * Created by Quinton on 9/24/2016.
 */

import {Timers} from "../../../api/timers/Timers.js"

import './GoalList.html'
import './GoalList.css'

Template.GoalList.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('singleTimer', FlowRouter.getParam('username'));
    });
});

Template.GoalList.onRendered(function(){

});

Template.GoalList.helpers({
   goals() {
       var timer = Timers.findOne();
       if (timer) {
           return timer['goals'];
       }
       return [];
   }
});

Template.GoalList.events({
   'click .goal-card': function() {
       var timer = Timers.findOne();
       if (timer) {
           if ($(this).required) {
               $(this).required = false;
           } else if ($('.required-goal').length < timer.goalsRequired) {
               //TODO(quinton): find out if this actually isnt setting
               $(this).required = true;
           }
       }
   }
});