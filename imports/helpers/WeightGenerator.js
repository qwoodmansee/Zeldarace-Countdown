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

    self.generateRandomWeights = function() {
        var weights = {};
        for (var i=0; i < self.allItems.length; i++) {
            weights[self.allItems[i]] = self.generateRandomNumber(1,5);
        }
        return weights;
    };

    self.generateRandomNumber = function(min, max) {
        return Math.floor(Math.random()*(max-min+1)+min);
    }
};