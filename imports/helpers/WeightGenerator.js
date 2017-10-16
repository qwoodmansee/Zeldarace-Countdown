import {ItemList} from './ItemList.js'
import {MM_ItemList} from './MM_ItemList.js'

// this class is allowed to create MM version since it's SO similar,
export const WeightGenerator = function(is_mm) {
    let self = this;
    if (is_mm) {
        self.itemListGenerator = new MM_ItemList();
    } else {
        self.itemListGenerator = new ItemList();
    }
    self.allItems = self.itemListGenerator.allItems;

    self.generateEqualWeights = function() {
        var weights = {};
        for (var i=0; i < self.allItems.length; i++) {
            weights[self.allItems[i][0]] = 1;
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
            weights[self.allItems[i][0]] = temp;
        }
        return weights;
    };

    self.generateSmartWeights = function(allowNegative, RBA) {
        var weights = {};
        var mean;
        var stdev;
        //for each item
        for (var i=0; i < self.allItems.length; i++) {
            //get it's mean and stdev
            if (RBA){
                mean = parseInt(self.allItems[i][1]);
                stdev = parseInt(self.allItems[i][2]);
            } else {
                mean = parseInt(self.allItems[i][4]);
                stdev = parseInt(self.allItems[i][5]);
            }
            var standard = self._gaussian(mean, stdev);
            temp = Math.floor(standard());
            weights[self.allItems[i][0]] = temp;
        }

        return weights
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
    };

    //helper function which will allow a standard distribution to be created to find weights based on mean and std dev
    //src: http://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve
    self._gaussian = function(mean, stdev) {
        var y2;
        var use_last = false;
        return function() {
            var y1;
            if(use_last) {
                y1 = y2;
                use_last = false;
            }
            else {
                var x1, x2, w;
                do {
                    x1 = 2.0 * Math.random() - 1.0;
                    x2 = 2.0 * Math.random() - 1.0;
                    w  = x1 * x1 + x2 * x2;
                } while( w >= 1.0);
                w = Math.sqrt((-2.0 * Math.log(w))/w);
                y1 = x1 * w;
                y2 = x2 * w;
                use_last = true;
            }

            var retval = mean + stdev * y1;
            if(retval > 0)
                return retval;
            //return -retval;
            return retval;
        }
    }


};