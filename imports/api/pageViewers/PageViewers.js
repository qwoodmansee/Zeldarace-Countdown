
/**
 * Collection which stores information about users currently watching a timer/page
 * Created by Quinton on 9/22/2016.
 */

import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const PageViewers = new Mongo.Collection('PageViewers');

PageViewers.allow({
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

PageViewersSchema = new SimpleSchema({
    username: {
        type: String,
        label: "username of viewer"
    },
    ownerUsername: {
        type: String,
        label: "username of owner of this page"
    },
    score: {
        type: Number,
        label: "Current Score"
    },
    currentlyRacing: {
        type: Boolean,
        label: "Is currently racing"
    }
});

PageViewers.attachSchema(PageViewersSchema);

