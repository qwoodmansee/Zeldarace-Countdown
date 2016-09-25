/**
 * Created by Quinton on 9/23/2016.
 * Functions for returning timer information
 */
import {Timers} from "../api/timers/Timers.js";

 export const ActualTimerFunctions = function(parent, dbTimerObject) {
    var self = this;
    self.parent = parent;

     self.dbTimerObject = dbTimerObject;

};