export const ItemList = function() {
    var self = this;
    self.allItems = [
        "AdultsWallet",
        "BiggoronsSword",
        "BigPoe",
        "BlueFire",
        "BluePotion",
        "BoleroOfFire",
        "Bomb",
        "BombBag20",
        "BombBag30",
        "BombBag40",
        "Bombchu",
        "Boomerang",
        "BossKey",
        "BottledFairy",
        "Bug",
        "BulletBag30",
        "BulletBag40",
        "BulletBag50",
        "BunnyHood",
        "ClaimCheck",
        "Cojiro",
        "Compass",
        "Cucco",
        "DekuNut",
        "DekuSeeds",
        "DekuShield",
        "DekuStick",
        "DinsFire",
        "DungeonMap",
        "EmptyBottle",
        "EponasSong",
        "EyeballFrog",
        "Eyedrops",
        "FairyBow",
        "FairyOcarina",
        "FairySlingshot",
        "FaroresWind",
        "FireArrow",
        "FireMedallion",
        "Fish",
        "FishingPole",
        "ForestMedallion",
        "GerudoCard",
        "GerudoMask",
        "GiantsWallet",
        "GoldenGauntlets",
        "GoldScale",
        "GoldSkulltula",
        "GoronBracelet",
        "GoronMask",
        "GoronsRuby",
        "GoronsSwordBroken",
        "GoronTunic",
        "GrayNote",
        "GreenPotion",
        "HeartContainer",
        "HeartPiece",
        "Hookshot",
        "HoverBoots",
        "HylianShield",
        "IceArrow",
        "IronBoots",
        "KeatonMask",
        "KokiriBoots",
        "KokiriEmerald",
        "KokiriSword",
        "KokiriTunic",
        "LensOfTruth",
        "LightArrow",
        "LightMedallion",
        "Longshot",
        "MagicBeans",
        "MaskOfTruth",
        "MasterSword",
        "MegatonHammer",
        "Milk",
        "MilkHalf",
        "MinuetOfForest",
        "MirrorShield",
        "NayrusLove",
        "NocturneOfShadow",
        "OcarinaOfTime",
        "OddMushroom",
        "OddPotion",
        "PoachersSaw",
        "Poe",
        "PreludeofLight",
        "Prescription",
        "Quiver30",
        "Quiver40",
        "Quiver50",
        "RedPotion",
        "RequiemofSpirit",
        "RupeeIcon",
        "RutosLetter",
        "SariasSong",
        "SerenadeOfWater",
        "ShadowMedallion",
        "SilverGauntlets",
        "SilverScale",
        "SkullMask",
        "SmallKey",
        "SOLDOUT",
        "SongofStorms",
        "SongofTime",
        "SpiritMedallion",
        "SpookyMask",
        "StoneofAgony",
        "SunsSong",
        "WaterMedallion",
        "WeirdEgg",
        "ZeldasLullaby",
        "ZeldasLetter",
        "ZoraMask",
        "ZorasSapphire",
        "ZoraTunic"
    ];

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

    self.generateMultiItemChoices = function() {
        var newObject = {};

        //decide ocarina
        if (Math.random()*2 > 1) {
            newObject.ocarina = {name: "OcarinaOfTime"};
        } else {
            newObject.ocarina = {name: "FairyOcarina"};
        }

        //hookshot/longshot
        if (Math.random()*2 > 1) {
            newObject.hookshotOption = {name: "Hookshot"};
        } else {
            newObject.hookshotOption = {name: "Longshot"};
        }

        //bottles
        var bottlesArray = [];
        var bottleOptions = ["EmptyBottle", "RedPotion", "BottledFairy", "Bug", "BigPoe", "BlueFire", "BluePotion",
            "Fish", "GreenPotion", "Milk", "MilkHalf", "Poe", "RutosLetter"];
        //pick items for the 4 bottles
        for (var i=0; i < 4; i++) {
            //get the index of which item we are using
            idx = self.generateRandomNumber(0, bottleOptions.length, false);
            bottlesArray.push({name: bottleOptions[idx]});
            bottleOptions.splice(idx, 1);
        }
        newObject.bottles = bottlesArray;

        //adult trade
        var adultQuestOptions = ["Cojiro", "OddMushroom", "OddPotion", "PoachersSaw", "Prescription", "GoronsSwordBroken",
            "ClaimCheck", "WeirdEgg"];
        idx = self.generateRandomNumber(0, adultQuestOptions.length, false);
        newObject.adultTrade = {name: adultQuestOptions[idx]};

        //child trade
        var childQuestOptions = ["KeatonMask", "SkullMask", "SpookyMask", "BunnyHood", "ZoraMask", "GoronMask", "GerudoMask",
            "MaskOfTruth", "ZeldasLetter", "SOLDOUT", "WeirdEgg", "Cucco"];
        idx = self.generateRandomNumber(0, childQuestOptions.length, false);
        newObject.childTrade = {name: childQuestOptions[idx]};

        //decide quiver
        var quiverOptions = ["Quiver30", "Quiver40", "Quiver50"];
        var idx = self.generateRandomNumber(0, quiverOptions.length, false);
        newObject.quiver = {name: quiverOptions[idx]};

        //large sword
        var bigSwordOptions = ["GoronsSwordBroken", "BiggoronsSword"];
        idx = self.generateRandomNumber(0, bigSwordOptions.length, false);
        newObject.bigSword = {name: bigSwordOptions[idx]};

        //bomb bag
        var bombBagOptions = ["BombBag20", "BombBag30", "BombBag40"];
        idx = self.generateRandomNumber(0, bombBagOptions.length, false);
        newObject.bombBag = {name: bombBagOptions[idx]};

        //gauntlet options
        var gauntletOptions = ["GoronBracelet", "SilverGauntlets", "GoldenGauntlets"];
        idx = self.generateRandomNumber(0, gauntletOptions.length, false);
        newObject.gauntlets = {name: gauntletOptions[idx]};

        //scale
        var scaleOptions = ["SilverScale", "GoldScale"];
        idx = self.generateRandomNumber(0, scaleOptions.length, false);
        newObject.scale = {name: scaleOptions[idx]};

        return newObject;
    }

};
