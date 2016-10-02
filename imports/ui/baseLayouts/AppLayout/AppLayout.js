/**
 * VM for any page which uses the standard application layout
 * Created by Quinton on 9/24/2016.
*/

import './AppLayout.html';
import './AppLayout.css';
import '../../partialLayouts/FAQModal/FAQModal.js';

//setting up main subscribe to get the timer we need
Template.AppLayout.onCreated(function(){
    var self = this;
    self.autorun(function() {
        var username = FlowRouter.getParam('username');
        self.subscribe('singleTimer', username);
    });
    $('body').css('background-color', '#303030');
});

Template.AppLayout.helpers({
    loggedInUsername() {
        if (Meteor.user() != null) {
            return Meteor.user().profile.name;
        }
    },
    ownerUsername() {
        return FlowRouter.getParam('username');
    }

});


Template.AppLayout.onRendered(function() {
    //must move the modal to body so it can sit on top of everything else
    $("#faq-modal").appendTo("body");
});
