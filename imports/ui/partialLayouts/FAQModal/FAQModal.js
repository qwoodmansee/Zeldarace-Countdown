/**
 * Created by Quinton on 9/28/16.
 */

import './FAQModal.html';
import './FAQModal.css';

Template.FAQModal.helpers({
   WhatIsCountdown() {
       return "Countdown is a tool used by Ocarina of Time enthusiasts to race one another against a common clock. " +
           "To win, users must complete a set number of goals which they can choose from. Additionally, one must collect " +
           "as many items as possible. At the end of the countdown, each racer can tally up their points using the scorecard.";
   },
    WhatAreWeights() {
        return "Weights are an optional setting for the scorecard of a timer. Weights allow different items throughout the game " +
            "to be worth more or less points. When creating Countdown, we were worried that the run might end up being the same " +
            "every time, and we think the optional addition of weights will help with keeping the routes unique.";
    },
    GoalsOrigin() {
        return "The goals which are generated are taken directly from the OoT-bingo tool on SRL. All credit and thanks to it's orignal creators: " +
            "Original goal list by Narcissa. Rebalanced by the #zelda community with analysis by Gombill, Runnerguy2489, and Zamiel. " +
            "v9 data collection and coordination by Gombill. Goal timing by Exodus, SnipinG117, Moose1137, Runnerguy2489, and the #zelda community.";
    },
    LoginWith() {
        return "The site requires users to log in with twitch simply to allow users to get reserve their Twitch username (we wouldn't " +
            "want someone other than you getting your username!). Currently the authorization requires your email address, but we are " +
            "attempting to fix this so that we only request access to your username."
    },

    CreatedBy() {
        return "Ocarina of Time Countdown was created by Twitch user qwoodmansee. If you have any questions or suggestions, please" +
            " reach out to him via direct message at his twitch."
    }
});