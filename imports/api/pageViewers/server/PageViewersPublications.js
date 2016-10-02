import { Meteor } from 'meteor/meteor';
import { PageViewers } from '../PageViewers.js';


Meteor.publish('pageViewers', function(){
    return PageViewers.find();
});