
/**
 * Collection which stores information about users curCannot use 'in' operator to search for '$pushAll' inrently watching a timer/page
 * Created by Quinton on 9/22/2016.
 */

import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Presets = new Mongo.Collection('Presets');

Presets.allow({
    insert: function(userId, doc) {
        return !!userId;
    },
    update: function(userId, doc, fields, modifier) {
        return !!userId;
    },
    remove: function(username, doc) {
        return doc.username === username;
    }
});

PresetsSchema = new SimpleSchema({
    createdBy: {
        type: String,
        label: "username of Owner",
    },
    presets: {
        type: [Object],
        label: "Timer Goals",
        blackbox: true
    }
});

Presets.attachSchema(PresetsSchema);

