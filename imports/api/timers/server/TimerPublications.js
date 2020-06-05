/**
 * Publishing function for the timer collection
 * Created by Quinton on 9/23/2016.
 */

import { Meteor } from 'meteor/meteor';
import { Timers } from '../Timers.js';

// create different subscriptions levels depending on what is needed
Meteor.publish('singleTimer', (username) => {
    check(username, String);
    return Timers.find({owner: username});
});

Meteor.publish('timers', () => {
    return Timers.find();
});

Meteor.publish('timerGoals', (username) => {
    check(username, String);
    return Timers.find({owner: username}, {fields: 'goals'});
});
