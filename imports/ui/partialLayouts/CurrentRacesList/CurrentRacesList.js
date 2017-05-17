/**
 * Created by Quinton on 11/1/16.
 */

import './CurrentRacesList.html';
import './CurrentRacesList.css';
import {Timers} from "../../../api/timers/Timers.js"

Template.CurrentRacesList.onCreated(function() {
    var self = this;

    self.autorun(function() {
        self.subscribe('timers');
    });
});

Template.CurrentRacesList.helpers({
   allRaces() {
       return Timers.find();
   },
});