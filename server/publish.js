/**
 * Created by Quinton on 9/23/2016.
 */


Meteor.publish('singleTimer', function(username){
    check(username, String);
    return Timers.find({owner: username});
});

Meteor.publish('timers', function(){
    return Timers.find();
});