export const ItemList = function() {
    var self = this;
    // Object Structure:
    // [ [Filename, mean (RBA), std dev (RBA), negative chance (RBA), mean (No RBA), std dev (No RBA), negative chance (No RBA) ], ...]
    self.allItems = [["AdultsWallet", "1", "3", "0.5", "1", "1"], ["BiggoronsSword", "5", "2", "0.5", "1", "1"], ["BigPoe", "2", "1", "0.5", "1", "1"], ["BlueFire", "2", "1", "0.5", "1", "1"], ["BluePotion", "3", "2", "0.5", "1", "1"], ["BoleroOfFire", "-1", "2", "0.5", "1", "1"], ["Bomb", "0", "2", "0.6", "1", "1"], ["BombBag20", "-2", "2", "0.2", "1", "1"], ["BombBag30", "-1", "2", "0.5", "1", "1"], ["BombBag40", "-1", "2", "0.5", "1", "1"], ["Bombchu", "0", "2", "0.5", "1", "1"], ["Boomerang", "4", "3", "0.5", "1", "1"], ["BossKey", "1", "2", "0.5", "1", "1"], ["BottledFairy", "0", "1", "0.5", "1", "1"], ["BrokenBiggoronsSword", "-1", "2", "0.5", "1", "1"], ["BrokenGiantsKnife", "3", "1", "0.5", "1", "1"], ["Bug", "-1", "1", "0.5", "1", "1"], ["BulletBag30", "2", "4", "0.5", "1", "1"], ["BulletBag40", "2", "4", "0.5", "1", "1"], ["BulletBag50", "1", "4", "0.5", "1", "1"], ["BunnyHood", "9", "1", "0.5", "1", "1"], ["ClaimCheck", "4", "2", "0.5", "1", "1"], ["Cojiro", "-4", "3", "0.5", "1", "1"], ["Compass", "1", "2", "0.5", "1", "1"], ["WeirdCucco", "1", "2", "0.5", "1", "1"], ["DekuNut", "0", "1", "0.5", "1", "1"], ["DekuSeeds", "1", "2", "0.5", "1", "1"], ["DekuShield", "1", "2", "0.5", "1", "1"], ["DekuStick", "0", "1", "0.5", "1", "1"], ["DinsFire", "4", "3", "0.5", "1", "1"], ["DungeonMap", "1", "2", "0.5", "1", "1"], ["EmptyBottle", "-3", "2", "0.5", "1", "1"], ["EponasSong", "4", "3", "0.5", "1", "1"], ["EyeballFrog", "6", "3", "0.5", "1", "1"], ["Eyedrops", "6", "3", "0.5", "1", "1"], ["FairyBow", "5", "3", "0.5", "1", "1"], ["FairyOcarina", "0", "2", "0.5", "1", "1"], ["FairySlingshot", "3", "2", "0.5", "1", "1"], ["FaroresWind", "3", "2", "0.5", "1", "1"], ["FireArrow", "3", "2", "0.5", "1", "1"], ["FireMedallion", "3", "2", "0.5", "1", "1"], ["Fish", "-1", "1", "0.5", "1", "1"], ["FishingPole", "1", "2", "0.5", "1", "1"], ["ForestMedallion", "0", "2", "0.5", "1", "1"], ["GerudoCard", "5", "2", "0.5", "1", "1"], ["GerudoMask", "12", "1", "0.5", "1", "1"], ["GiantsKnife", "3", "1", "0.5", "1", "1"], ["GiantsWallet", "2", "2", "0.5", "1", "1"], ["GoldenGauntlets", "4", "2", "0.5", "1", "1"], ["GoldScale", "0", "2", "0.5", "1", "1"], ["GoldSkulltula", "1", "2", "0.5", "1", "1"], ["GoronBracelet", "3", "2", "0.5", "1", "1"], ["GoronMask", "12", "1", "0.1", "1", "1"], ["GoronsRuby", "0", "3", "0.5", "1", "1"], ["GoronTunic", "1", "2", "0.5", "1", "1"], ["GrayNote", "6", "2", "0.5", "1", "1"], ["GreenPotion", "2", "2", "0.5", "1", "1"], ["HeartContainer", "1", "2", "0.5", "1", "1"], ["HeartPiece", "1", "2", "0.5", "1", "1"], ["Hookshot", "-3", "2", "0.5", "1", "1"], ["HoverBoots", "0", "2", "0.5", "1", "1"], ["HylianShield", "-2", "3", "0.5", "1", "1"], ["IceArrow", "1", "3", "0.5", "1", "1"], ["IronBoots", "4", "3", "0.5", "1", "1"], ["KeatonMask", "3", "2", "0.5", "1", "1"], ["KokiriBoots", "0", "1", "0.5", "1", "1"], ["KokiriEmerald", "0", "3", "0.5", "1", "1"], ["KokiriSword", "0", "2", "0.5", "1", "1"], ["KokiriTunic", "0", "1", "0.5", "1", "1"], ["LensOfTruth", "1", "3", "0.5", "1", "1"], ["LightArrow", "5", "3", "0.5", "1", "1"], ["LightMedallion", "2", "2", "0.5", "1", "1"], ["Longshot", "5", "2", "0.5", "1", "1"], ["MagicBeans", "1", "2", "0.5", "1", "1"], ["MaskOfTruth", "12", "1", "0.5", "1", "1"], ["MasterSword", "0", "2", "0.5", "1", "1"], ["MegatonHammer", "5", "2", "0.5", "1", "1"], ["Milk", "3", "2", "0.5", "1", "1"], ["MilkHalf", "3", "2", "0.5", "1", "1"], ["MinuetOfForest", "1", "3", "0.5", "1", "1"], ["MirrorShield", "5", "3", "0.5", "1", "1"], ["NayrusLove", "3", "3", "0.5", "1", "1"], ["NocturneOfShadow", "0", "2", "0.5", "1", "1"], ["OcarinaOfTime", "6", "3", "0.5", "1", "1"], ["OddMushroom", "5", "2", "0.5", "1", "1"], ["OddPotion", "2", "3", "0.5", "1", "1"], ["PoachersSaw", "2", "3", "0.5", "1", "1"], ["PocketEgg", "3", "1", "0.5", "1", "1"], ["Poe", "-1", "3", "0.5", "1", "1"], ["PreludeofLight", "1", "2", "0.5", "1", "1"], ["Prescription", "4", "3", "0.5", "1", "1"], ["Quiver30", "1", "2", "0.5", "1", "1"], ["Quiver40", "2", "3", "0.5", "1", "1"], ["Quiver50", "2", "3", "0.5", "1", "1"], ["RedPotion", "2", "2", "0.5", "1", "1"], ["RequiemofSpirit", "2", "2", "0.5", "1", "1"], ["RupeeIcon", "1", "2", "0.5", "1", "1"], ["RutosLetter", "4", "2", "0.5", "1", "1"], ["SariasSong", "4", "3", "0.5", "1", "1"], ["SerenadeOfWater", "-1", "3", "0.5", "1", "1"], ["ShadowMedallion", "0", "2", "0.5", "1", "1"], ["SilverGauntlets", "5", "2", "0.5", "1", "1"], ["SilverScale", "3", "2", "0.5", "1", "1"], ["SkullMask", "4", "2", "0.5", "1", "1"], ["SmallKey", "1", "2", "0.5", "1", "1"], ["SOLDOUT", "3", "2", "0.5", "1", "1"], ["SongofStorms", "1", "2", "0.5", "1", "1"], ["SongofTime", "0", "2", "0.5", "1", "1"], ["SpiritMedallion", "0", "3", "0.5", "1", "1"], ["SpookyMask", "3", "1", "0.5", "1", "1"], ["StoneofAgony", "2", "1", "0.5", "1", "1"], ["SunsSong", "3", "2", "0.5", "1", "1"], ["WaterMedallion", "0", "3", "0.5", "1", "1"], ["WeirdEgg", "1", "3", "0.5", "1", "1"], ["ZeldasLullaby", "2", "2", "0.5", "1", "1"], ["ZeldasLetter", "3", "2", "0.5", "1", "1"], ["ZoraMask", "12", "1", "0.5", "1", "1"], ["ZorasSapphire", "-1", "3", "0.5", "1", "1"], ["ZoraTunic", "1", "3", "0.5", "1", "1"]];

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
            ["PoachersSaw", "Poachers Saw"], ["Prescription", "Prescription"], ["BrokenBiggoronsSword", "Broken Sword"],
            ["ClaimCheck", "Claim Check"], ["PocketEgg", "Pocket Egg"]];
        idx = self.generateRandomNumber(0, adultQuestOptions.length, false);
        newObject.adultTrade = {name: adultQuestOptions[idx][0], tooltip: adultQuestOptions[idx][1]};

        //child trade
        var childQuestOptions = [["KeatonMask", "Keaton Mask"], ["SkullMask", "Skull Mask"], ["SpookyMask", "Spooky Mask"],
            ["BunnyHood", "Bunny Hood"], ["ZoraMask", "Zora Mask"], ["GoronMask", "Goron Mask"], ["GerudoMask", "Gerudo Mask"],
            ["MaskOfTruth", "Mask of Truth"], ["ZeldasLetter", "Zelda's Letter"], ["SOLDOUT", "SOLDOUT"], ["WeirdEgg", "Weird Egg"],
            ["WeirdCucco", "Weird Egg Cucco"]];
        idx = self.generateRandomNumber(0, childQuestOptions.length, false);
        newObject.childTrade = {name: childQuestOptions[idx][0], tooltip: childQuestOptions[idx][1]};

        //decide quiver
        var quiverOptions = [["Quiver30", "Quiver (30)"], ["Quiver40", "Quiver (40)"], ["Quiver50", "Quiver (50)"]];
        var idx = self.generateRandomNumber(0, quiverOptions.length, false);
        newObject.quiver = {name: quiverOptions[idx][0], tooltip:quiverOptions[idx][1]};

        //large sword
        var bigSwordOptions = [["BrokenGiantsKnife", "Broken Giant's Knife"], ["GiantsKnife", "Giant's Knife"], ["BiggoronsSword", "Biggoron's Sword"]];
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
