/**
 * Created by Quinton on 9/24/2016.
 */
import { Template } from 'meteor/templating';
import {Timers} from '../../../api/timers/Timers.js';

import './GenerateTimerModal.css';
import './GenerateTimerModal.html';

import {GoalGenerator} from '../../../helpers/GoalGenerator.js';
import {WeightGenerator} from '../../../helpers/WeightGenerator.js';
import {ItemList} from '../../../helpers/ItemList.js';

Template.GenerateTimerModal.onRendered(function() {

});


Template.body.events({
    //event which will trigger when a preset is selected and set all the relevant forms
    'change #preset-select': function(event, template) {
        event.preventDefault();

        //determine the preset selected
        switch ($(this).val()) {
            //short
            case "1":
                //set length to 46 minutes
                $('#length_input').val(46);

                //set available goals to 3, required to 1, prechosen to 0
                $('#total_goals').val(4);
                $('#required_goals').val(1);
                $('#pre_chosen_goals').val(0);

                //weights to smart
                $('#weights-select').val(4);

                break;

            //medium
            case "2":
                //set length 1 hr 16 minutes
                $('#length_input').val(76);

                //set available goals to 7, required to 5, prechosen to 2
                $('#total_goals').val(7);
                $('#required_goals').val(4);
                $('#pre_chosen_goals').val(2);

                //weights to smart
                $('#weights-select').val(4);

                break;

            //long
            case "3":
                //set length to 2 hour 21 minutes
                $('#length_input').val(181);

                //set available goals to 6, required to 5, prechosen to 2
                $('#total_goals').val(8);
                $('#required_goals').val(6);
                $('#pre_chosen_goals').val(3);

                //weights to smart
                $('#weights-select').val(4);

                break;

            //collectathon
            case "4":
                //set length to 1 hr
                $('#length_input').val(61);

                //set available goals to 6, required to 5, prechosen to 2
                $('#total_goals').val(6);
                $('#required_goals').val(1);
                $('#pre_chosen_goals').val(0);

                //weights to random
                $('#weights-select').val(2);

                break;

            //goal-master
            case "5":
                //set length to 1 hr
                $('#length_input').val(61);

                //set available goals to 5, required to 4, prechosen to 2
                $('#total_goals').val(5);
                $('#required_goals').val(5);
                $('#pre_chosen_goals').val(5);

                //weights to equal
                $('#weights-select').val(1);

                break;
        }

    },

    //event which will generate a new set of goals, timer, and update the database
    'submit .generate-form': function(event, template) {
        event.preventDefault();
        // Get value from form element
        const target = event.target;

        //get values
        var lengthInMinutes = target.length.value;
        var weightsChoice = $('#weights-select').val();
        var numGoals = target.totalGoals.value;
        var numRequiredGoals = target.requiredGoals.value;
        var numPrechosenGoals = target.preChosen.value;
        //var smartGoals = target.smartGoals.value;
        var superSmartGoals = target.superSmartGoals.value;

        //validate values and set to random if incorrect

        //random time between 20 minutes and 3 hours
        if (lengthInMinutes < 1) {
            lengthInMinutes = Math.floor(Math.random()*(180-35+1)+35);
        }

        var lengthInMS = lengthInMinutes * 60 * 1000;

        //allow 0 goals, but limit to 12 for now
        if (numGoals < 0) {
            numGoals = 0;
        } else if (numGoals > 12) {
            numGoals = 12;
        }

        //if num required is more than total goals, just set them equal
        if (parseInt(numRequiredGoals) > numGoals) {
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
        var goals;
        if (superSmartGoals == "on") {
            goals = goalGenerator.generateCSVGoalList(numGoals, numRequiredGoals, numPrechosenGoals, lengthInMinutes);
        } else if (smartGoals == "on") {
            goals = goalGenerator.generateCSVGoalList(numGoals, numRequiredGoals, numPrechosenGoals, lengthInMinutes);
        } else {
            goals = goalGenerator.generateGoals(numGoals, numPrechosenGoals);
        }


        var weights = {};
        const weightGenerator = new WeightGenerator();
        if (weightsChoice === "2") {
            weights = weightGenerator.generateRandomWeights(false);
        } else if (weightsChoice === "3") {
            weights = weightGenerator.generateRandomWeights(true);
        } else if (weightsChoice === "4") {
            weights = weightGenerator.generateSmartWeights(true, true);
        } else {
            weights = weightGenerator.generateEqualWeights();

        }

        //decide which of the items with multiple versions will be available on this timer (bottles, hookshot, equipment, etc)
        const itemList = new ItemList();
        const itemChoices = itemList.generateMultiItemChoices();

        //update the timer currently associated
        var originalTimer = Timers.findOne({ownerId: Meteor.userId()});

        Timers.update(originalTimer._id, {$set: {'length': lengthInMinutes, 'weights': weights, 'goals': goals, 'goalsRequired': numRequiredGoals, 'running': false, 'randomItems': itemChoices}});

    }
});