/**
 * Created by Quinton on 9/21/2016.
 */
import './Welcome.html';
import './Welcome.css';


Template.WelcomeLayout.events({
    'click #twitch-login-button' : function() {
        Meteor.loginWithTwitch({requestPermissions: []}, function (err) {
            if (err) console.log('login failed: ' + err)
        });
    }
});