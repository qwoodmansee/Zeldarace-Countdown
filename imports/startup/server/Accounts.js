/**
 * Sets up authentication with twitch
 * Created by Quinton on 9/21/2016.
 */

ServiceConfiguration.configurations.remove({
    service: "twitch"
});
ServiceConfiguration.configurations.insert({
    service: "twitch",
    clientId: "521hljqlaj5yyk2efh4j5ol4t78fg0y",
    redirectUri: Meteor.absoluteUrl() + '_oauth/twitch?close',
    secret: "toju1705x1k9oa2c3cik5e1l6za0615"
});