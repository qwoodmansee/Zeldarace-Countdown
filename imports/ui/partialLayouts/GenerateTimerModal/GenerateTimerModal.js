/**
 * Created by Quinton on 9/24/2016.
 */
import { Template } from 'meteor/templating';
import {Timers} from '../../../api/timers/Timers.js';

import './GenerateTimerModal.css';
import './GenerateTimerModal.html';

import {GoalGenerator} from '../../../helpers/GoalGenerator.js';
import {MM_GoalGenerator} from '../../../helpers/MM_GoalGenerator.js';
import {WeightGenerator} from '../../../helpers/WeightGenerator.js';
import {ItemList} from '../../../helpers/ItemList.js';
import {MM_ItemList} from '../../../helpers/MM_ItemList.js';

Template.GenerateTimerModal.onCreated(function() {
    var self = this;
});

Template.GenerateTimerModal.onRendered(function() {
});


Template.body.events({

    //event which will trigger when a preset is selected and set all the relevant forms
    'change #preset-select': function(event, template) {
        event.preventDefault();

        var _setGenerateValues = function(length, weightsChoice, numGoals, numRequired, numPrechosen, difficulty, smartGoals) {
            $('#length_input').val(length);
            $('#weights-select').val(weightsChoice);
            $('#total_goals').val(numGoals);
            $('#required_goals').val(numRequired);
            $('#pre_chosen_goals').val(numPrechosen);
            $('#super_smart_goals').prop('checked', smartGoals);
        };

        //determine the preset selected
        switch ($(this).val()) {
            //short
            case "1":
                //46 min, smart weights, 4 goals, 1 required, 0 prechosen
                _setGenerateValues(46, 4, 4, 1, 0, 3, true);
                break;

            //medium
            case "2":
                _setGenerateValues(76, 4, 7, 4, 2, 3, true);
                break;

            //long
            case "3":
                _setGenerateValues(181, 4, 8, 6, 3, 3, true);
                break;

            //collectathon
            case "4":
                _setGenerateValues(61, 2, 6, 1, 0, 3, true);
                break;

            //goal-master
            case "5":
                _setGenerateValues(61, 1, 5, 5, 5, 3, true);
                break;

            //Beta Quest
            case "6":
                _setGenerateValues(121, 2, 10, 3, 0, 1, false);
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
        var difficultyChoice = $('#difficulty-slider').val();
        var numGoals = target.totalGoals.value;
        var numRequiredGoals = target.requiredGoals.value;
        var numPrechosenGoals = target.preChosen.value;
        //var smartGoals = target.smartGoals.value;
        var superSmartGoals = target.superSmartGoals.value === "on";
        var majorasMask = target.mmSetting.checked;

        //validate values and set to random if incorrect

        //random time between 40 minutes and 2 hours
        if (lengthInMinutes < 1) {
            lengthInMinutes = Math.floor(Math.random()*(120-40+1)+40);
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
        let goalGenerator = new GoalGenerator();
        let weightGenerator = new WeightGenerator(false);
        let itemList = new ItemList();

        if (majorasMask){
            goalGenerator = new MM_GoalGenerator();
            weightGenerator = new WeightGenerator(true);
            itemList = new MM_ItemList();
        }

        var goals;
        if (majorasMask) {
            goals = goalGenerator.generateGoals(numGoals, numPrechosenGoals);
        } else if (superSmartGoals) {
            goals = goalGenerator.generateCSVGoalList(numGoals, numRequiredGoals, numPrechosenGoals, lengthInMinutes, difficultyChoice);
        } else {
            goals = goalGenerator.generateGoals(numGoals, numPrechosenGoals);
        }

        var weights = {};
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
        const itemChoices = itemList.generateMultiItemChoices();

        //update the timer currently associated
        var originalTimer = Timers.findOne({ownerId: Meteor.userId()});

        if (originalTimer.hasOwnProperty("_id") && originalTimer._id !== undefined && originalTimer._id !== null) {
            Timers.update(originalTimer._id, {$set: {'length': lengthInMinutes, 'weights': weights, 'goals': goals, 'goalsRequired': numRequiredGoals, 'running': false, 'randomItems': itemChoices, 'is_mm': majorasMask}});
        }

    }
});