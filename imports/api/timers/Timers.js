/**
 * Collection for a timer for each user which can be subscribed to by other users
 * Created by Quinton on 9/22/2016.
 */

import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Timers = new Mongo.Collection('Timers');

Timers.allow({
   insert: function(userId, doc) {
       return !!userId;
   },
   update: function(userId, doc, fields, modifier) {
       return doc.ownerId === userId;
   }
});

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
    }
});

Timers.attachSchema(TimerSchema);

