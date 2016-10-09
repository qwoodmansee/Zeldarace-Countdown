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
