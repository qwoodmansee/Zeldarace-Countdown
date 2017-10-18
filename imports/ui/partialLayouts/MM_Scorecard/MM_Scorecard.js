import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import {Timers} from '../../../api/timers/Timers.js';
import {PageViewers} from '../../../api/pageViewers/PageViewers.js';

import './MM_Scorecard.html'
import './MM_Scorecard.css'

Template.MM_Scorecard.onCreated(function() {
    var self = this;

    self.generateRandomNumber = function(positiveMin, max, allowNegative) {
        var num = Math.floor(Math.random()*max) + positiveMin; // this will get a number between positive min and max;

        if (allowNegative) {
            num *= Math.random()*2 > .4 ? 1 : -1; // this will add minus sign in 50% of cases
            if (num < 1 && Math.random()*2 > 1.5) {
                //add some zeros on occasion
                num = 0;
            }
        }
        return num
    };

    //observables
    self.heartContainers = new ReactiveVar(3);
    self.goldSkulls = new ReactiveVar(0);
    self.rupees = new ReactiveVar(0);
    self.scorecardValues = new ReactiveVar([]);

    // if there was a scorecard owner passed in
    if (Template.currentData().scorecardOwner != undefined && Template.currentData().scorecardOwner != null) {
        self.scorecardOwner = Template.currentData().scorecardOwner
        self.subscribe('singleTimer',  FlowRouter.getParam('timerOwner'));
        self.subscribe('pageViewers', {
            onReady: function () {
                if (Meteor.userId()) {
                    var viewers = PageViewers.findOne({
                        username: self.scorecardOwner,
                        ownerUsername: FlowRouter.getParam('timerOwner')
                    });
                    if (viewers != null) {
                        self.scorecardValues.set(viewers.scorecardValues);
                    }
                }

            }
        });
    } else if (FlowRouter.getParam("username") != undefined && FlowRouter.getParam("username") != null && FlowRouter.getParam("username") != "") {
        // if we are on a race page
        self.subscribe('singleTimer',  FlowRouter.getParam('username'));
        self.subscribe('pageViewers', {
            onReady: function () {
                if (Meteor.userId()) {
                    var viewers = PageViewers.findOne({
                        username: Meteor.user().profile.name,
                        ownerUsername: FlowRouter.getParam('username')
                    });
                    if (viewers != null) {
                        self.scorecardValues.set(viewers.scorecardValues);
                    }
                }

            }
        });
        Session.set('score', 0);
    } else if (FlowRouter.getParam("scorecardOwner") != undefined && FlowRouter.getParam("scorecardOwner") != null
                && FlowRouter.getParam("scorecardOwner") != "" && Meteor.user() != null
                && Meteor.user().profile.name === FlowRouter.getParam("scorecardOwner")) {
        self.subscribe('singleTimer',  FlowRouter.getParam('timerOwner'));
        self.subscribe('pageViewers', {
            onReady: function () {
                if (Meteor.userId()) {
                    var viewers = PageViewers.findOne({
                        username: FlowRouter.getParam("scorecardOwner"),
                        ownerUsername: FlowRouter.getParam('timerOwner')
                    });
                    if (viewers != null) {
                        self.scorecardValues.set(viewers.scorecardValues);
                    }
                }

            }
        });
    }
});

Template.MM_Scorecard.helpers({

    CurrentScore() {
        return Session.get('score');
    },

    // returns whether or not a scorecard item has been obtained based on it's index
    scoreCardItemObtained(scorecardIndex) {
        var scorecardValues = Template.instance().scorecardValues.get();
        if (scorecardIndex < 67) {
            return scorecardValues[scorecardIndex] == 1
        }  else {
            return false;
        }
    }
    ,

    itemMenuGridRows(){

        var weights = {};
        if (Template.instance().subscriptionsReady()){
            var timer = Timers.findOne();
            weights = timer.weights;
        }

        if (timer) {
            var row1 = [];
            row1.push({name: "MM_OcarinaofTime", weight: weights["MM_OcarinaofTime"], tooltip: "Ocarina of Time", scoreCardIndex: 0});
            row1.push({name: "MM_HeroBow", weight: weights["MM_HeroBow"], tooltip: "Hero's Bow", scoreCardIndex: 1});
            row1.push({name: "MM_FireArrow", weight: weights["MM_FireArrow"], tooltip: "Fire Arrow", scoreCardIndex: 2});
            row1.push({name: "MM_IceArrow", weight: weights["MM_IceArrow"], tooltip: "Ice Arrow", scoreCardIndex: 3});
            row1.push({name: "MM_LightArrow", weight: weights["MM_LightArrow"], tooltip: "Light Arrow", scoreCardIndex: 4});
            row1.push({name: timer.randomItems['topTrade'].name, weight: weights[timer.randomItems['topTrade'].name],
                tooltip: timer.randomItems['topTrade'].tooltip, scoreCardIndex: 5});

            var row2 = [];
            row2.push({name: "MM_Bomb", weight: weights["MM_Bomb"], tooltip: "Bombs",
                scoreCardIndex: 6});
            row2.push({name: "MM_Bombchu", weight: weights["MM_Bombchu"], tooltip: "Bombchus",  scoreCardIndex: 7});
            row2.push({name: "MM_DekuStick", weight: weights["MM_DekuStick"], tooltip: "Deku Stick", scoreCardIndex: 8});
            row2.push({name: "MM_DekuNut", weight: weights["MM_DekuNut"], tooltip: "Deku Nut", scoreCardIndex: 9});
            row2.push({name: "MM_MagicBeans", weight: weights["MM_MagicBeans"], tooltip: "Magic Beans", scoreCardIndex: 10});
            row2.push({name: timer.randomItems['middleTrade'].name, weight: weights[timer.randomItems['middleTrade'].name],
                tooltip: timer.randomItems['middleTrade'].tooltip, scoreCardIndex: 11});

            var row3 = [];
            row3.push({name: "MM_PowderKeg", weight: weights["MM_PowderKeg"], tooltip: "Powder Keg", scoreCardIndex: 12});
            row3.push({name: "MM_PictographBox", weight: weights["MM_PictographBox"], tooltip: "Pictograph Box", scoreCardIndex: 13});
            row3.push({name: "MM_LensofTruth", weight: weights["MM_LensofTruth"], tooltip: "Lens of Truth", scoreCardIndex: 14});
            row3.push({name: "MM_Hookshot", weight: weights["MM_Hookshot"], tooltip: "Hookshot", scoreCardIndex: 15});
            row3.push({name: "MM_GreatFairySword", weight: weights["MM_GreatFairySword"], tooltip: "Great Fairy Sword", scoreCardIndex: 16});
            row3.push({name: timer.randomItems['bottomTrade'].name, weight: weights[timer.randomItems['bottomTrade'].name],
                tooltip: timer.randomItems['bottomTrade'].tooltip, scoreCardIndex: 17});

            var row4 = [];
            //pick items for the 6 bottles
            for (var i=0; i < 6; i++) {
                row4.push({name: timer.randomItems.bottles[i].name, weight: weights[timer.randomItems.bottles[i].name],
                            tooltip: timer.randomItems.bottles[i].tooltip, scoreCardIndex: 18 + i});
            }

            return [
                {items: row1},
                {items: row2},
                {items: row3},
                {items: row4}
            ];
        }

    },

    QuestStatusGridRows(){

        var weights = {};
        if (Template.instance().subscriptionsReady()){
            var timer = Timers.findOne();
            weights = timer.weights;
        }

        if (timer) {
            // 24, 25, 26, 27, 28
            var row1 = [];
            row1.push({name: "MM_SongofTime", weight: weights["MM_SongofTime"], tooltip: "Song of Time", scoreCardIndex: 24});
            row1.push({name: "MM_SongofHealing", weight: weights["MM_SongofHealing"], tooltip: "Song of Healing", scoreCardIndex: 25});
            row1.push({name: "MM_EponaSong", weight: weights["MM_EponaSong"], tooltip: "Epona's Song", scoreCardIndex: 26});
            row1.push({name: "MM_SongofSoaring", weight: weights["MM_SongofSoaring"], tooltip: "Song of Soaring", scoreCardIndex: 27});
            row1.push({name: "MM_SongofStorms", weight: weights["MM_SongofStorms"], tooltip: "Song of Storms", scoreCardIndex: 28});

            // 29, 30, 31, 32, 33
            var row2 = [];
            row2.push({name: "MM_SonataofAwakening", weight: weights["MM_SonataofAwakening"], tooltip: "SonataOfAwakening", scoreCardIndex: 29});
            row2.push({name: timer.randomItems['lullaby'].name, weight: weights[timer.randomItems['lullaby'].name],
                tooltip: timer.randomItems['lullaby'].tooltip, scoreCardIndex: 30});
            row2.push({name: "MM_NewWaveBossaNova", weight: weights["MM_NewWaveBossaNova"], tooltip: "New Wave Bossa Nova", scoreCardIndex: 31});
            row2.push({name: "MM_ElegyofEmptiness", weight: weights["MM_ElegyofEmptiness"], tooltip: "Elegy of Emptiness", scoreCardIndex: 32});
            row2.push({name: "MM_OathtoOrder", weight: weights["MM_OathtoOrder"], tooltip: "Oath to Order", scoreCardIndex: 33});


            // 34, 35, 36, 37, 38
            var row3 = [];
            row3.push({name: "MM_Bombers'Notebook", weight: weights["MM_Bombers'Notebook"], tooltip: "Bombers' Notebook", scoreCardIndex: 34});
            row3.push({name: "MM_OdolwaRemains", weight: weights["MM_OdolwaRemains"], tooltip: "Odolwa's Remains", scoreCardIndex: 35});
            row3.push({name: "MM_GohtRemains", weight: weights["MM_GohtRemains"], tooltip: "Goht's Remains", scoreCardIndex: 36});
            row3.push({name: "MM_GyorgRemains", weight: weights["MM_GyorgRemains"], tooltip: "Gyorg's Remains", scoreCardIndex: 37});
            row3.push({name: "MM_TwinmoldRemains", weight: weights["MM_TwinmoldRemains"], tooltip: "Twinmold's Remains", scoreCardIndex: 38});

            //39, 40, 41, 42
            var row4 = [];
            row4.push({name: timer.randomItems['sword'].name, weight: weights[timer.randomItems['sword'].name],
                tooltip: timer.randomItems['sword'].tooltip, scoreCardIndex: 39});
            row4.push({name: timer.randomItems['shield'].name, weight: weights[timer.randomItems['shield'].name],
                tooltip: timer.randomItems['shield'].tooltip, scoreCardIndex: 40});
            row4.push({name: timer.randomItems['quiver'].name, weight: weights[timer.randomItems['quiver'].name],
                tooltip: timer.randomItems['quiver'].tooltip, scoreCardIndex: 41});
            row4.push({name: timer.randomItems['bombBag'].name, weight: weights[timer.randomItems['bombBag'].name],
                tooltip: timer.randomItems['bombBag'].tooltip, scoreCardIndex: 42});


            return [
                {items: row1},
                {items: row2},
                {items: row3},
                {items: row4}
            ];
        }
    },

    MaskGridRows() {

        var weights = {};
        if (Template.instance().subscriptionsReady()){
            var timer = Timers.findOne();
            weights = timer.weights;
        }

        if (timer) {
            var row1 = [];
            row1.push({name: "MM_PostmanHat", weight: weights["MM_PostmanHat"], tooltip: "Postman's Hat", scoreCardIndex: 43});
            row1.push({name: "MM_AllNightMask", weight: weights["MM_AllNightMask"], tooltip: "All-Night Mask", scoreCardIndex: 44});
            row1.push({name: "MM_BlastMask", weight: weights["MM_BlastMask"], tooltip: "Blast Mask", scoreCardIndex: 45});
            row1.push({name: "MM_StoneMask", weight: weights["MM_StoneMask"], tooltip: "Stone Mask", scoreCardIndex: 46});
            row1.push({name: "MM_GreatFairyMask", weight: weights["MM_GreatFairyMask"], tooltip: "Great Fairy's Mask", scoreCardIndex: 47});
            row1.push({name: "MM_DekuMask", weight: weights["MM_DekuMask"], tooltip: "Deku Mask", scoreCardIndex: 48});

            var row2 = [];
            row2.push({name: "MM_KeatonMask", weight: weights["MM_KeatonMask"], tooltip: "Keaton Mask", scoreCardIndex: 49});
            row2.push({name: "MM_BremenMask", weight: weights["MM_BremenMask"], tooltip: "Bremen Mask", scoreCardIndex: 50});
            row2.push({name: "MM_BunnyHood", weight: weights["MM_BunnyHood"], tooltip: "Bunny Hood", scoreCardIndex: 51});
            row2.push({name: "MM_DonGeroMask", weight: weights["MM_DonGeroMask"], tooltip: "Don Gero's Mask", scoreCardIndex: 52});
            row2.push({name: "MM_MaskofScents", weight: weights["MM_MaskofScents"], tooltip: "Mask of Scents", scoreCardIndex: 53});
            row2.push({name: "MM_GoronMask", weight: weights["MM_GoronMask"], tooltip: "Goron Mask", scoreCardIndex: 54});

            var row3 = [];
            row3.push({name: "MM_RomaniMask", weight: weights["MM_RomaniMask"], tooltip: "Romani's Mask", scoreCardIndex: 55});
            row3.push({name: "MM_CircusLeaderMask", weight: weights["MM_CircusLeaderMask"], tooltip: "Circus Leader's Mask", scoreCardIndex: 56});
            row3.push({name: "MM_KafeiMask", weight: weights["MM_KafeiMask"], tooltip: "Kafei's Mask", scoreCardIndex: 57});
            row3.push({name: "MM_CoupleMask", weight: weights["MM_CoupleMask"], tooltip: "Couple's Mask", scoreCardIndex: 58});
            row3.push({name: "MM_MaskofTruth", weight: weights["MM_MaskofTruth"], tooltip: "Mask of Truth", scoreCardIndex: 59});
            row3.push({name: "MM_ZoraMask", weight: weights["MM_ZoraMask"], tooltip: "Zora Mask", scoreCardIndex: 60});

            var row4 = [];
            row4.push({name: "MM_KamaroMask", weight: weights["MM_KamaroMask"], tooltip: "Kamaro's Mask", scoreCardIndex: 61});
            row4.push({name: "MM_GibdoMask", weight: weights["MM_GibdoMask"], tooltip: "Gibdo Mask", scoreCardIndex: 62});
            row4.push({name: "MM_GaroMask", weight: weights["MM_GaroMask"], tooltip: "Garo's Mask", scoreCardIndex: 63});
            row4.push({name: "MM_CaptainHat", weight: weights["MM_CaptainHat"], tooltip: "Captain's Hat", scoreCardIndex: 64});
            row4.push({name: "MM_GiantMask", weight: weights["MM_GiantMask"], tooltip: "Giant's Mask", scoreCardIndex: 65});
            row4.push({name: "MM_FierceDeityMask", weight: weights["MM_FierceDeityMask"], tooltip: "Fierce Deity's Mask", scoreCardIndex: 66});

            return [
                {items: row1},
                {items: row2},
                {items: row3},
                {items: row4}
            ];
        }
    },

    numHeartContainers() {
        return Template.instance().heartContainers.get();
    },

    numGoldSkulls() {
        return Template.instance().goldSkulls.get();
    },

    numRupees() {
        return Template.instance().rupees.get();
    },
});

Template.MM_Scorecard.onRendered(function() {
    Tracker.autorun(function () {
        Tracker.afterFlush(function () {
            $('.tooltipped').tooltip({delay: 50});
        });
    });
    $('.collapsible').collapsible({});
});

Template.MM_Scorecard.events({
    'click .scorecard-item' : function(event) {
        var object =  $(event.currentTarget).children('img');
        if (object.hasClass('collected')) {
            object.removeClass('collected');
            Session.set('score', Session.get('score') - parseInt( $(event.currentTarget)[0].dataset.weight))
        } else {
            object.addClass('collected');
            Session.set('score', Session.get('score') + parseInt( $(event.currentTarget)[0].dataset.weight))
        }
    },

   'click #score-reset-button' : function() {
       $('.scorecard-item').children('img').removeClass('collected');
       Session.set('score', 0);
       Template.instance().rupees.set(0);
       Template.instance().heartContainers.set(3);
       Template.instance().goldSkulls.set(0);
   },

   'click #subtract-heart' : function(){
       var temp = Template.instance().heartContainers.get();
       Template.instance().heartContainers.set(temp - 1);
       temp = Session.get('score');
       Session.set('score', temp - 1);
   },

   'click #add-heart' : function(){
       var temp = Template.instance().heartContainers.get();
       Template.instance().heartContainers.set(temp + 1);
       temp = Session.get('score');
       Session.set('score', temp + 1);
   },

   'click #subtract-goldSkull' : function(){
       var temp = Template.instance().goldSkulls.get();
       Template.instance().goldSkulls.set(temp - 1);
       if ((temp) % 3 === 0) {
           temp = Session.get('score');
           Session.set('score', temp - 1);
       }
   },

   'click #add-goldSkull' : function(){
       var temp = Template.instance().goldSkulls.get();
       Template.instance().goldSkulls.set(temp + 1);
       if ((temp + 1) % 3 === 0) {
           temp = Session.get('score');
           Session.set('score', temp + 1);
       }
   },

    'click #subtract-100rupee' : function(){
        var temp = Template.instance().rupees.get();
        if (temp > 0){
            Template.instance().rupees.set(temp - 100);
            temp = Session.get('score');
            Session.set('score', temp - 1);
        }
    },

    'click #add-100rupee' : function(){
        var temp = Template.instance().rupees.get();
        if (temp < 500) {
            Template.instance().rupees.set(temp + 100);
            temp = Session.get('score');
            Session.set('score', temp + 1);
        }
    },

    'click #popout-scorecard-open': function() {
        var requiredGoalObjects = $('.required');


        if (!$('#popout-scorecard-open').hasClass('disabled')) {
            var popout = new Popout({
                template : 'popoutScorecardTemplate',
                on : 'popoutScorecardSessionVar',
                win : true, // or tab : true
                context : {
                    itemMenuGridRows: Template.instance().itemMenuGridRows,
                    QuestStatusGridRows: Template.instance().QuestStatusGridRows,
                    MaskGridRows: Template.instance().MaskGridRows,
                    numHeartContainers: Template.instance().numHeartContainers,
                    numGoldSkulls: Template.instance().numGoldSkulls,
                    numRupees: Template.instance().numRupees
                }
            });

            popout.show();
            $('#popout-scorecard-open').addClass('disabled');
        } else {
            Session.set('createWindowSessionVar', true);
        }

    }
});

Template.MM_scorecardCollectedIconTemplate.onRendered(function() {
    $('.tooltipped').tooltip({delay: 20, position:'top'});
});
Template.MM_scorecardUncollectedIconTemplate.onRendered(function() {
    $('.tooltipped').tooltip({delay: 20, position:'top'});
});