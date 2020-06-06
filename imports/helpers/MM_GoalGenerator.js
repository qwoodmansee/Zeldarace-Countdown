/**
 * Created by Quinton on 9/23/2016.
 */

import {MM_GoalList} from './MM_SimpleGoalList.js';
export const MM_GoalGenerator = function() {
    var self = this;

    self.generateGoals = function(numGoals, numPreChosenRequired) {
        var goalListManager = new MM_GoalList();
        var masterGoalList = goalListManager.goalList;

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
    };

    self.generateTimeConsciousGoals = function(numGoals, numRequired, numPreChosenRequired, minutes) {
        var goalListManager = new GoalList();
        var masterGoalList = goalListManager.goalList;

        //determine potential ranks based on time
        var minRank = 1;
        var maxRank = 26;

        //determine min and max rank based on time and number of required goals
        if (numRequired < 2) {
            if (minutes < 35) {
                maxRank = 6;
            } else if (minutes < 65) {
                maxRank = 13;
            } else if (minutes < 120) {
                maxRank = 26;
            }
        } else if (numRequired < 4) {
            if (minutes < 35) {
                maxRank = 5;
            } else if (minutes < 65) {
                maxRank = 10;
            } else if (minutes < 120) {
                maxRank = 20;
            }
        } else {
            if (minutes < 35) {
                maxRank = 2;
            } else if (minutes < 65) {
                maxRank = 7;
            } else if (minutes < 120) {
                maxRank = 13;
            }
        }

        //randomly sort the goals
        masterGoalList.sort(function(xx,yy){ return Math.floor(Math.random() * 3) - 1; });

        var finalGoalList = [];
        var numAdded = 0;

        var goal;
        //only add goals which fit in the max and min ranks
        while (numAdded < numGoals) {
            goal = masterGoalList.shift();
            if (goal.rank < maxRank && goal.rank > minRank) {
                goal.required = false;
                finalGoalList.push(goal);
                numAdded++;
            }
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
    };
};