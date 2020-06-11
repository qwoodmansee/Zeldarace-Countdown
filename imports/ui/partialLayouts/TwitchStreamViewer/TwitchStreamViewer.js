import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import {Timers} from '../../../api/timers/Timers.js';
import {PageViewers} from '../../../api/pageViewers/PageViewers.js';

import './TwitchStreamViewer.html'

Template.TwitchStreamViewer.onCreated(function(){
  var self = this;
  self.autorun(function() {
    self.subscribe('pageViewers', {});
  });
});

Template.TwitchStreamViewer.helpers({
  PageViewers() {
    var viewers = PageViewers.find({ownerUsername: FlowRouter.getParam('username')});
    viewers = viewers.fetch();
    //return viewers sorted by score
    return viewers;
  },
});