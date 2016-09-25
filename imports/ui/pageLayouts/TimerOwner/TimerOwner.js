/**
 * Created by Quinton on 9/23/2016.
 */
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import {Timers} from '../../../api/timers/Timers.js';

import '../../partialLayouts/GenerateTimerModal/GenerateTimerModal.js';
import '../../partialLayouts/GoalList/GoalList.js';
import '../../partialLayouts/ItemMenu/ItemMenu.js';
import './TimerOwner.html';
import './TimerOwner.css';

import { ReactiveVar } from 'meteor/reactive-var'

Template.TimerOwner.onCreated(function(){
    var self = this;

    self.tempSub = self.subscribe("timers", {
        onReady: function() {
            //if there is no timer for the user
            if (Timers.find({owner: FlowRouter.getParam('username')}).count() == 0) {
                //create a timer object to insert into the db
                var newTimer = {
                    ownerId: Meteor.userId(),
                    owner: FlowRouter.getParam('username'),
                    running: false,
                    timeStarted: new Date(),
                    length: 0,
                    goals: [],
                    weights: {active:false}
                };
                Timers.insert(newTimer);
            }
            self.tempSub.stop();
        }
    });

    self.autorun(function() {
        self.subscribe('singleTimer', FlowRouter.getParam('username'));
        self.currentTimer = new ReactiveVar(Timers.find({owner: FlowRouter.getParam('username')}).fetch());
    });
});


Template.TimerOwner.onRendered(function() {
    //must move the modal to body so it can sit on top of everything else
    $('.modal-trigger').leanModal();
    $('select').material_select();
    $("#generateModal").appendTo("body");
    $('.carousel-slider').slider({full_width: true})


});

Template.TimerOwner.helpers({
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
    }
});

Template.TimerOwner.events({
   'click #timer-start-button': function() {
       var originalTimer = Timers.findOne({ownerId: Meteor.userId()});
       Timers.update(originalTimer._id, {$set: {'timeStarted': new Date(), 'running': true}});
       Template.instance().countdown.start();
   }
});