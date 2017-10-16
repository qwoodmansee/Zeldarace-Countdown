export const MM_ItemList = function() {
    var self = this;
    // Object Structure:
    // [ [Filename, mean (RBA), std dev (RBA), negative chance (RBA), mean (No RBA), std dev (No RBA), negative chance (No RBA) ], ...]
    self.allItems = [["MM_AdultsWallet", "1", "3", "0.5", "1", "1"], ["MM_AllNightMask", "1", "3", "0.5", "1", "1"], ["MM_BigPoe", "1", "3", "0.5", "1", "1"], ["MM_BlastMask", "1", "3", "0.5", "1", "1"], ["MM_BlueFire", "1", "3", "0.5", "1", "1"], ["MM_BluePotion", "1", "3", "0.5", "1", "1"], ["MM_Bomb", "1", "3", "0.6", "1", "1"], ["MM_BombBag20", "1", "3", "0.2", "1", "1"], ["MM_BombBag30", "1", "3", "0.5", "1", "1"], ["MM_BombBag40", "1", "3", "0.5", "1", "1"], ["MM_Bombchu", "1", "3", "0.5", "1", "1"], ["MM_Bombers'Notebook", "1", "3", "0.5", "1", "1"], ["MM_BremenMask", "1", "3", "0.5", "1", "1"], ["MM_Bug", "1", "3", "0.5", "1", "1"], ["MM_BunnyHood", "1", "3", "0.5", "1", "1"], ["MM_CaptainHat", "1", "3", "0.5", "1", "1"], ["MM_ChateauRomani", "1", "3", "0.5", "1", "1"], ["MM_CircusLeaderMask", "1", "3", "0.5", "1", "1"], ["MM_CoupleMask", "1", "3", "0.5", "1", "1"], ["MM_DekuMask", "1", "3", "0.5", "1", "1"], ["MM_DekuNut", "1", "3", "0.5", "1", "1"], ["MM_DekuPrincess", "1", "3", "0.5", "1", "1"], ["MM_DekuStick", "1", "3", "0.5", "1", "1"], ["MM_DonGeroMask", "1", "3", "0.5", "1", "1"], ["MM_ElegyofEmptiness", "1", "3", "0.5", "1", "1"], ["MM_EmptyBottle", "1", "3", "0.5", "1", "1"], ["MM_EponaSong", "1", "3", "0.5", "1", "1"], ["MM_Fairy", "1", "3", "0.5", "1", "1"], ["MM_FierceDeityMask", "1", "3", "0.5", "1", "1"], ["MM_FireArrow", "1", "3", "0.5", "1", "1"], ["MM_Fish", "1", "3", "0.5", "1", "1"], ["MM_GaroMask", "1", "3", "0.5", "1", "1"], ["MM_GiantMask", "1", "3", "0.5", "1", "1"], ["MM_GiantWallet", "1", "3", "0.5", "1", "1"], ["MM_GibdoMask", "1", "3", "0.5", "1", "1"], ["MM_GildedSword", "1", "3", "0.5", "1", "1"], ["MM_GohtRemains", "1", "3", "0.5", "1", "1"], ["MM_GoldDust", "1", "3", "0.5", "1", "1"], ["MM_GoronLullaby", "1", "3", "0.5", "1", "1"], ["MM_GoronMask", "1", "3", "0.5", "1", "1"], ["MM_GrayNote", "1", "3", "0.5", "1", "1"], ["MM_GreatFairyMask", "1", "3", "0.5", "1", "1"], ["MM_GreatFairySword", "1", "3", "0.5", "1", "1"], ["MM_GreenPotion", "1", "3", "0.5", "1", "1"], ["MM_GyorgRemains", "1", "3", "0.5", "1", "1"], ["MM_HalfMilk", "1", "3", "0.5", "1", "1"], ["MM_HeroBow", "1", "3", "0.5", "1", "1"], ["MM_HeroShield", "1", "3", "0.5", "1", "1"], ["MM_Hookshot", "1", "3", "0.5", "1", "1"], ["MM_HotSpringWater", "1", "3", "0.1", "1", "1"], ["MM_HylianLoach", "1", "3", "0.5", "1", "1"], ["MM_IceArrow", "1", "3", "0.5", "1", "1"], ["MM_KafeiMask", "1", "3", "0.5", "1", "1"], ["MM_KamaroMask", "1", "3", "0.5", "1", "1"], ["MM_KeatonMask", "1", "3", "0.5", "1", "1"], ["MM_KokiriSword", "1", "3", "0.5", "1", "1"], ["MM_LandTitleDeed", "1", "3", "0.5", "1", "1"], ["MM_LensofTruth", "1", "3", "0.5", "1", "1"], ["MM_LettertoKafei", "1", "3", "0.5", "1", "1"], ["MM_LightArrow", "1", "3", "0.5", "1", "1"], ["MM_LullabyIntro", "1", "3", "0.5", "1", "1"], ["MM_MagicalMushroom", "1", "3", "0.5", "1", "1"], ["MM_MagicBeans", "1", "3", "0.5", "1", "1"], ["MM_MaskofScents", "1", "3", "0.5", "1", "1"], ["MM_MaskofTruth", "1", "3", "0.5", "1", "1"], ["MM_Milk", "1", "3", "0.5", "1", "1"], ["MM_MirrorShield", "1", "3", "0.5", "1", "1"], ["MM_MoonTear", "1", "3", "0.5", "1", "1"], ["MM_MountainTitleDeed", "1", "3", "0.5", "1", "1"], ["MM_NewWaveBossaNova", "1", "3", "0.5", "1", "1"], ["MM_OathtoOrder", "1", "3", "0.5", "1", "1"], ["MM_OcarinaofTime", "1", "3", "0.5", "1", "1"], ["MM_OceanTitleDeed", "1", "3", "0.5", "1", "1"], ["MM_OdolwaRemains", "1", "3", "0.5", "1", "1"], ["MM_PendantofMemories", "1", "3", "0.5", "1", "1"], ["MM_PictographBox", "1", "3", "0.5", "1", "1"], ["MM_Poe", "1", "3", "0.5", "1", "1"], ["MM_PostmanHat", "1", "3", "0.5", "1", "1"], ["MM_PowderKeg", "1", "3", "0.5", "1", "1"], ["MM_Quiver30", "1", "3", "0.5", "1", "1"], ["MM_Quiver40", "1", "3", "0.5", "1", "1"], ["MM_Quiver50", "1", "3", "0.5", "1", "1"], ["MM_RazorSword", "1", "3", "0.5", "1", "1"], ["MM_RedPotion", "1", "3", "0.5", "1", "1"], ["MM_RomaniMask", "1", "3", "0.5", "1", "1"], ["MM_RoomKey", "1", "3", "0.5", "1", "1"], ["MM_SeaHorse", "1", "3", "0.5", "1", "1"], ["MM_SonataofAwakening", "1", "3", "0.5", "1", "1"], ["MM_SongofHealing", "1", "3", "0.5", "1", "1"], ["MM_SongofSoaring", "1", "3", "0.5", "1", "1"], ["MM_SongofStorms", "1", "3", "0.5", "1", "1"], ["MM_SongofTime", "1", "3", "0.5", "1", "1"], ["MM_SpecialDeliverytoMama", "1", "3", "0.5", "1", "1"], ["MM_SpringWater", "1", "3", "0.5", "1", "1"], ["MM_StoneMask", "1", "3", "0.5", "1", "1"], ["MM_SwampTitleDeed", "1", "3", "0.5", "1", "1"], ["MM_TwinmoldRemains", "1", "3", "0.5", "1", "1"], ["MM_ZoraEgg", "1", "3", "0.5", "1", "1"], ["MM_ZoraMask", "1", "3", "0.5", "1", "1"]];

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
            ["MM_Bug", "Bugs"], ["MM_BigPoe", "Big Poe"], ["MM_BlueFire", "Blue Fire"], ["MM_BluePotion", "Blue Potion"], ["MM_Fish",
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
