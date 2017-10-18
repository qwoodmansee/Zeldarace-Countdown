/**
 * Collection for a timer for each user which can be subscribed to by other users
 * Created by Quinton on 9/22/2016.
 */

import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Timers = new Mongo.Collection('Timers');

Timers.allow({
   insert: function(userId, doc) {
       // check for administrator ids - local qw and dev, zr qw
       if (userId === "kyP2gbWh2q3t8DBAB" || userId === "dkrAgQgXFJcgXREfv" || userId === "9kLidCHJ9wJLMQDas") return true;
       return !!userId;
   },
   update: function(userId, doc, fields, modifier) {
       // check for administrator ids - local qw and dev, zr qw
       if (userId === "kyP2gbWh2q3t8DBAB" || userId === "dkrAgQgXFJcgXREfv" || userId === "9kLidCHJ9wJLMQDas") return true;
       return doc.ownerId === userId;
   }
});

// create the schema for the timers table in the database
TimerSchema = new SimpleSchema({
    ownerId: {
        type: String,
        label: "userId of owner"
    },
    owner: {
        type: String,
        label: "username of Owner",
    },
    running: {
        type: Boolean,
        label: "Currently Running"
    },
    timeStarted: {
        type: Date,
        label: "Time Started"
    },
    length: {
        type: Number,
        label: "Length (in ms)"
    },
    goals: {
        type: [Object],
        label: "Timer Goals",
        blackbox: true
    },
    goalsRequired: {
        type: Number,
        label: 'Number of goals required'
    },
    weights: {
        type: Object,
        label: "Obtainable Item Weights",
        blackbox: true
    },
    randomItems: {
        type: Object,
        label: "Selections for the random objects on the menu",
        blackbox: true
    },
    is_mm: {
        type: Boolean,
        label: "True if this timer will have Majora's Mask setup"
    }
});

Timers.attachSchema(TimerSchema);

