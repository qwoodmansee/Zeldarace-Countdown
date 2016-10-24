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

        if (timer) {
            var row1 = [];
            row1.push({name: "DekuStick", weight: weights["DekuStick"], tooltip: "Deku Stick"});
            row1.push({name: "DekuNut", weight: weights["DekuNut"], tooltip: "Deku Nut"});
            row1.push({name: "Bomb", weight: weights["Bomb"], tooltip: "Bombs"});
            row1.push({name: "FairyBow", weight: weights["FairyBow"], tooltip: "Fairy Bow"});
            row1.push({name: "FireArrow", weight: weights["FireArrow"], tooltip: "Fire Arrow"});
            row1.push({name: "DinsFire", weight: weights["DinsFire"], tooltip: "Din's Fire"});

            var row2 = [];
            row2.push({name: "FairySlingshot", weight: weights["FairySlingshot"], tooltip: "Fairy Slingshot"});
            row2.push({name: timer.randomItems['ocarina'].name, weight: weights[timer.randomItems['ocarina'].name],
                        tooltip: timer.randomItems['ocarina'].tooltip});
            row2.push({name: "Bombchu", weight: weights["Bombchu"], tooltip: "Bombchu"});
            row2.push({name: timer.randomItems['hookshotOption'].name, weight: weights[timer.randomItems['hookshotOption'].name],
                        tooltip: timer.randomItems['hookshotOption'].tooltip});
            row2.push({name: "IceArrow", weight: weights["IceArrow"], tooltip: "Ice Arrow"});
            row2.push({name: "FaroresWind", weight: weights["FaroresWind"], tooltip: "Farore's Wind"});

            var row3 = [];
            row3.push({name: "Boomerang", weight: weights["Boomerang"], tooltip: "Boomerang"});
            row3.push({name: "LensOfTruth", weight: weights["LensOfTruth"], tooltip: "Lens of Truth"});
            row3.push({name: "MagicBeans", weight: weights["MagicBeans"], tooltip: "Magic Beans"});
            row3.push({name: "MegatonHammer", weight: weights["MegatonHammer"], tooltip: "Megaton Hammer"});
            row3.push({name: "LightArrow", weight: weights["LightArrow"], tooltip: "Light Arrow"});
            row3.push({name: "NayrusLove", weight: weights["NayrusLove"], tooltip: "Nayru's Love"});

            var row4 = [];
            //pick items for the 4 bottles
            for (var i=0; i < 4; i++) {
                row4.push({name: timer.randomItems.bottles[i].name, weight: weights[timer.randomItems.bottles[i].name],
                            tooltip: timer.randomItems.bottles[i].tooltip});
            }

            //pick which adult quest item will be chosen
            row4.push({name: timer.randomItems['adultTrade'].name, weight: weights[timer.randomItems['adultTrade'].name],
                        tooltip:  timer.randomItems['adultTrade'].tooltip});

            //pick which child quest item will be chosen
            row4.push({name: timer.randomItems['childTrade'].name, weight: weights[timer.randomItems['childTrade'].name],
                        tooltip: timer.randomItems['childTrade'].tooltip});

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
                        tooltip: timer.randomItems['quiver'].tooltip});
            row1.push({name: "KokiriSword", weight: weights["KokiriSword"], tooltip: "Kokiri Sword"});
            row1.push({name: "MasterSword", weight: weights["MasterSword"], tooltip: "Master Sword"});
            row1.push({name: timer.randomItems['bigSword'].name, weight: weights[timer.randomItems['bigSword'].name],
                        tooltip: timer.randomItems['bigSword'].tooltip});

            var row2 = [];
            row2.push({name: timer.randomItems['bombBag'].name, weight: weights[timer.randomItems['bombBag'].name],
                        tooltip: timer.randomItems['bombBag'].tooltip});
            row2.push({name: "DekuShield", weight: weights["DekuShield"], tooltip: "Deku Shield"});
            row2.push({name: "HylianShield", weight: weights["HylianShield"], tooltip: "Hylian Shield"});
            row2.push({name: "MirrorShield", weight: weights["MirrorShield"], tooltip: "Mirror Shield"});

            var row3 = [];
            row3.push({name: timer.randomItems['gauntlets'].name, weight: weights[timer.randomItems['gauntlets'].name],
                        tooltip: timer.randomItems['gauntlets'].tooltip});
            row3.push({name: "KokiriTunic", weight: weights["KokiriTunic"], tooltip: "Kokiri Tunic"});
            row3.push({name: "GoronTunic", weight: weights["GoronTunic"], tooltip: "Goron Tunic"});
            row3.push({name: "ZoraTunic", weight: weights["ZoraTunic"], tooltip: "Zora Tunic"});

            var row4 = [];
            row4.push({name: timer.randomItems['scale'].name, weight: weights[timer.randomItems['scale'].name],
                        tooltip: timer.randomItems['scale'].tooltip});
            row4.push({name: "KokiriBoots", weight: weights["KokiriBoots"], tooltip: "Kokiri Boots"});
            row4.push({name: "IronBoots", weight: weights["IronBoots"], tooltip: "Iron Boots"});
            row4.push({name: "HoverBoots", weight: weights["HoverBoots"], tooltip: "Hover Boots"});

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
            {items: [{name: "ZeldasLullaby", weight: weights["ZeldasLullaby"], tooltip: "Zelda's Lullaby"},
                    {name: "EponasSong", weight: weights["EponasSong"], tooltip: "Epona's Song"},
                    {name: "SariasSong", weight: weights["SariasSong"], tooltip: "Saria's Song"},
                    {name: "SunsSong", weight: weights["SunsSong"], tooltip: "Suns Song"},
                    {name: "SongofTime", weight: weights["SongofTime"], tooltip: "Song of Time"},
                    {name: "SongofStorms", weight: weights["SongofStorms"], tooltip: "Song of Storms"}]
            }, {
            items: [{name: "MinuetOfForest", weight: weights["MinuetOfForest"], tooltip: "Minuet of Forest"}, //r2
                    {name: "BoleroOfFire", weight: weights["BoleroOfFire"], tooltip: "Bolero of Fire"},
                    {name: "SerenadeOfWater", weight: weights["SerenadeOfWater"], tooltip: "Serenade of Water"},
                    {name: "RequiemofSpirit", weight: weights["RequiemofSpirit"], tooltip: "Requiem of Spirit"},
                    {name: "NocturneOfShadow", weight: weights["NocturneOfShadow"], tooltip: "Nocturne of Shadow"},
                    {name: "PreludeofLight", weight: weights["PreludeofLight"], tooltip: "Prelude of Light"}]
            }];
    },

    MedallionAndExtraGridRows() {

        var weights = {};
        if (Template.instance().subscriptionsReady()){
            var timer = Timers.findOne();
            weights = timer.weights;
        }
        return [
            {items: [{name: "LightMedallion", weight: weights["LightMedallion"], tooltip: "Light Medallion"},
                {name: "ForestMedallion", weight: weights["ForestMedallion"], tooltip: "Forest Medallion"},
                {name: "FireMedallion", weight: weights["FireMedallion"], tooltip: "Fire Medallion"},
                {name: "WaterMedallion", weight: weights["WaterMedallion"], tooltip: "Water Medallion"},
                {name: "SpiritMedallion", weight: weights["SpiritMedallion"], tooltip: "Spirit Medallion"},
                {name: "ShadowMedallion", weight: weights["ShadowMedallion"], tooltip: "Shadow Medallion"}]
            }, {
                items: [{name: "KokiriEmerald", weight: weights["KokiriEmerald"], tooltip: "Kokiri Emerald"}, //r2
                    {name: "GoronsRuby", weight: weights["GoronsRuby"], tooltip: "Goron's Ruby"},
                    {name: "ZorasSapphire", weight: weights["ZorasSapphire"], tooltip: "Zora's Sapphire"},
                    {name: "StoneofAgony", weight: weights["StoneofAgony"], tooltip: "Stone of Agony"},
                    {name: "GerudoCard", weight: weights["GerudoCard"], tooltip: "Gerudo Card"}]
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
    Tracker.autorun(function () {
        Tracker.afterFlush(function () {
            $('.tooltipped').tooltip({delay: 50});
        });
    });
});

Template.Scorecard.events({
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
});

Template.scorecardIconTemplate.onRendered(function() {
    $('.tooltipped').tooltip({delay: 20, position:'top'});
});