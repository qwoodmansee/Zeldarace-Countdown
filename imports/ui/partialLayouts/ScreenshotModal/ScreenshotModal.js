/**
 * Created by Quinton on 9/24/2016.
 */
import { Template } from 'meteor/templating';
import {Timers} from '../../../api/timers/Timers.js';

import './ScreenshotModal.css';
import './ScreenshotModal.html';

Template.ScreenshotModal.onRendered(function() {

});


Template.body.events({
    //event which will generate a new set of goals, timer, and update the database
    'submit .screenshot-form': function(event) {
        event.preventDefault();
        const target = event.target;
        var saveLocal = target.saveLocally.checked;
        var postToDiscord = target.postToDiscord.checked;
        var fullPageDiv = document.getElementById('full-stream-layout');
        if (fullPageDiv && (saveLocal || postToDiscord)) {
            html2canvas(fullPageDiv, {
                onrendered: function (canvas) {
                    // canvas is the final rendered <canvas> element
                    canvas.toBlob(function (blob) {
                        if (postToDiscord) {
                            // create a message that will be used to mark some info about the race
                            var message = Meteor.user().profile.name +
                                "'s scorecard, hosted by " + FlowRouter.getParam('username');
                            var originalTimer = Timers.findOne({ownerId: Meteor.userId()});
                            if (originalTimer) {
                               message = originalTimer.length + " minutes, " + message;
                            }

                            //create fake file using blob
                            var formData = new FormData();
                            formData.append("content", message);
                            formData.append("file", blob, "test.png");
                            var request = new XMLHttpRequest();
                            request.open("POST", "https://discordapp.com/api/webhooks/315622333152755714/IzYWj76r6ke5tnN0sbPaG-GFTbUUuF_IkCOkQS4P2CyO0F3dfQh6KgCySieuvN1yfHsa");
                            request.send(formData);
                        }
                        if (saveLocal) {
                            saveAs(blob, "CountdownScorecard.png");
                        }
                    });
                }
            });
        }
    }
});