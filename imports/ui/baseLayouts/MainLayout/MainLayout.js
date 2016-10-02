/**
 * Created by Quinton on 9/24/2016.
 */

import './MainLayout.html';
import './MainLayout.css';
import '../../partialLayouts/FAQModal/FAQModal.js';




Template.MainLayout.onRendered(function() {
    //must move the modal to body so it can sit on top of everything else
    $('.modal-trigger').leanModal();
    $("#faq-modal").appendTo("body");
});
