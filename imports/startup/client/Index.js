/**
 * Created by Quinton on 9/24/2016.
 */
import { WebApp } from 'meteor/webapp';
import './Routes.js';

Meteor.startup(() => {
  WebApp.rawConnectHandlers.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'ALLOW-FROM https://twitch.tv');
  return next();
  });
})