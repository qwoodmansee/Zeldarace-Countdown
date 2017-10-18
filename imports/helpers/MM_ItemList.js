export const MM_ItemList = function() {
    var self = this;
    // Object Structure:
    // [ [Filename, mean (RBA), std dev (RBA), negative chance (RBA), mean (No RBA), std dev (No RBA), negative chance (No RBA) ], ...]
    self.allItems = [["MM_AdultsWallet", "1", "3", "0.5", "1", "1"], ["MM_AllNightMask", "3", "2", "0.5", "1", "1"], ["MM_BigPoe", "1", "1", "0.5", "1", "1"], ["MM_BlastMask", "2", "3", "0.5", "1", "1"], ["MM_BlueFire", "0", "1", "0.5", "1", "1"], ["MM_BluePotion", "3", "1", "0.5", "1", "1"], ["MM_Bomb", "0", "1", "0.6", "1", "1"], ["MM_BombBag20", "-1", "1", "0.2", "1", "1"], ["MM_BombBag30", "2", "1", "0.5", "1", "1"], ["MM_BombBag40", "3", "1", "0.5", "1", "1"], ["MM_Bombchu", "0", "1", "0.5", "1", "1"], ["MM_Bombers'Notebook", "1", "2", "0.5", "1", "1"], ["MM_BremenMask", "2", "3", "0.5", "1", "1"], ["MM_Bug", "-1", "2", "0.5", "1", "1"], ["MM_BunnyHood", "3", "2", "0.5", "1", "1"], ["MM_CaptainHat", "4", "2", "0.5", "1", "1"], ["MM_ChateauRomani", "4", "1", "0.5", "1", "1"], ["MM_CircusLeaderMask", "3", "2", "0.5", "1", "1"], ["MM_CoupleMask", "7", "2", "0.5", "1", "1"], ["MM_DekuMask", "0", "1", "0.5", "1", "1"], ["MM_DekuNut", "-2", "1", "0.5", "1", "1"], ["MM_DekuPrincess", "5", "1", "0.5", "1", "1"], ["MM_DekuStick", "-3", "1", "0.5", "1", "1"], ["MM_DonGeroMask", "2", "1", "0.5", "1", "1"], ["MM_ElegyofEmptiness", "3", "1", "0.5", "1", "1"], ["MM_EmptyBottle", "-2", "1", "0.5", "1", "1"], ["MM_EponaSong", "4", "1", "0.5", "1", "1"], ["MM_Fairy", "-3", "1", "0.5", "1", "1"], ["MM_FierceDeityMask", "14", "2", "0.5", "1", "1"], ["MM_FireArrow", "3", "2", "0.5", "1", "1"], ["MM_Fish", "2", "1", "0.5", "1", "1"], ["MM_GaroMask", "2", "2", "0.5", "1", "1"], ["MM_GiantMask", "2", "1", "0.5", "1", "1"], ["MM_GiantWallet", "1", "1", "0.5", "1", "1"], ["MM_GibdoMask", "2", "3", "0.5", "1", "1"], ["MM_GildedSword", "5", "1", "0.5", "1", "1"], ["MM_GohtRemains", "3", "1", "0.5", "1", "1"], ["MM_GoldDust", "4", "1", "0.5", "1", "1"], ["MM_GoronLullaby", "4", "1", "0.5", "1", "1"], ["MM_GoronMask", "-2", "1", "0.5", "1", "1"], ["MM_GrayNote", "1", "1", "0.5", "1", "1"], ["MM_GreatFairyMask", "-2", "1", "0.5", "1", "1"], ["MM_GreatFairySword", "4", "1", "0.5", "1", "1"], ["MM_GreenPotion", "1", "1", "0.5", "1", "1"], ["MM_GyorgRemains", "4", "1", "0.5", "1", "1"], ["MM_HalfMilk", "2", "1", "0.5", "1", "1"], ["MM_HeroBow", "1", "2", "0.5", "1", "1"], ["MM_HeroShield", "-2", "2", "0.5", "1", "1"], ["MM_Hookshot", "-2", "2", "0.5", "1", "1"], ["MM_HotSpringWater", "5", "2", "0.1", "1", "1"], ["MM_HylianLoach", "1", "1", "0.5", "1", "1"], ["MM_IceArrow", "4", "2", "0.5", "1", "1"], ["MM_KafeiMask", "2", "2", "0.5", "1", "1"], ["MM_KamaroMask", "3", "1", "0.5", "1", "1"], ["MM_KeatonMask", "2", "2", "0.5", "1", "1"], ["MM_KokiriSword", "-3", "1", "0.5", "1", "1"], ["MM_LandTitleDeed", "1", "2", "0.5", "1", "1"], ["MM_LensofTruth", "0", "2", "0.5", "1", "1"], ["MM_LettertoKafei", "5", "1", "0.5", "1", "1"], ["MM_LightArrow", "3", "1", "0.5", "1", "1"], ["MM_LullabyIntro", "3", "1", "0.5", "1", "1"], ["MM_MagicalMushroom", "3", "1", "0.5", "1", "1"], ["MM_MagicBeans", "0", "2", "0.5", "1", "1"], ["MM_MaskofScents", "3", "2", "0.5", "1", "1"], ["MM_MaskofTruth", "4", "2", "0.5", "1", "1"], ["MM_Milk", "2", "1", "0.5", "1", "1"], ["MM_MirrorShield", "4", "2", "0.5", "1", "1"], ["MM_MoonTear", "3", "2", "0.5", "1", "1"], ["MM_MountainTitleDeed", "2", "2", "0.5", "1", "1"], ["MM_NewWaveBossaNova", "0", "1", "0.5", "1", "1"], ["MM_OathtoOrder", "1", "1", "0.5", "1", "1"], ["MM_OcarinaofTime", "0", "1", "0.5", "1", "1"], ["MM_OceanTitleDeed", "3", "2", "0.5", "1", "1"], ["MM_OdolwaRemains", "3", "1", "0.5", "1", "1"], ["MM_PendantofMemories", "4", "1", "0.5", "1", "1"], ["MM_PictographBox", "1", "3", "0.5", "1", "1"], ["MM_Poe", "5", "1", "0.5", "1", "1"], ["MM_PostmanHat", "6", "2", "0.5", "1", "1"], ["MM_PowderKeg", "3", "1", "0.5", "1", "1"], ["MM_Quiver30", "-2", "1", "0.5", "1", "1"], ["MM_Quiver40", "1", "3", "0.5", "1", "1"], ["MM_Quiver50", "3", "2", "0.5", "1", "1"], ["MM_RazorSword", "3", "1", "0.5", "1", "1"], ["MM_RedPotion", "1", "2", "0.5", "1", "1"], ["MM_RomaniMask", "2", "2", "0.5", "1", "1"], ["MM_RoomKey", "3", "2", "0.5", "1", "1"], ["MM_SeaHorse", "3", "1", "0.5", "1", "1"], ["MM_SonataofAwakening", "3", "1", "0.5", "1", "1"], ["MM_SongofHealing", "0", "1", "0.5", "1", "1"], ["MM_SongofSoaring", "-1", "2", "0.5", "1", "1"], ["MM_SongofStorms", "2", "2", "0.5", "1", "1"], ["MM_SongofTime", "0", "1", "0.5", "1", "1"], ["MM_SpecialDeliverytoMama", "5", "1", "0.5", "1", "1"], ["MM_SpringWater", "2", "2", "0.5", "1", "1"], ["MM_StoneMask", "0", "2", "0.5", "1", "1"], ["MM_SwampTitleDeed", "1", "2", "0.5", "1", "1"], ["MM_TwinmoldRemains", "2", "1", "0.5", "1", "1"], ["MM_ZoraEgg", "3", "1", "0.5", "1", "1"], ["MM_ZoraMask", "-1", "1", "0.5", "1", "1"]];

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

        //bottles
        var bottlesArray = [];

        //first option is filename, second option is tooltip
        var bottleOptions = [["MM_EmptyBottle", "Empty Bottle"], ["MM_RedPotion", "Red Potion"], ["MM_Fairy", "Bottled Fairy"],
            ["MM_Bug", "Bugs"], ["MM_BigPoe", "Big Poe"], ["MM_BluePotion", "Blue Potion"], ["MM_Fish",
            "Fish"], ["MM_GreenPotion", "Green Potion"], ["MM_Milk", "Milk"], ["MM_HalfMilk", "Half Milk"], ["MM_Poe", "Poe"],
            ["MM_ChateauRomani", "Chateau Romani"], ["MM_DekuPrincess", "Deku Princess"], ["MM_GoldDust", "Gold Dust"],
            ["MM_HotSpringWater", "Hot Spring Water"], ["MM_MagicalMushroom", "Magical Mushroom"],
            ["MM_SeaHorse", "Sea Horse"], ["MM_SpringWater", "Spring Water"], ["MM_ZoraEgg", "Zora Egg"] ];

        //pick items for the 6 bottles
        for (var i=0; i < 6; i++) {
            //get the index of which item we are using
            idx = self.generateRandomNumber(0, bottleOptions.length, false);
            bottlesArray.push({name: bottleOptions[idx][0], tooltip: bottleOptions[idx][1]});
            bottleOptions.splice(idx, 1);
        }
        newObject.bottles = bottlesArray;
        // title deed, moons tear
        // room key, purple letter
        // red letter, pendent
        //top trade
        //first option is filename, second option is tooltip
        var topTradeOptions = [["MM_LandTitleDeed", "Town Title Deed"], ["MM_MountainTitleDeed", "Mountain Title Deed"],
            ["MM_MoonTear", "Moon's Tear"], ["MM_OceanTitleDeed", "Ocean Title Deed"],
            ["MM_SwampTitleDeed", "Swamp Title Deed"]];
        idx = self.generateRandomNumber(0, topTradeOptions.length, false);
        newObject.topTrade = {name: topTradeOptions[idx][0], tooltip: topTradeOptions[idx][1]};

        //middle trade
        var middleTradeOptions = [["MM_SpecialDeliverytoMama", "Special Delivery to Mama"], ["MM_RoomKey", "Room Key"]];
        idx = self.generateRandomNumber(0, middleTradeOptions.length, false);
        newObject.middleTrade = {name: middleTradeOptions[idx][0], tooltip: middleTradeOptions[idx][1]};

        //bottom trade
        var bottomTradeOptions = [["MM_PendantofMemories", "Pendant of Memories"], ["MM_LettertoKafei", "Letter to Kafei"]];
        idx = self.generateRandomNumber(0, bottomTradeOptions.length, false);
        newObject.bottomTrade = {name: bottomTradeOptions[idx][0], tooltip: bottomTradeOptions[idx][1]};

        //decide quiver
        let quiverOptions = [["MM_Quiver30", "Quiver (30)"], ["MM_Quiver40", "Quiver (40)"], ["MM_Quiver50", "Quiver (50)"]];
        var idx = self.generateRandomNumber(0, quiverOptions.length, false);
        newObject.quiver = {name: quiverOptions[idx][0], tooltip:quiverOptions[idx][1]};

        //sword
        let swordOptions = [["MM_KokiriSword", "Kokiri Sword"], ["MM_RazorSword", "Razor Sword"], ["MM_GildedSword", "Gilded Sword"]];
        idx = self.generateRandomNumber(0, swordOptions.length, false);
        newObject.sword = {name: swordOptions[idx][0], tooltip:swordOptions[idx][1]};

        //bomb bag
        let bombBagOptions = [["MM_BombBag20", "Bomb Bag (20)"], ["MM_BombBag30", "Bomb Bag (30)"], ["MM_BombBag40", "Bomb Bag (40)"]];
        idx = self.generateRandomNumber(0, bombBagOptions.length, false);
        newObject.bombBag = {name: bombBagOptions[idx][0], tooltip:bombBagOptions[idx][1]};

        // shield
        let shieldOptions = [["MM_MirrorShield", "Mirror Shield"], ["MM_HeroShield", "Hero's Shield"]];
        idx = self.generateRandomNumber(0, shieldOptions.length, false);
        newObject.shield = {name: shieldOptions[idx][0], tooltip:shieldOptions[idx][1]};

        // goron lullaby option
        let lullabyOptions = [["MM_LullabyIntro", "Lullaby Intro"], ["MM_GoronLullaby", "Goron's Lullaby"]];
        idx = self.generateRandomNumber(0, lullabyOptions.length, false);
        newObject.lullaby = {name: lullabyOptions[idx][0], tooltip:lullabyOptions[idx][1]};
        return newObject;
    }

};
