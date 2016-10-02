import {ItemList} from './ItemList.js'

export const WeightGenerator = function() {
    var self = this;
    self.itemListGenerator = new ItemList();
    self.allItems = self.itemListGenerator.allItems;

    self.generateEqualWeights = function() {
        var weights = {};
        for (var i=0; i < self.allItems.length; i++) {
            weights[self.allItems[i]] = 1;
        }
        return weights;
    };

    self.generateRandomWeights = function(allowNegative) {
        var temp;
        var weights = {};
        for (var i=0; i < self.allItems.length; i++) {
            if (allowNegative) {
                temp = self.generateRandomNumber(1,5, true);
            } else {
                temp = self.generateRandomNumber(1,5, false)
            }
            weights[self.allItems[i]] = temp;
        }
        return weights;
    };

    self.generateRandomNumber = function(positiveMin, max, allowNegative) {
        var num = Math.floor(Math.random()*max) + positiveMin; // this will get a number between positive min and max;

        if (allowNegative) {
            num *= Math.random()*2 > .4 ? 1 : -1; // this will add minus sign in 50% of cases
            if (num < 1 && Math.random()*2 > 1.5) {
                //add some zeros on occasion
                num = 0;
            }
        }
        return num
    }
};