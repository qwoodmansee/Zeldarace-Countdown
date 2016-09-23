/**
 * Created by Quinton on 9/23/2016.
 */


Template.TimerLayoutOwner.onCreated(function(){
    var self = this;
    self.autorun(function() {
        var username = FlowRouter.getParam('username');
        self.tempSub = self.subscribe("timers", {
            onReady: function() {
                //if there is no timer for the user
                if (Timers.find({username: FlowRouter.getParam('owner')}).count() == 0) {
                    //create a timer object to insert into the db
                    var newTimer = {
                        owner: FlowRouter.getParam('owner'),
                        running: false,
                        timeStarted: new Date(),
                        length: 0,
                        goals: {},
                        weights: {}
                    };
                    Timers.insert(newTimer);
                }
                self.tempSub.stop();
            }
        });
        self.subscribe('singleTimer', username);
    })
});
