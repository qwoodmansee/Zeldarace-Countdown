/**
 * Sets up authentication with twitch
 * Created by Quinton on 9/21/2016.
 */

ServiceConfiguration.configurations.remove({
    service: "twitch"
});
ServiceConfiguration.configurations.insert({
    service: "twitch",
    clientId: "qhwoa2z7xx0nd8tgtcw4jgk3w2ynq2j",
    redirectUri: Meteor.absoluteUrl() + '_oauth/twitch?close',
    secret: "ebiceis9gqyf6nql1f7id2nlrvjz7br"
});