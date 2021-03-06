/**
 * Created by Quinton on 9/23/2016.
 */

import {GoalList} from './GoalList.js';
import {csvData} from './OoTCSVData.js';
export const GoalGenerator = function() {
    var self = this;

    self.generateGoals = function(numGoals, numPreChosenRequired) {
        var goalListManager = new GoalList();
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

    self.generateCSVGoalList = function(numGoals, numRequired, numPreChosenRequired, minutes, difficulty) {
        const csvDataGenerator = new csvData();
        var csvGoals = csvDataGenerator.data;

        var potentialGoals = [];
        if (!difficulty || difficulty < 1) {
            var difficulty =  3;
        }

        //determine list of possible goals
        for (var goal in csvGoals) {
            if (!csvGoals.hasOwnProperty(goal)) {
                //The current property is not a direct property of p
                continue;
            }

            //if goal can be done in the time limit
            if (csvGoals[goal].hasOwnProperty('time')) {
                if (parseFloat(csvGoals[goal].time) < minutes) {
                    potentialGoals.push(csvGoals[goal]);
                }
            }
        }
        var potentialGoalsCopy = potentialGoals.slice(); //creates a shallow copy

        var attempting = true;
        var numAttempts = 0;
        var tracker = {tooShort: false};
        while (attempting) {
            //reset potential goals after last attempt
            potentialGoals = potentialGoalsCopy.slice(); //creates a shallow copy
            //reset permutation counter
            var permCounter = 0;
            //reset the too short marker
            tracker.tooShort = false;

            //randomly sort the goals
            potentialGoals.sort(function(xx,yy){ return Math.floor(Math.random() * 3) - 1; });

            //chose 5 random goals from the potential goals
            var chosenGoals = [];
            while (chosenGoals.length < numGoals) {
                goal = potentialGoals.shift();
                goal.required = false;
                chosenGoals.push(goal);
            }

            //check all permutations of length numGoalsRquired to make sure at least a certain percent are possible
            const requiredPercentage = .30;
            var numViable = 0;
            const k = numRequired;
            var s = []; //keeps indicies pointing to elements in potentialGoals

            if (k <= chosenGoals.length) {
                for (var i=0; (s[i] = i) < k - 1; i++); //initialize array to original values
                permCounter++;

                //check original (first path)
                if (self._subsetViable(chosenGoals, tracker, s, minutes, difficulty)) {
                    numViable++;
                }
                for(;;) {
                    var i;
                    // find position of item that can be incremented
                    for (i = k - 1; i >= 0 && s[i] == chosenGoals.length - k + i; i--);
                    if (i < 0) {
                        break;
                    } else {
                        s[i]++;                    // increment this item
                        for (++i; i < k; i++) {    // fill up remaining items
                            s[i] = s[i - 1] + 1;
                        }
                        permCounter++;
                        if (self._subsetViable(chosenGoals, tracker, s, minutes, difficulty)) {
                            numViable++;
                        }
                        // if this subset is too fast start over
                        if (tracker.tooShort) {
                            break;
                        }
                    }
                }
            }

            if (((numViable / permCounter) > requiredPercentage) && !tracker.tooShort) {

                attempting = false;

                //choose middle of the road goals for prechosen
                var requiredSet = 0;

                if (parseInt(numPreChosenRequired) > 0 && parseInt(numPreChosenRequired) != parseInt(numGoals)) {
                    //sort the goals by their required time
                    chosenGoals.sort(function(a,b) {
                        return parseInt(a.time) - parseInt(b.time);
                    });

                    // this is a hacky way to work inside out of an array, using 2 counters
                    var chosenTracker = {};
                    var x = Math.ceil(chosenGoals.length/2);
                    var y = x - 1;
                    var numMarked = 0;

                    while (y >= 0)
                    {
                        if (numMarked < parseInt(numPreChosenRequired)) {
                            chosenTracker[chosenGoals[y--].name] = 1;
                            numMarked++;
                        } else {
                            break;
                        }
                        if (numMarked < parseInt(numPreChosenRequired) && x < chosenGoals.length) {
                            chosenTracker[chosenGoals[x++].name] = 1;
                            numMarked++;
                        } else {
                            break;
                        }
                    }

                    chosenGoals.forEach(function(goal) {
                        if (chosenTracker[goal.name] === 1) {
                            goal.required = true
                        }
                    });

                    //shuffle the array for that random look everybody likes
                    for (var i = chosenGoals.length - 1; i > 0; i--) {
                        var j = Math.floor(Math.random() * (i + 1));
                        var temp = chosenGoals[i];
                        chosenGoals[i] = chosenGoals[j];
                        chosenGoals[j] = temp;
                    }
                } else if (parseInt(numPreChosenRequired) === parseInt(numGoals)) {
                    chosenGoals.forEach(function(goal) {
                       goal.required = true;
                    });
                }


                return chosenGoals;
            } else if (numAttempts > 100000) {
                return [{name: "No Suitable Goals Found"},
                    {name: "Try increasing time or number of available goals "},
                    {name: "Or decreasing number of required goals "},
                    {name: "We tried over 100,000 combinations ;)"}];
            } else {
                numAttempts++;
            }
        }
    };

    //helper function to detemine if a subset of goals is viable
    self._subsetViable = function(potentialGoals, tracker, subset, minutes, difficulty) {
        var totalTimeEstimate = 0;

        // add a certain amount of time to each estimate based on difficulty: higher difficulty -> less buffer
        // NOTE(quinton) did some subtraction here since difficulty goes up while amount of available time goes down.
        // here difficulty of 5 will result in 1.1 as buffer, where difficulty of 1 will result in 1.5 buffer
        var difficultyBuffer = 1 + (.6 - difficulty * .1);
        for (var i = 0; i < subset.length; i++) {
            totalTimeEstimate += parseFloat(potentialGoals[subset[i]].time * difficultyBuffer);
        }

        totalTimeEstimate += 35 - difficulty; // add standard setup time - 30 minutes + some more based on difficulty.
        if (totalTimeEstimate < minutes * .6) {
            tracker.tooShort = true;
        }
        return totalTimeEstimate < minutes;
    }
};