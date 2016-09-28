import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import {Timers} from '../../../api/timers/Timers.js';

import './Scorecard.html'
import './Scorecard.css'

const itemMenuItems = [
    {name: "AdultsWallet"},
    {name: "BigPoe"},
    {name: "BlueFire"},
    {name: "BluePotion"},
    {name: "BombBag20"},
    {name: "BombBag30"},
    {name: "BossKey"},
    {name: "BulletBag30"},
    {name: "BulletBag40"},
    {name: "BulletBag50"},
    {name: "BunnyHood"},
    {name: "Cojiro"},
    {name: "Compass"},
    {name: "Cucco"},
    {name: "DekuSeeds"},
    {name: "DungeonMap"},
    {name: "EyeballFrog"},
    {name: "Eyedrops"},
    {name: "FairyOcarina"},
    {name: "Fish"},
    {name: "FishingPole"},
    {name: "GerudoMask"},
    {name: "GiantsWallet"},
    {name: "GoronBracelet"},
    {name: "GoronMask"},
    {name: "GoronsSwordBroken"},
    {name: "GrayNote"},
    {name: "GreenPotion"},
    {name: "HeartContainer"},
    {name: "HeartPiece"},
    {name: "Hookshot"},
    {name: "KeatonMask"},
    {name: "Milk"},
    {name: "MilkHalf"},
    {name: "OddMushroom"},
    {name: "OddPotion"},
    {name: "PoachersSaw"},
    {name: "Poe"},
    {name: "Prescription"},
    {name: "Quiver30"},
    {name: "Quiver40"},
    {name: "RupeeIcon"},
    {name: "RutosLetter"},
    {name: "SilverGauntlets"},
    {name: "SilverScale"},
    {name: "SkullMask"},
    {name: "SmallKey"},
    {name: "SOLDOUT"},
    {name: "SpookyMask"},
    {name: "WeirdEgg"},
    {name: "ZeldasLetter"},
    {name: "ZoraMask"},
];

Template.Scorecard.onCreated(function() {
    var self = this;
    self.subscribe('singleTimer',  FlowRouter.getParam('username'));
    self.currentScore = new ReactiveVar(0);
});

Template.Scorecard.helpers({

    currentScore() {
        return Template.instance().currentScore.get();
    },

    itemMenuGridRows(){

        var weights = {};
        if (Template.instance().subscriptionsReady()){
            var timer = Timers.findOne();
            weights = timer.weights;
        }
        return [
            {items: [{name: "DekuStick", weight: weights["DekuStick"]} ,//row one
                    {name: "DekuNut", weight: weights["DekuNut"]},
                    {name: "Bomb", weight: weights["Bomb"]},
                    {name: "FairyBow", weight: weights["FairyBow"]},
                    {name: "FireArrow", weight: weights["FireArrow"]},
                    {name: "DinsFire", weight: weights["DinsFire"]}],
            }, {
            items: [{name: "FairySlingshot", weight: weights["FairySlingshot"]}, //r2
                    {name: "OcarinaOfTime", weight: weights["OcarinaOfTime"]},
                    {name: "Bombchu", weight: weights["Bombchu"]},
                    {name: "Longshot", weight: weights["Longshot"]},
                    {name: "IceArrow", weight: weights["IceArrow"]},
                    {name: "FaroresWind", weight: weights["FaroresWind"]}]
            }, {
            items: [{name: "Boomerang", weight: weights["Boomerang"]}, //r3
                    {name: "LensOfTruth", weight: weights["LensOfTruth"]},
                    {name: "MagicBeans", weight: weights["MagicBeans"]},
                    {name: "MegatonHammer", weight: weights["MegatonHammer"]},
                    {name: "LightArrow", weight: weights["LightArrow"]},
                    {name: "NayrusLove", weight: weights["NayrusLove"]}]
            }, {
            items: [{name: "EmptyBottle", weight: weights["EmptyBottle"]}, //r4
                    {name: "RedPotion", weight: weights["RedPotion"]},
                    {name: "BottledFairy", weight: weights["BottledFairy"]},
                    {name: "Bug", weight: weights["Bug"]},
                    {name: "ClaimCheck", weight: weights["ClaimCheck"]},
                    {name: "MaskOfTruth", weight: weights["MaskOfTruth"]}]
            }
        ];
    },

    EquipMenuGridRows(){

        var weights = {};
        if (Template.instance().subscriptionsReady()){
            var timer = Timers.findOne();
            weights = timer.weights;
        }
        return [{
            items: [{name: "Quiver50", weight: weights["Quiver50"]},
                    {name: "KokiriSword", weight: weights["KokiriSword"]},
                    {name: "MasterSword", weight: weights["MasterSword"]},
                    {name: "BiggoronsSword", weight: weights["BiggoronsSword"]}]
            }, {
            items: [{name: "BombBag40", weight: weights["BombBag40"]},
                    {name: "DekuShield", weight: weights["DekuShield"]},
                    {name: "HylianShield", weight: weights["HylianShield"]},
                    {name: "MirrorShield", weight: weights["MirrorShield"]}]
            }, {
            items: [{name: "GoldenGauntlets", weight: weights["GoldenGauntlets"]},
                    {name: "KokiriTunic", weight: weights["KokiriTunic"]},
                    {name: "GoronTunic", weight: weights["GoronTunic"]},
                    {name: "ZoraTunic", weight: weights["ZoraTunic"]}]
            }, {
            items: [{name: "GoldScale", weight: weights["GoldScale"]},
                    {name: "KokiriBoots", weight: weights["KokiriBoots"]}, //r4
                    {name: "HoverBoots", weight: weights["HoverBoots"]},
                    {name: "IronBoots", weight: weights["IronBoots"]}]
            }
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
                    {name: "GerudoCard", weight: weights["GerudoCard"]},
                    {name: "GoldSkulltula", weight: weights["GoldSkulltula"]}]
            }];
    }
});

Template.Scorecard.onRendered(function() {
   $('.scorecard-item').click(function() {
       var object = $(this);
       var counter =  $('#score-counter');
        if (object.hasClass('collected')) {
            object.removeClass('collected');
            counter.text(parseInt(counter.text()) - parseInt(object[0].dataset.weight));
        } else {
            object.addClass('collected');
            counter.text(parseInt(counter.text()) + parseInt(object[0].dataset.weight));
        }
    });
});

Template.Scorecard.events({
   'click #score-reset-button' : function() {
       $('.scorecard-item').removeClass('collected');
       $('#score-counter').text('0');
   }
});