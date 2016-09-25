/**
 * Created by Quinton on 9/23/2016.
 */

import {GoalList} from './GoalList.js';
export const GoalGenerator = function() {
    var self = this;
    self.goalListManager = new GoalList();

    self.generateGoals = function(numGoals, numPreChosenRequired) {
        var masterGoalList = self.goalListManager.goalList;

        //randomly sort the goals
        masterGoalList.sort(function(xx,yy){ return Math.floor(Math.random() * 3) - 1; });

        var finalGoalList = [];

        for (var i=0; i< parseInt(numGoals); i++) {
            finalGoalList.push(masterGoalList.shift());
            finalGoalList[i].required = false;
        }

        var requiredSet = 0;
        while (requiredSet < parseInt(numPreChosenRequired)) {
            var goalNum = Math.floor((Math.random() * numGoals - 1) + 1);
            if (finalGoalList[goalNum].required == false) {
                finalGoalList[goalNum].required = true;
                requiredSet += 1;
            }
        }

        return finalGoalList;

    }
};