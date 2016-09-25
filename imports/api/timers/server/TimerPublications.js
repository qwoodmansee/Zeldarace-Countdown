/**
 * Publishing function for the timer collection
 * Created by Quinton on 9/23/2016.
 */

import { Meteor } from 'meteor/meteor';

import { Timers } from '../Timers.js';

Meteor.publish('singleTimer', function(username){
    check(username, String);
    return Timers.find({owner: username});
});

Meteor.publish('timers', function(){
    return Timers.find();
});

Meteor.publish('timerGoals', function(username) {
   check(username, string);
    return Timers.find({owner: username}, {fields: 'goals'});
});