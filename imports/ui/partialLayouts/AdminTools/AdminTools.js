/**
 * Created by Quinton on 10/15/2017.
 */
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import {Timers} from '../../../api/timers/Timers.js';

import './AdminTools.html';
import './AdminTools.css';

Template.AdminTools.onCreated(function() {
    var self = this;

    //reactives
    self.editingTimer = new ReactiveVar(false);
});

Template.AdminTools.helpers({
    EditingTimer() {
        return Template.instance().editingTimer.get();
    }
});

Template.AdminTools.events({
    'click #admin-pause-timer-button': function() {
        var timer = Timers.findOne({owner: FlowRouter.getParam('username')});
        console.log(timer);
        if (timer){
            if (timer.running) {
                Timers.update(timer._id, {$set: {'running': false}});
            } else{
                Timers.update(timer._id, {$set: {'running': true}});
            }
        }
    },

    'click #admin-reset-timer-button': function() {
        var timer = Timers.findOne({owner: FlowRouter.getParam('username')});
        console.log(timer);
        if (timer){
            if (timer.running) {
                Timers.update(timer._id, {$set: {'running': false}});
            }
        }
    },

    'click #admin-set-timer-button': function() {
        var timer = Timers.findOne({owner: FlowRouter.getParam('username')});
        console.log(timer);
        let minutes = parseInt($('#admin-set-timer-amount')[0].value);
        if (timer !== null && timer !== undefined && minutes !== null && minutes !== undefined){
            if (timer.running) {
                console.log(minutes);
                Timers.update(timer._id, {$set: {'running': false, 'length': minutes, 'timeStarted': new Date() }});
                //Timers.update(timer._id, {$set: {'running': true, 'length': minutes, 'timeStarted': new Date() }});
            }
        }
    },

    'click #admin-modify-timer-button': function() {
        if (Template.instance().editingTimer.get()) {
            Template.instance().editingTimer.set(false);
        } else {
            Template.instance().editingTimer.set(true);
        }
        var timer = Timers.findOne({owner: FlowRouter.getParam('username')});
        console.log($('#timer-editing-textarea'));
        if (timer) {
            $('#timer-editing-textarea').val(JSON.stringify(timer, null, 2));
        }
    },

    'click #admin-save-modified-timer-button': function() {
        let newTimer  = JSON.parse($('#timer-editing-textarea').val());
        var oldTimer = Timers.findOne({owner: FlowRouter.getParam('username')});
        if (oldTimer !== null && oldTimer !== undefined && newTimer !== null && newTimer !== undefined){
                Timers.update(oldTimer._id, {
                    $set: {
                        'goals': newTimer['goals'],
                        'goalsRequired': newTimer['goalsRequired'],
                        'weights': newTimer['weights'],
                        'randomItems': newTimer['randomItems']
                    }});
        }
    }
});