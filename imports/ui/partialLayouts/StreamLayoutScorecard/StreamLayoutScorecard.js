import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import {Timers} from '../../../api/timers/Timers.js';
import {PageViewers} from '../../../api/pageViewers/PageViewers.js';

import './StreamLayoutScorecard.html'
import './StreamLayoutScorecard.css'

const itemMenuItems = [
    {name: "AdultsWallet"},
    {name: "BossKey"},
    {name: "BulletBag30"},
    {name: "BulletBag40"},
    {name: "BulletBag50"},
    {name: "Compass"},
    {name: "DekuSeeds"},
    {name: "DungeonMap"},
    {name: "EyeballFrog"},
    {name: "Eyedrops"},
    {name: "FishingPole"},
    {name: "GiantsWallet"},
    {name: "HeartContainer"},
    {name: "HeartPiece"},
    {name: "Quiver30"},
    {name: "Quiver40"},
    {name: "RupeeIcon"},
    {name: "SilverScale"},
    {name: "SmallKey"},
];


Template.StreamLayoutScorecard.onCreated(function() {
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

Template.StreamLayoutScorecard.helpers({

    CurrentScore() {
        return Session.get('score');
    },

    // returns whether or not a scorecard item has been obtained based on it's index
    scoreCardItemObtained(scorecardIndex) {
        var scorecardValues = Template.instance().scorecardValues.get();
        if (scorecardIndex < 63) {
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
            row1.push({name: "DekuStick", weight: weights["DekuStick"], tooltip: "Deku Stick", scoreCardIndex: 0});
            row1.push({name: "DekuNut", weight: weights["DekuNut"], tooltip: "Deku Nut", scoreCardIndex: 1});
            row1.push({name: "Bomb", weight: weights["Bomb"], tooltip: "Bombs", scoreCardIndex: 2});
            row1.push({name: "FairyBow", weight: weights["FairyBow"], tooltip: "Fairy Bow", scoreCardIndex: 3});
            row1.push({name: "FireArrow", weight: weights["FireArrow"], tooltip: "Fire Arrow", scoreCardIndex: 4});
            row1.push({name: "DinsFire", weight: weights["DinsFire"], tooltip: "Din's Fire", scoreCardIndex: 5});

            var row2 = [];
            row2.push({name: "FairySlingshot", weight: weights["FairySlingshot"], tooltip: "Fairy Slingshot",
                scoreCardIndex: 6});
            row2.push({name: timer.randomItems['ocarina'].name, weight: weights[timer.randomItems['ocarina'].name],
                        tooltip: timer.randomItems['ocarina'].tooltip, scoreCardIndex: 7});
            row2.push({name: "Bombchu", weight: weights["Bombchu"], tooltip: "Bombchu", scoreCardIndex: 8});
            row2.push({name: timer.randomItems['hookshotOption'].name, weight: weights[timer.randomItems['hookshotOption'].name],
                        tooltip: timer.randomItems['hookshotOption'].tooltip, scoreCardIndex: 9});
            row2.push({name: "IceArrow", weight: weights["IceArrow"], tooltip: "Ice Arrow", scoreCardIndex: 10});
            row2.push({name: "FaroresWind", weight: weights["FaroresWind"], tooltip: "Farore's Wind",
                scoreCardIndex: 11});

            var row3 = [];
            row3.push({name: "Boomerang", weight: weights["Boomerang"], tooltip: "Boomerang", scoreCardIndex: 12});
            row3.push({name: "LensOfTruth", weight: weights["LensOfTruth"], tooltip: "Lens of Truth", scoreCardIndex: 13});
            row3.push({name: "MagicBeans", weight: weights["MagicBeans"], tooltip: "Magic Beans", scoreCardIndex: 14});
            row3.push({name: "MegatonHammer", weight: weights["MegatonHammer"], tooltip: "Megaton Hammer", scoreCardIndex: 15});
            row3.push({name: "LightArrow", weight: weights["LightArrow"], tooltip: "Light Arrow", scoreCardIndex: 16});
            row3.push({name: "NayrusLove", weight: weights["NayrusLove"], tooltip: "Nayru's Love", scoreCardIndex: 17});

            var row4 = [];
            //pick items for the 4 bottles
            for (var i=0; i < 4; i++) {
                row4.push({name: timer.randomItems.bottles[i].name, weight: weights[timer.randomItems.bottles[i].name],
                            tooltip: timer.randomItems.bottles[i].tooltip, scoreCardIndex: 18 + i});
            }

            //pick which adult quest item will be chosen
            row4.push({name: timer.randomItems['adultTrade'].name, weight: weights[timer.randomItems['adultTrade'].name],
                        tooltip:  timer.randomItems['adultTrade'].tooltip, scoreCardIndex: 22});

            //pick which child quest item will be chosen
            row4.push({name: timer.randomItems['childTrade'].name, weight: weights[timer.randomItems['childTrade'].name],
                        tooltip: timer.randomItems['childTrade'].tooltip, scoreCardIndex: 23});

            return [
                {items: row1},
                {items: row2},
                {items: row3},
                {items: row4}
            ];
        }

    },

    EquipMenuGridRows(){

        var weights = {};
        if (Template.instance().subscriptionsReady()){
            var timer = Timers.findOne();
            weights = timer.weights;
        }

        if (timer) {
            var row1 = [];
            row1.push({name: timer.randomItems['quiver'].name, weight: weights[timer.randomItems['quiver'].name],
                        tooltip: timer.randomItems['quiver'].tooltip, scoreCardIndex: 24});
            row1.push({name: "KokiriSword", weight: weights["KokiriSword"], tooltip: "Kokiri Sword", scoreCardIndex: 25});
            row1.push({name: "MasterSword", weight: weights["MasterSword"], tooltip: "Master Sword", scoreCardIndex: 26});
            row1.push({name: timer.randomItems['bigSword'].name, weight: weights[timer.randomItems['bigSword'].name],
                        tooltip: timer.randomItems['bigSword'].tooltip, scoreCardIndex: 27});

            var row2 = [];
            row2.push({name: timer.randomItems['bombBag'].name, weight: weights[timer.randomItems['bombBag'].name],
                        tooltip: timer.randomItems['bombBag'].tooltip, scoreCardIndex: 28});
            row2.push({name: "DekuShield", weight: weights["DekuShield"], tooltip: "Deku Shield", scoreCardIndex: 29});
            row2.push({name: "HylianShield", weight: weights["HylianShield"], tooltip: "Hylian Shield", scoreCardIndex: 30});
            row2.push({name: "MirrorShield", weight: weights["MirrorShield"], tooltip: "Mirror Shield", scoreCardIndex: 31});

            var row3 = [];
            row3.push({name: timer.randomItems['gauntlets'].name, weight: weights[timer.randomItems['gauntlets'].name],
                        tooltip: timer.randomItems['gauntlets'].tooltip, scoreCardIndex: 32});
            row3.push({name: "KokiriTunic", weight: weights["KokiriTunic"], tooltip: "Kokiri Tunic", scoreCardIndex: 33});
            row3.push({name: "GoronTunic", weight: weights["GoronTunic"], tooltip: "Goron Tunic", scoreCardIndex: 34});
            row3.push({name: "ZoraTunic", weight: weights["ZoraTunic"], tooltip: "Zora Tunic", scoreCardIndex: 35});

            var row4 = [];
            row4.push({name: timer.randomItems['scale'].name, weight: weights[timer.randomItems['scale'].name],
                        tooltip: timer.randomItems['scale'].tooltip, scoreCardIndex: 36});
            row4.push({name: "KokiriBoots", weight: weights["KokiriBoots"], tooltip: "Kokiri Boots", scoreCardIndex: 37});
            row4.push({name: "IronBoots", weight: weights["IronBoots"], tooltip: "Iron Boots", scoreCardIndex: 38});
            row4.push({name: "HoverBoots", weight: weights["HoverBoots"], tooltip: "Hover Boots", scoreCardIndex: 39});

            return [
                {items: row1},
                {items: row2},
                {items: row3},
                {items: row4}
            ];
        }
    },

    SongGridRows() {

        var weights = {};
        if (Template.instance().subscriptionsReady()){
            var timer = Timers.findOne();
            weights = timer.weights;
        }
        return [
            {items: [{name: "ZeldasLullaby", weight: weights["ZeldasLullaby"], tooltip: "Zelda's Lullaby",
                        scoreCardIndex: 40},
                    {name: "EponasSong", weight: weights["EponasSong"], tooltip: "Epona's Song",
                        scoreCardIndex: 41},
                    {name: "SariasSong", weight: weights["SariasSong"], tooltip: "Saria's Song",
                        scoreCardIndex: 42},
                    {name: "SunsSong", weight: weights["SunsSong"], tooltip: "Suns Song",
                        scoreCardIndex: 43},
                    {name: "SongofTime", weight: weights["SongofTime"], tooltip: "Song of Time",
                        scoreCardIndex: 44},
                    {name: "SongofStorms", weight: weights["SongofStorms"], tooltip: "Song of Storms",
                        scoreCardIndex: 45}]
            }, {
            items: [{name: "MinuetOfForest", weight: weights["MinuetOfForest"], tooltip: "Minuet of Forest",
                        scoreCardIndex: 46}, //r2
                    {name: "BoleroOfFire", weight: weights["BoleroOfFire"], tooltip: "Bolero of Fire",
                        scoreCardIndex: 47},
                    {name: "SerenadeOfWater", weight: weights["SerenadeOfWater"], tooltip: "Serenade of Water",
                        scoreCardIndex: 48},
                    {name: "RequiemofSpirit", weight: weights["RequiemofSpirit"], tooltip: "Requiem of Spirit",
                        scoreCardIndex: 49},
                    {name: "NocturneOfShadow", weight: weights["NocturneOfShadow"], tooltip: "Nocturne of Shadow",
                        scoreCardIndex: 50},
                    {name: "PreludeofLight", weight: weights["PreludeofLight"], tooltip: "Prelude of Light",
                        scoreCardIndex: 51}]
            }];
    },

    MedallionAndExtraGridRows() {

        var weights = {};
        if (Template.instance().subscriptionsReady()){
            var timer = Timers.findOne();
            weights = timer.weights;
        }
        return [
            {items: [{name: "LightMedallion", weight: weights["LightMedallion"], tooltip: "Light Medallion",
                    scoreCardIndex: 52},
                {name: "ForestMedallion", weight: weights["ForestMedallion"], tooltip: "Forest Medallion",
                    scoreCardIndex: 53},
                {name: "FireMedallion", weight: weights["FireMedallion"], tooltip: "Fire Medallion",
                    scoreCardIndex: 54},
                {name: "WaterMedallion", weight: weights["WaterMedallion"], tooltip: "Water Medallion",
                    scoreCardIndex: 55},
                {name: "SpiritMedallion", weight: weights["SpiritMedallion"], tooltip: "Spirit Medallion",
                    scoreCardIndex: 56},
                {name: "ShadowMedallion", weight: weights["ShadowMedallion"], tooltip: "Shadow Medallion",
                    scoreCardIndex: 57}]
            }, {
                items: [{name: "KokiriEmerald", weight: weights["KokiriEmerald"], tooltip: "Kokiri Emerald",
                        scoreCardIndex: 58}, //r2
                    {name: "GoronsRuby", weight: weights["GoronsRuby"], tooltip: "Goron's Ruby",
                        scoreCardIndex: 59},
                    {name: "ZorasSapphire", weight: weights["ZorasSapphire"], tooltip: "Zora's Sapphire",
                        scoreCardIndex: 60},
                    {name: "StoneofAgony", weight: weights["StoneofAgony"], tooltip: "Stone of Agony",
                        scoreCardIndex: 61},
                    {name: "GerudoCard", weight: weights["GerudoCard"], tooltip: "Gerudo Card",
                        scoreCardIndex: 62}]
            }];
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

Template.StreamLayoutScorecard.onRendered(function() {
    Tracker.autorun(function () {
        Tracker.afterFlush(function () {
            $('.tooltipped').tooltip({delay: 50});
        });
    });

    $('.resizable-scorecard').resizable({
        handles: "n, e, s, w, ne, se, sw, nw"
    });
});

Template.StreamLayoutScorecard.events({
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

   'contextmenu #gold-skull-text' : function(event){
       event.preventDefault();
       var temp = Template.instance().goldSkulls.get();
       Template.instance().goldSkulls.set(temp - 1);
       if ((temp) % 3 === 0) {
           temp = Session.get('score');
           Session.set('score', temp - 1);
       }
   },

   'click #gold-skull-text' : function(){
       var temp = Template.instance().goldSkulls.get();
       Template.instance().goldSkulls.set(temp + 1);
       if ((temp + 1) % 3 === 0) {
           temp = Session.get('score');
           Session.set('score', temp + 1);
       }
   },

    'contextmenu #rupee-text' : function(event){
        event.preventDefault();
        var temp = Template.instance().rupees.get();
        if (temp > 0){
            Template.instance().rupees.set(temp - 100);
            temp = Session.get('score');
            Session.set('score', temp - 1);
        }
    },

    'click #rupee-text' : function(){
        var temp = Template.instance().rupees.get();
        if (temp < 500) {
            Template.instance().rupees.set(temp + 100);
            temp = Session.get('score');
            Session.set('score', temp + 1);
        }
    },

    'click #heart-container-text': function() {
        var temp = Template.instance().heartContainers.get();
        Template.instance().heartContainers.set(temp + 1);
        temp = Session.get('score');
        Session.set('score', temp + 1);
    },

    'contextmenu #heart-container-text': function(event) {
        event.preventDefault();
        var temp = Template.instance().heartContainers.get();
        Template.instance().heartContainers.set(temp - 1);
        temp = Session.get('score');
        Session.set('score', temp - 1);
    }
});

Template.streamLayoutScorecardCollectedIconTemplate.onRendered(function() {
    $('.tooltipped').tooltip({delay: 20, position:'top'});
});
Template.streamLayoutScorecardUncollectedIconTemplate.onRendered(function() {
    $('.tooltipped').tooltip({delay: 20, position:'top'});
});