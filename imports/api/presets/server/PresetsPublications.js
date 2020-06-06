import { Meteor } from 'meteor/meteor';
import { Presets } from '../Presets.js';

// create a publication that returns all presets
Meteor.publish('presets', function(){
    return Presets.find();
});

Meteor.publish('userPresets', function(username){
    check(username, String);
    return Presets.find({createdBy: username});
});