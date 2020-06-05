import { Meteor } from 'meteor/meteor';
import { PageViewers } from '../PageViewers.js';

// create a publication that returns all page viewers
Meteor.publish('pageViewers', () => {
    return PageViewers.find();
});