/**
 * Created by Quinton on 9/24/2016.
 */
import { Template } from 'meteor/templating';
import {Timers} from '../../../api/timers/Timers.js';

import './GenerateTimerModal.css';
import './GenerateTimerModal.html';

import {GoalGenerator} from '../../../helpers/GoalGenerator.js';


Template.GenerateTimerModal.onRendered(function() {

});


Template.body.events({
    //event which will generate a new set of goals, timer, and update the database
    'submit .generate-form': function(event, template) {
        event.preventDefault();
        // Get value from form element
        const target = event.target;

        //get values
        var lengthInMinutes = target.length.value;
        var weightsChoice = $('weights-select').val();
        var numGoals = target.totalGoals.value;
        var numRequiredGoals = target.requiredGoals.value;
        var numPrechosenGoals = target.preChosen.value;

        //validate values and set to random if incorrect

        //random time between 20 minutes and 3 hours
        if (lengthInMinutes < 1) {
            lengthInMinutes = Math.floor(Math.random()*(180-20+1)+20);
        }

        var lengthInMS = lengthInMinutes * 60 * 1000;

        //no weights by default
        if (!weightsChoice || weightsChoice < 1 || weightsChoice > 3) {
            weightsChoice = 1;
        }

        //allow 0 goals, but limit to 6 for now
        if (numGoals < 0) {
            numGoals = 0;
        } else if (numGoals > 6) {
            numGoals = 6;
        }

        //if num required is more than total goals, just set them equal
        if (numRequiredGoals > numGoals) {
            numRequiredGoals = numGoals;
        } else if (numRequiredGoals < 0) {
            numGoals = 0;
        }

        //if num prechosen is more than num required, set them equal
        if (numPrechosenGoals > numRequiredGoals) {
            numPrechosenGoals = numRequiredGoals;
        } else if (numPrechosenGoals < 0) {
            numPrechosenGoals = 0;
        }

        //all forms validated, generate a goal list first
        //only build this list when we absolutely have to, because it will use memory
        const goalGenerator = new GoalGenerator();
        var goals = goalGenerator.generateGoals(numGoals, numPrechosenGoals);

        //TODO(quinton): Generate a weight set based on choice

        //update the timer currently associated
        var originalTimer = Timers.findOne({ownerId: Meteor.userId()});
        Timers.update(originalTimer._id, {$set: {'length': lengthInMinutes, 'weights': {}, 'goals': goals, 'running': false}});

    }
});