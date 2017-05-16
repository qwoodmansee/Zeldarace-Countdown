/**
 * VM for any page which uses the standard application layout
 * Created by Quinton on 9/24/2016.
*/

import './PopoutLayout.html';
import './PopoutLayout.css';
import '../../partialLayouts/FAQModal/FAQModal.js';

//setting up main subscribe to get the timer we need
Template.PopoutLayout.onCreated(function(){
    var self = this;
    $('body').css('background-color', '#303030');
});

Template.PopoutLayout.helpers({
    loggedInUsername() {
        if (Meteor.user() != null) {
            return Meteor.user().profile.name;
        }
    },
    ownerUsername() {
        return FlowRouter.getParam('username');
    }

});


Template.PopoutLayout.onRendered(function() {
    //must move the modal to body so it can sit on top of everything else
    $("#faq-modal").appendTo("body");
});
