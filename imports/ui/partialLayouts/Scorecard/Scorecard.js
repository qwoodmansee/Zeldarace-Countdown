import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import {Timers} from '../../../api/timers/Timers.js';
import {PageViewers} from '../../../api/pageViewers/PageViewers.js';

import './Scorecard.html'
import './Scorecard.css'

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


Template.Scorecard.onCreated(function() {
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

    self.subscribe('singleTimer',  FlowRouter.getParam('username'));
    self.subscribe('pageViewers');
    Session.set('score', 0);
});

Template.Scorecard.helpers({

    CurrentScore() {
        return Session.get('score');
    },

    itemMenuGridRows(){

        var weights = {};
        if (Template.instance().subscriptionsReady()){
            var timer = Timers.findOne();
            weights = timer.weights;
        }

        var row1 = [];
        row1.push({name: "DekuStick", weight: weights["DekuStick"]});
        row1.push({name: "DekuNut", weight: weights["DekuNut"]});
        row1.push({name: "Bomb", weight: weights["Bomb"]});
        row1.push({name: "FairyBow", weight: weights["FairyBow"]});
        row1.push({name: "FireArrow", weight: weights["FireArrow"]});
        row1.push({name: "DinsFire", weight: weights["DinsFire"]});

        var row2 = [];
        row2.push({name: "FairySlingshot", weight: weights["FairySlingshot"]});
        if (Math.random()*2 > 1) {
            row2.push({name: "OcarinaOfTime", weight: weights["OcarinaOfTime"]});
        } else {
            row2.push({name: "FairyOcarina", weight: weights["FairyOcarina"]});
        }
        row2.push({name: "Bombchu", weight: weights["Bombchu"]});
        if (Math.random()*2 > 1) {
            row2.push({name: "Hookshot", weight: weights["Hookshot"]});
        } else {
            row2.push({name: "Longshot", weight: weights["Longshot"]});
        }
        row2.push({name: "IceArrow", weight: weights["IceArrow"]});
        row2.push({name: "FaroresWind", weight: weights["FaroresWind"]});

        var row3 = [];
        row3.push({name: "Boomerang", weight: weights["Boomerang"]});
        row3.push({name: "LensOfTruth", weight: weights["LensOfTruth"]});
        row3.push({name: "MagicBeans", weight: weights["MagicBeans"]});
        row3.push({name: "MegatonHammer", weight: weights["MegatonHammer"]});
        row3.push({name: "LightArrow", weight: weights["LightArrow"]});
        row3.push({name: "NayrusLove", weight: weights["NayrusLove"]});

        var idx;
        var row4 = [];
        //determine what will be in the bottles
        var bottleOptions = ["EmptyBottle", "RedPotion", "BottledFairy", "Bug", "BigPoe", "BlueFire", "BluePotion",
            "Fish", "GreenPotion", "Milk", "MilkHalf", "Poe", "RutosLetter"];
        //pick items for the 4 bottles
        for (var i=0; i < 4; i++) {
            //get the index of which item we are using
            idx = Template.instance().generateRandomNumber(0, bottleOptions.length, false);
            row4.push({name: bottleOptions[idx], weight: weights[bottleOptions[idx]]});
            bottleOptions.splice(idx, 1);
        }

        //pick which adult quest item will be chosen
        var adultQuestOptions = ["Cojiro", "OddMushroom", "OddPotion", "PoachersSaw", "Prescription", "GoronsSwordBroken",
            "ClaimCheck", "WeirdEgg"];
        idx = Template.instance().generateRandomNumber(0, adultQuestOptions.length, false);
        row4.push({name: adultQuestOptions[idx], weight: weights[adultQuestOptions[idx]]});

        //pick which child quest item will be chosen
        var childQuestOptions = ["KeatonMask", "SkullMask", "SpookyMask", "BunnyHood", "ZoraMask", "GoronMask", "GerudoMask",
            "MaskOfTruth", "ZeldasLetter", "SOLDOUT", "WeirdEgg", "Cucco"];
        idx = Template.instance().generateRandomNumber(0, childQuestOptions.length, false);
        row4.push({name: childQuestOptions[idx], weight: weights[childQuestOptions[idx]]});


        return [
            {items: row1},
            {items: row2},
            {items: row3},
            {items: row4}
        ];
    },

    EquipMenuGridRows(){

        var weights = {};
        if (Template.instance().subscriptionsReady()){
            var timer = Timers.findOne();
            weights = timer.weights;
        }

        var idx;
        var row1 = [];
        var quiverOptions = ["Quiver30", "Quiver40", "Quiver50"];
        idx = Template.instance().generateRandomNumber(0, quiverOptions.length, false);
        row1.push({name: quiverOptions[idx], weight: weights[quiverOptions[idx]]});
        row1.push({name: "KokiriSword", weight: weights["KokiriSword"]});
        row1.push({name: "MasterSword", weight: weights["MasterSword"]});
        var bigSwordOptions = ["GoronsSwordBroken", "BiggoronsSword"];
        idx = Template.instance().generateRandomNumber(0, bigSwordOptions.length, false);
        row1.push({name: bigSwordOptions[idx], weight: weights[bigSwordOptions[idx]]});

        var row2 = [];
        var bombBagOptions = ["BombBag20", "BombBag30", "BombBag40"];
        idx = Template.instance().generateRandomNumber(0, bombBagOptions.length, false);
        row2.push({name: bombBagOptions[idx], weight: weights[bombBagOptions[idx]]});
        row2.push({name: "DekuShield", weight: weights["DekuShield"]});
        row2.push({name: "HylianShield", weight: weights["HylianShield"]});
        row2.push({name: "MirrorShield", weight: weights["MirrorShield"]});

        var row3 = [];
        var gauntletOptions = ["GoronBracelet", "SilverGauntlets", "GoldenGauntlets"];
        idx = Template.instance().generateRandomNumber(0, gauntletOptions.length, false);
        row3.push({name: gauntletOptions[idx], weight: weights[gauntletOptions[idx]]});
        row3.push({name: "KokiriTunic", weight: weights["KokiriTunic"]});
        row3.push({name: "GoronTunic", weight: weights["GoronTunic"]});
        row3.push({name: "ZoraTunic", weight: weights["ZoraTunic"]});

        var row4 = [];
        var scaleOptions = ["SilverScale", "GoldScale"];
        idx = Template.instance().generateRandomNumber(0, scaleOptions.length, false);
        row4.push({name: scaleOptions[idx], weight: weights[scaleOptions[idx]]});
        row4.push({name: "KokiriBoots", weight: weights["KokiriBoots"]});
        row4.push({name: "IronBoots", weight: weights["IronBoots"]});
        row4.push({name: "HoverBoots", weight: weights["HoverBoots"]});



        return [
            {items: row1},
            {items: row2},
            {items: row3},
            {items: row4}
        ];
    },

    SongGridRows() {

        var weights = {};
        if (Template.instance().subscriptionsReady()){
            var timer = Timers.findOne();
            weights = timer.weights;
        }
        return [
            {items: [{name: "ZeldasLullaby", weight: weights["ZeldasLullaby"]},
                    {name: "EponasSong", weight: weights["EponasSong"]},
                    {name: "SariasSong", weight: weights["SariasSong"]},
                    {name: "SunsSong", weight: weights["SunsSong"]},
                    {name: "SongofTime", weight: weights["SongofTime"]},
                    {name: "SongofStorms", weight: weights["SongofStorms"]}]
            }, {
            items: [{name: "MinuetOfForest", weight: weights["MinuetOfForest"]}, //r2
                    {name: "BoleroOfFire", weight: weights["BoleroOfFire"]},
                    {name: "SerenadeOfWater", weight: weights["SerenadeOfWater"]},
                    {name: "RequiemofSpirit", weight: weights["RequiemofSpirit"]},
                    {name: "NocturneOfShadow", weight: weights["NocturneOfShadow"]},
                    {name: "PreludeofLight", weight: weights["PreludeofLight"]}]
            }];
    },

    MedallionAndExtraGridRows() {

        var weights = {};
        if (Template.instance().subscriptionsReady()){
            var timer = Timers.findOne();
            weights = timer.weights;
        }
        return [
            {items: [{name: "LightMedallion", weight: weights["LightMedallion"]},
                {name: "ForestMedallion", weight: weights["ForestMedallion"]},
                {name: "FireMedallion", weight: weights["FireMedallion"]},
                {name: "WaterMedallion", weight: weights["WaterMedallion"]},
                {name: "SpiritMedallion", weight: weights["SpiritMedallion"]},
                {name: "ShadowMedallion", weight: weights["ShadowMedallion"]}]
            }, {
                items: [{name: "KokiriEmerald", weight: weights["KokiriEmerald"]}, //r2
                    {name: "GoronsRuby", weight: weights["GoronsRuby"]},
                    {name: "ZorasSapphire", weight: weights["ZorasSapphire"]},
                    {name: "StoneofAgony", weight: weights["StoneofAgony"]},
                    {name: "GerudoCard", weight: weights["GerudoCard"]}]
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

Template.Scorecard.onRendered(function() {
   $('.scorecard-item').click(function() {
       var object = $(this).children('img');
        if (object.hasClass('collected')) {
            object.removeClass('collected');
            Session.set('score', Session.get('score') - parseInt($(this)[0].dataset.weight))
        } else {
            object.addClass('collected');
            Session.set('score', Session.get('score') + parseInt($(this)[0].dataset.weight))
        }
       //get page viewer for this user
       var pageViewer;
       if (Meteor.user()) {
           pageViewer = PageViewers.findOne({username: Meteor.user().profile.name, ownerUsername: FlowRouter.getParam('username')});
           PageViewers.update(pageViewer._id,{
               $set: {'score': Session.get('score')}
           });
       }
    });
});

Template.Scorecard.events({
   'click #score-reset-button' : function() {
       $('.scorecard-item').children('img').removeClass('collected');
       Session.set('score', 0);
       Template.instance().rupees.set(0);
       Template.instance().heartContainers.set(3);
       Template.instance().goldSkulls.set(0);

       //get page viewer for this user
       var pageViewer;
       if (Meteor.user()) {
           pageViewer = PageViewers.findOne({
               viewer: Meteor.user().profile.name,
               owner: FlowRouter.getParam('username')
           });
           PageViewers.update(pageViewer._id, {
               $set: {'score': Session.get('score')}
           });
       }
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
});