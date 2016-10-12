export const ItemList = function() {
    var self = this;
    // Object Structure:
    // [ [Filename, mean (RBA), std dev (RBA), negative chance (RBA), mean (No RBA), std dev (No RBA), negative chance (No RBA) ], ...]
    self.allItems = [
        [  "AdultsWallet",  "1",  "5",  "0.5",  "1",  "1",  "0.5" ],
        [  "BiggoronsSword",  "1",  "5",  "0.5",  "1",  "1",  "0.5" ],
        [  "BigPoe",  "1",  "5",  "0.5",  "1",  "1",  "0.5" ],
        [  "BlueFire",  "1",  "5",  "0.5",  "1",  "1",  "0.5" ],
        [  "BluePotion",  "1",  "5",  "0.5",  "1",  "1",  "0.5" ],
        [  "BoleroOfFire",  "1",  "5",  "0.5",  "1",  "1",  "0.5" ],
        [  "Bomb",  "1",  "5",  "0.5",  "1",  "1",  "0.5" ],
        [  "BombBag20",  "1",  "5",  "0.5",  "1",  "1",  "0.5" ],
        [  "BombBag30",  "1",  "5",  "0.5",  "1",  "1",  "0.5" ],
        [  "BombBag40",  "1",  "5",  "0.5",  "1",  "1",  "0.5" ],
        [  "Bombchu",  "1",  "5",  "0.5",  "1",  "1",  "0.5" ],
        [  "Boomerang",  "1",  "5",  "0.5",  "1",  "1",  "0.5" ],
        [  "BossKey",  "1",  "5",  "0.5",  "1",  "1",  "0.5" ],
        [  "BottledFairy",  "5",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "Bug",  "1",  "5",  "0.5",  "1",  "1",  "0.5" ],
        [  "BulletBag30",  "1",  "5",  "0.5",  "1",  "1",  "0.5" ],
        [  "BulletBag40",  "1",  "5",  "0.5",  "1",  "1",  "0.5" ],
        [  "BulletBag50",  "1",  "5",  "0.5",  "1",  "1",  "0.5" ],
        [  "BunnyHood",  "1",  "5",  "0.5",  "1",  "1",  "0.5" ],
        [  "ClaimCheck",  "1",  "5",  "0.5",  "1",  "1",  "0.5" ],
        [  "Cojiro",  "1",  "5",  "0.5",  "1",  "1",  "0.5" ],
        [  "Compass",  "1",  "5",  "0.5",  "1",  "1",  "0.5" ],
        [  "Cucco",  "1",  "5",  "0.5",  "1",  "1",  "0.5" ],
        [  "DekuNut",  "1",  "5",  "0.5",  "1",  "1",  "0.5" ],
        [  "DekuSeeds",  "1",  "5",  "0.5",  "1",  "1",  "0.5" ],
        [  "DekuShield",  "1",  "5",  "0.5",  "1",  "1",  "0.5" ],
        [  "DekuStick",  "1",  "5",  "0.5",  "1",  "1",  "0.5" ],
        [  "DinsFire",  "1",  "5",  "0.5",  "1",  "1",  "0.5" ],
        [  "DungeonMap",  "1",  "5",  "0.5",  "1",  "1",  "0.5" ],
        [  "EmptyBottle",  "1",  "5",  "0.5",  "1",  "1",  "0.5" ],
        [  "EponasSong",  "1",  "5",  "0.5",  "1",  "1",  "0.5" ],
        [  "EyeballFrog",  "1",  "5",  "0.5",  "1",  "1",  "0.5" ],
        [  "Eyedrops",  "1",  "5",  "0.5",  "1",  "1",  "0.5" ],
        [  "FairyBow",  "1",  "5",  "0.5",  "1",  "1",  "0.5" ],
        [  "FairyOcarina",  "1",  "5",  "0.5",  "1",  "1",  "0.5" ],
        [  "FairySlingshot",  "1",  "5",  "0.5",  "1",  "1",  "0.5" ],
        [  "FaroresWind",  "1",  "5",  "0.5",  "1",  "1",  "0.5" ],
        [  "FireArrow",  "1",  "5",  "0.5",  "1",  "1",  "0.5" ],
        [  "FireMedallion",  "1",  "5",  "0.5",  "1",  "1",  "0.5" ],
        [  "Fish",  "1",  "5",  "0.5",  "1",  "1",  "0.5" ],
        [  "FishingPole",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "ForestMedallion",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "GerudoCard",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "GerudoMask",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "GiantsWallet",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "GoldenGauntlets",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "GoldScale",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "GoldSkulltula",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "GoronBracelet",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "GoronMask",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "GoronsRuby",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "GoronsSwordBroken",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "GoronTunic",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "GrayNote",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "GreenPotion",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "HeartContainer",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "HeartPiece",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "Hookshot",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "HoverBoots",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "HylianShield",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "IceArrow",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "IronBoots",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "KeatonMask",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "KokiriBoots",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "KokiriEmerald",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "KokiriSword",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "KokiriTunic",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "LensOfTruth",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "LightArrow",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "LightMedallion",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "Longshot",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "MagicBeans",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "MaskOfTruth",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "MasterSword",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "MegatonHammer",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "Milk",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "MilkHalf",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "MinuetOfForest",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "MirrorShield",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "NayrusLove",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "NocturneOfShadow",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "OcarinaOfTime",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "OddMushroom",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "OddPotion",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "PoachersSaw",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "Poe",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "PreludeofLight",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "Prescription",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "Quiver30",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "Quiver40",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "Quiver50",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "RedPotion",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "RequiemofSpirit",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "RupeeIcon",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "RutosLetter",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "SariasSong",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "SerenadeOfWater",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "ShadowMedallion",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "SilverGauntlets",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "SilverScale",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "SkullMask",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "SmallKey",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "SOLDOUT",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "SongofStorms",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "SongofTime",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "SpiritMedallion",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "SpookyMask",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "StoneofAgony",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "SunsSong",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "WaterMedallion",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "WeirdEgg",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "ZeldasLullaby",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "ZeldasLetter",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "ZoraMask",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "ZorasSapphire",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ],
        [  "ZoraTunic",  "1",  "1",  "0.5",  "1",  "1",  "0.5" ]
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
