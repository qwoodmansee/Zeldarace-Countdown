export const ItemList = function() {
    var self = this;
    // Object Structure:
    // [ [Filename, mean (RBA), std dev (RBA), negative chance (RBA), mean (No RBA), std dev (No RBA), negative chance (No RBA) ], ...]
    self.allItems = [
        [  "AdultsWallet",  "1",  "2",  "0.5",  "1",  "1",  "0.5" ],
        [  "BiggoronsSword",  "5",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "BigPoe",  "1",  "2",  "0.5",  "1",  "1",  "0.5" ],
        [  "BlueFire",  "2",  "2",  "0.5",  "1",  "1",  "0.5" ],
        [  "BluePotion",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "BoleroOfFire",  "-1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "Bomb",  "-2",  "1",  "0.6",  "1",  "1",  "0.5" ],
        [  "BombBag20",  "-2",  "1",  "0.2",  "1",  "1",  "0.5" ],
        [  "BombBag30",  "-1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "BombBag40",  "-1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "Bombchu",  "-3",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "Boomerang",  "2",  "2",  "0.5",  "1",  "1",  "0.5" ],
        [  "BossKey",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "BottledFairy",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "Bug",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "BulletBag30",  "2",  "3",  "0.5",  "1",  "1",  "0.5" ],
        [  "BulletBag40",  "2",  "3",  "0.5",  "1",  "1",  "0.5" ],
        [  "BulletBag50",  "1",  "3",  "0.5",  "1",  "1",  "0.5" ],
        [  "BunnyHood",  "5",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "ClaimCheck",  "1",  "2",  "0.5",  "1",  "1",  "0.5" ],
        [  "Cojiro",  "-4",  "2",  "0.5",  "1",  "1",  "0.5" ],
        [  "Compass",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "Cucco",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "DekuNut",  "-2",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "DekuSeeds",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "DekuShield",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "DekuStick",  "-2",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "DinsFire",  "4",  "2",  "0.5",  "1",  "1",  "0.5" ],
        [  "DungeonMap",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "EmptyBottle",  "-3",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "EponasSong",  "5",  "2",  "0.5",  "1",  "1",  "0.5" ],
        [  "EyeballFrog",  "6",  "2",  "0.5",  "1",  "1",  "0.5" ],
        [  "Eyedrops",  "6",  "2",  "0.5",  "1",  "1",  "0.5" ],
        [  "FairyBow",  "3",  "2",  "0.5",  "1",  "1",  "0.5" ],
        [  "FairyOcarina",  "0",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "FairySlingshot",  "3",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "FaroresWind",  "3",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "FireArrow",  "2",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "FireMedallion",  "5",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "Fish",  "-3",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "FishingPole",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "ForestMedallion",  "-1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "GerudoCard",  "3",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "GerudoMask",  "7",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "GiantsWallet",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "GoldenGauntlets",  "4",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "GoldScale",  "0",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "GoldSkulltula",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "GoronBracelet",  "5",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "GoronMask",  "7",  "1",  "0.1",  "1",  "1",  "0.5" ],
        [  "GoronsRuby",  "-1",  "2",  "0.5",  "1",  "1",  "0.5" ],
        [  "GoronsSwordBroken",  "2",  "2",  "0.5",  "1",  "1",  "0.5" ],
        [  "GoronTunic",  "1",  "2",  "0.5",  "1",  "1",  "0.5" ],
        [  "GrayNote",  "6",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "GreenPotion",  "-1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "HeartContainer",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "HeartPiece",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "Hookshot",  "-3",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "HoverBoots",  "-1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "HylianShield",  "-2",  "2",  "0.5",  "1",  "1",  "0.5" ],
        [  "IceArrow",  "0",  "2",  "0.5",  "1",  "1",  "0.5" ],
        [  "IronBoots",  "2",  "2",  "0.5",  "1",  "1",  "0.5" ],
        [  "KeatonMask",  "3",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "KokiriBoots",  "0",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "KokiriEmerald",  "-1",  "2",  "0.5",  "1",  "1",  "0.5" ],
        [  "KokiriSword",  "-1",  "3",  "0.5",  "1",  "1",  "0.5" ],
        [  "KokiriTunic",  "0",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "LensOfTruth",  "1",  "2",  "0.5",  "1",  "1",  "0.5" ],
        [  "LightArrow",  "3",  "2",  "0.5",  "1",  "1",  "0.5" ],
        [  "LightMedallion",  "4",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "Longshot",  "4",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "MagicBeans",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "MaskOfTruth",  "7",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "MasterSword",  "0",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "MegatonHammer",  "3",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "Milk",  "0",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "MilkHalf",  "0",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "MinuetOfForest",  "1",  "2",  "0.5",  "1",  "1",  "0.5" ],
        [  "MirrorShield",  "4",  "2",  "0.5",  "1",  "1",  "0.5" ],
        [  "NayrusLove",  "3",  "2",  "0.5",  "1",  "1",  "0.5" ],
        [  "NocturneOfShadow",  "-1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "OcarinaOfTime",  "6",  "2",  "0.5",  "1",  "1",  "0.5" ],
        [  "OddMushroom",  "5",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "OddPotion",  "2",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "PoachersSaw",  "2",  "2",  "0.5",  "1",  "1",  "0.5" ],
        [  "Poe",  "-1",  "2",  "0.5",  "1",  "1",  "0.5" ],
        [  "PreludeofLight",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "Prescription",  "5",  "2",  "0.5",  "1",  "1",  "0.5" ],
        [  "Quiver30",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "Quiver40",  "2",  "2",  "0.5",  "1",  "1",  "0.5" ],
        [  "Quiver50",  "2",  "2",  "0.5",  "1",  "1",  "0.5" ],
        [  "RedPotion",  "-1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "RequiemofSpirit",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "RupeeIcon",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "RutosLetter",  "3",  "2",  "0.5",  "1",  "1",  "0.5" ],
        [  "SariasSong",  "4",  "2",  "0.5",  "1",  "1",  "0.5" ],
        [  "SerenadeOfWater",  "-1",  "2",  "0.5",  "1",  "1",  "0.5" ],
        [  "ShadowMedallion",  "-2",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "SilverGauntlets",  "5",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "SilverScale",  "3",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "SkullMask",  "3",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "SmallKey",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "SOLDOUT",  "3",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "SongofStorms",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "SongofTime",  "0",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "SpiritMedallion",  "-1",  "2",  "0.5",  "1",  "1",  "0.5" ],
        [  "SpookyMask",  "1",  "2",  "0.5",  "1",  "1",  "0.5" ],
        [  "StoneofAgony",  "3",  "2",  "0.5",  "1",  "1",  "0.5" ],
        [  "SunsSong",  "3",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "WaterMedallion",  "-1",  "2",  "0.5",  "1",  "1",  "0.5" ],
        [  "WeirdEgg",  "1",  "2",  "0.5",  "1",  "1",  "0.5" ],
        [  "ZeldasLullaby",  "-1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "ZeldasLetter",  "3",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "ZoraMask",  "7",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "ZorasSapphire",  "-1",  "2",  "0.5",  "1",  "1",  "0.5" ],
        [  "ZoraTunic",  "1",  "2",  "0.5",  "1",  "1",  "0.5" ]
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
        if (Math.random()*2 > 1.3) {
            newObject.ocarina = {name: "OcarinaOfTime", tooltip: "Ocarina of Time"};
        } else {
            newObject.ocarina = {name: "FairyOcarina", tooltip: "Fairy Ocarina"};
        }

        //hookshot/longshot
        if (Math.random()*2 > 1) {
            newObject.hookshotOption = {name: "Hookshot", tooltip: "Hookshot"};
        } else {
            newObject.hookshotOption = {name: "Longshot", tooltip: "Longshot"};
        }

        //bottles
        var bottlesArray = [];
        //first option is filename, second option is tooltip
        var bottleOptions = [["EmptyBottle", "Empty Bottle"], ["RedPotion", "Red Potion"], ["BottledFairy", "Bottled Fairy"],
            ["Bug", "Bugs"], ["BigPoe", "Big Poe"], ["BlueFire", "Blue Fire"], ["BluePotion", "Blue Potion"], ["Fish",
            "Fish"], ["GreenPotion", "Green Potion"], ["Milk", "Milk"], ["MilkHalf", "Half Milk"], ["Poe", "Poe"],
            ["RutosLetter", "Ruto's Letter"]];
        //pick items for the 4 bottles
        for (var i=0; i < 4; i++) {
            //get the index of which item we are using
            idx = self.generateRandomNumber(0, bottleOptions.length, false);
            bottlesArray.push({name: bottleOptions[idx][0], tooltip: bottleOptions[idx][1]});
            bottleOptions.splice(idx, 1);
        }
        newObject.bottles = bottlesArray;

        //adult trade
        //first option is filename, second option is tooltip
        var adultQuestOptions = [["Cojiro", "Cojiro"], ["OddMushroom", "Odd Mushroom"], ["OddPotion", "Odd Potion"],
            ["PoachersSaw", "Poachers Saw"], ["Prescription", "Prescription"], ["GoronsSwordBroken", "Broken Sword"],
            ["ClaimCheck", "Claim Check"], ["WeirdEgg", "Weird Egg"]];
        idx = self.generateRandomNumber(0, adultQuestOptions.length, false);
        newObject.adultTrade = {name: adultQuestOptions[idx][0], tooltip: adultQuestOptions[idx][1]};

        //child trade
        var childQuestOptions = [["KeatonMask", "Keaton Mask"], ["SkullMask", "Skull Mask"], ["SpookyMask", "Spooky Mask"],
            ["BunnyHood", "Bunny Hood"], ["ZoraMask", "Zora Mask"], ["GoronMask", "Goron Mask"], ["GerudoMask", "Gerudo Mask"],
            ["MaskOfTruth", "Mask of Truth"], ["ZeldasLetter", "Zelda's Letter"], ["SOLDOUT", "SOLDOUT"], ["WeirdEgg", "Weird Egg"],
            ["Cucco", "Cucco"]];
        idx = self.generateRandomNumber(0, childQuestOptions.length, false);
        newObject.childTrade = {name: childQuestOptions[idx][0], tooltip: childQuestOptions[idx][1]};

        //decide quiver
        var quiverOptions = [["Quiver30", "Quiver (30)"], ["Quiver40", "Quiver (40)"], ["Quiver50", "Quiver (50)"]];
        var idx = self.generateRandomNumber(0, quiverOptions.length, false);
        newObject.quiver = {name: quiverOptions[idx][0], tooltip:quiverOptions[idx][1]};

        //large sword
        var bigSwordOptions = [["GoronsSwordBroken", "Broken Sword"], ["BiggoronsSword", "Biggorons Sword"]];
        idx = self.generateRandomNumber(0, bigSwordOptions.length, false);
        newObject.bigSword = {name: bigSwordOptions[idx][0], tooltip:bigSwordOptions[idx][1]};

        //bomb bag
        var bombBagOptions = [["BombBag20", "Bomb Bag (20)"], ["BombBag30", "Bomb Bag (30)"], ["BombBag40", "Bomb Bag (40)"]];
        idx = self.generateRandomNumber(0, bombBagOptions.length, false);
        newObject.bombBag = {name: bombBagOptions[idx][0], tooltip:bombBagOptions[idx][1]};

        //gauntlet options
        var gauntletOptions = [["GoronBracelet", "Goron Bracelet"], ["SilverGauntlets", "Silver Gauntlets"], ["GoldenGauntlets", "Golden Gauntlets"]];
        idx = self.generateRandomNumber(0, gauntletOptions.length, false);
        newObject.gauntlets = {name: gauntletOptions[idx][0], tooltip:gauntletOptions[idx][1]};

        //scale
        var scaleOptions = [["SilverScale", "Silver Scale"], ["GoldScale", "Gold Scale"]];
        idx = self.generateRandomNumber(0, scaleOptions.length, false);
        newObject.scale = {name: scaleOptions[idx][0], tooltip:scaleOptions[idx][1]};

        return newObject;
    }

};
