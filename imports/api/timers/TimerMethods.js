/**
 * Created by Quinton on 9/23/2016.
 */

Meteor.methods({
    insertTimer: function(timer) {
        check(timer, Timers.simpleSchema());
        try {
            var timerId = Timers.insert(timer);
            return timerId;
        } catch (exception) {
            return exception;
        }
    }
});