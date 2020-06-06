Package.describe({
  name: 'qw-custom-accounts-twitch',
  version: '1.0.3',
  summary: 'A login service for Twitch forked from some other one in the readme',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1');

  api.use('accounts-base', ['client', 'server']);
  api.imply('accounts-base');
  api.use('accounts-oauth', ['client', 'server']);
  api.imply('accounts-oauth');

  api.use('oauth', ['client', 'server']);
  api.use('oauth2', ['client', 'server']);
  api.use('http', ['server']);
  api.use('templating', 'client');
  api.use('underscore', 'server');
  api.use('random', 'client');
  api.use('service-configuration', ['client', 'server']);

  api.addFiles('accounts-twitch-client.js', 'client');
  api.addFiles('accounts-twitch-server.js', 'server');
  api.addFiles("accounts-twitch.js");

  api.export('TwitchAccounts');

  api.addFiles([
    'accounts-twitch-configuration.html',
    'accounts-twitch-configuration.js',
    'accounts-twitch-button.html',
    'accounts-twitch-button.js',
    'accounts-twitch-button.css'
  ],'client');

  api.addAssets([
    'twitch.png'
  ],'client');
});
