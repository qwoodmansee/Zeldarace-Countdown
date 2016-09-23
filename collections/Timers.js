/**
 * Created by Quinton on 9/22/2016.
 */

Timers = new Mongo.Collection('Timers');

Timers.allow({
   insert: function(userId, timer) {
       return !!userId;
   }
});

TimerSchema = new SimpleSchema({
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
        type: Object,
        label: "Timer Goals"
    },
    weights: {
        type: Object,
        label: "Obtainable Item Weights"
    }
});

Timers.attachSchema(TimerSchema);

