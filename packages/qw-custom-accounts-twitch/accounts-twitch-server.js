AccountsTwitch = {};

Oauth.registerService('twitch', 2, null, function(query) {
    var response = getTokenResponse(query);
    var accessToken = response.access_token;
    var user = getUser(accessToken);

    user.id = user.sub;

    var serviceData = _.extend(user, {accessToken: accessToken});

    return {
        serviceData: serviceData,
        options: {
            profile: { name: user.preferred_username },
            services: { twitch: user }
        }
    };
});

var getTokenResponse = function (query) {
    var config = ServiceConfiguration.configurations.findOne({service: 'twitch'});

    if (!config)
        throw new ServiceConfiguration.ConfigError();

    var response;
    try {
        response = HTTP.post(
            "https://id.twitch.tv/oauth2/token", {
                params: {
                    code: query.code,
                    client_id: config.clientId,
                    redirect_uri: OAuth._redirectUri("twitch", config),
                    client_secret: OAuth.openSecret(config.secret),
                    grant_type: 'authorization_code'
                }
            });
        
        if (response.error) // if the http response was an error
            throw response.error;
        if (typeof response.content === "string")
            response.content = JSON.parse(response.content);
        if (response.content.error)
            throw response.content;
    } catch (err) {
        throw _.extend(new Error("Failed to complete OAuth handshake with Twitch. " + err.message),
            {response: err.response});
    }

    return response.content;
};

var getUser = function (accessToken) {
    try {
        let response = HTTP.get(
            "https://id.twitch.tv/oauth2/userinfo",
            {headers: {"Authorization": "Bearer " + accessToken}}).data;
        return response;
    } catch (err) {
        throw _.extend(new Error("Failed to fetch identity from Twitch. " + err.message),
            {response: err.response});
    }
};

AccountsTwitch.retrieveCredential = function(credentialToken, credentialSecret) {
    return Oauth.retrieveCredential(credentialToken, credentialSecret);
};