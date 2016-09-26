import { Template } from 'meteor/templating';

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

Template.Scorecard.helpers({

    currentScore() {
        return $('.collected').length;
    },

    itemMenuGridRows(){
        return [
            {items: [{name: "DekuStick"} ,//row one
                    {name: "DekuNut"},
                    {name: "Bomb"},
                    {name: "FairyBow"},
                    {name: "FireArrow"},
                    {name: "DinsFire"}]
            }, {
            items: [{name: "FairySlingshot"}, //r2
                    {name: "OcarinaOfTime"},
                    {name: "Bombchu"},
                    {name: "Longshot"},
                    {name: "IceArrow"},
                    {name: "FaroresWind"}]
            }, {
            items: [{name: "Boomerang"}, //r3
                    {name: "LensOfTruth"},
                    {name: "MagicBeans"},
                    {name: "MegatonHammer"},
                    {name: "LightArrow"},
                    {name: "NayrusLove"}]
            }, {
            items: [{name: "EmptyBottle"}, //r4
                    {name: "RedPotion"},
                    {name: "BottledFairy"},
                    {name: "Bug"},
                    {name: "ClaimCheck"},
                    {name: "MaskOfTruth"}]
            }
        ];
    },

    EquipMenuGridRows(){
        return [{
            items: [{name: "Quiver50"},
                    {name: "KokiriSword"},
                    {name: "MasterSword"},
                    {name: "BiggoronsSword"}]
            }, {
            items: [{name: "BombBag40"},
                    {name: "DekuShield"},
                    {name: "HylianShield"},
                    {name: "MirrorShield"}]
            }, {
            items: [{name: "GoldenGauntlets"},
                    {name: "KokiriTunic"},
                    {name: "GoronTunic"},
                    {name: "ZoraTunic"}]
            }, {
            items: [{name: "GoldScale"},
                    {name: "KokiriBoots"}, //r4
                    {name: "HoverBoots"},
                    {name: "IronBoots"}]
            }
        ];
    },

    SongGridRows() {
        return [
            {items: [{name: "ZeldasLullaby"},
                    {name: "EponasSong"},
                    {name: "SariasSong"},
                    {name: "SunsSong"},
                    {name: "SongofTime"},
                    {name: "SongofStorms"}]
            }, {
            items: [{name: "MinuetOfForest"}, //r2
                    {name: "BoleroOfFire"},
                    {name: "SerenadeOfWater"},
                    {name: "RequiemofSpirit"},
                    {name: "NocturneOfShadow"},
                    {name: "PreludeofLight"}]
            }];
    },

    MedallionAndExtraGridRows() {
        return [
            {items: [{name: "LightMedallion"},
                {name: "ForestMedallion"},
                {name: "FireMedallion"},
                {name: "WaterMedallion"},
                {name: "SpiritMedallion"},
                {name: "ShadowMedallion"}]
            }, {
                items: [{name: "KokiriEmerald"}, //r2
                    {name: "GoronsRuby"},
                    {name: "ZorasSapphire"},
                    {name: "StoneofAgony"},
                    {name: "GerudoCard"},
                    {name: "GoldSkulltula"}]
            }];
    }
});

Template.Scorecard.onRendered(function() {
   $('.scorecard-item').click(function() {
        var object = $(this);
        if (object.hasClass('collected')) {
            object.removeClass('collected');
        } else {
            object.addClass('collected');
        }
    });
});

const equipMenuGridItems = [

];

const songs = [

];