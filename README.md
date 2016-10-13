OoT Countdown Current Status

----------------------------------------------------------------------------------
**Game Summary:**

* Racer(s) share a timer which counts down. Before the timer reaches 0, racers must finish some number of goals.
* While finishing the goals, racers can gain points by collecting items along the way.
* Each item has an assigned point value, so some may be worth more than others.
* At the end of the race, all players pause and double check that their scorecard is correct. Whoever has the most points, wins the race.
	 
**Rules: **

*  English Version (for new community outreach reasons).
	
* No Bottle Duping over negative value items, however RBA'ing them away is acceptable

* An item must exist in it's intended place on the menu at the end of the race to receive credit for it 

* All custom rules, restrictions, handicaps must be agreed upon by all racers
    
-----------------------------------------------------------
**Timer Settings:**

* Length: How long the timer goes

* Available Goals: How many goals there are to pick from

* Required Goals: How many goals must be complete before the clock hits 00:00:00 to be able to win

* PreChosen Goals: How many of the required goals are pre-chosen. If there are pre-chosen goals, all racers have the same pre-chosen goals.

* Weights: There is a scorecard with each item in the game, those items have a point value associated with them. If you have the item when the timer hits 00:00:00, you get the points
    
     * There are a few options with weights:
        	Equal: All items have a point value of one
        	Random: All items have a positive random point value
        	Random (Allow Negative): All items have a random point value
        	Smart: In development - Goals will have a random point value which makes sense

* Smart Goals: If checked, the app will make sure that at least some percentage of the possible selections of goals are completable in the time limit (this is recommended)
    
------------------------------------------------------------------------------------------

Basic Race Procedure:
	
	1. Decide on a host (hereby named "Host" for this example).
	2. 
	2. All other racers hereby named "Racers" for this example.

	3. Host logs in to zeldarace.com and invites Racers to his zeldarace.com URL

	4. Host clicks generate timer, and decides (with potential input from Racers) the timer/race settings.
	  * It is helpful to add 1 minute to a race as a countdown to the first "A" press - this allows all racers to be perfectly synced with no network dependencies.

	5. Host calls a ready check and presses "Start Timer" when all ready.

	6. Players Press A to start the race, and open their goal and scorecard (if not already open).

------------------------------------------------------------------------------------------

Implementation Details:

**Smart Goals:**

	1. A script pulls the goals and "time" column from the shared Bingo Google Doc.
		
	2. Generator picks a set of available goals (length set by the user)

	3. Generator checks how many are required (also set by the user)

	4. Generator tests every combination of goals that could be required, figures out what the total "time" is for them, then adds 20% and 30 minutes (for base things like going adult, etc)

	5. Generator makes sure that at least 30% of the seletions have a calculated completion time less than the Timer Length. If not, it picks new goals, and tries again
	
**Smart Weights (In Progress):**

	1. A script pulls the information from this spreadsheet linked in the sources section

	2. For each item, there is a mean and standard deviation which represents a normal distribution of where the item's weight might lie.

	3. For each item, the generator picks a value from the normal distribution and assigns it to the item

	4. Eventually RBA may be optional, allowing for a different logic if racers decide to disallow RBA in the race.

	5. Currently the "Negative Chance" is unused, and giving an item a negative mean is preferred.
			
--------------------------------------------------------------------------------------

Implemented User Requests:
 
* Stream card which displays up to date goals, score, and timer in a verticle fashion
* Smart goal generation so impossible goals aren't chosen for low length timers.
*  Reset Timer button so the same card and goals can be used for a second attempt at a race.
* Tooltips when hovering over items in the scorecard, mainly to be able to tell difference between bomb bags, quivers, songs, and hookshot
* Points system for collecting Golden Skulls, Hearts, and Rupees
* Reduced Twitch access requirements (now down to just email, which is minimum and not saved or used by my application).
* FAQ 
	
---------------------------------------------------------------------------------------

Unimplemented User Requests:

	* Ability to see other racer's scores live on your page %
	* Lock Scorecard or Goal List to be saved for next timer generation 
	* Smart Weights (in progress) %
	* Built in Countdown to starting A-Press for all races
	* X-Minute Remaining warnings 
	* Filename Generation %
	* Official Handicap Protocol %
	* UI to support Handicap Protocol
		
 % - Plan on implementing soon
			
------------------------------------------------------------------------------------------

Authored Solely by Twitch user and software developer **qwoodmansee.**
For more information, contact qwoodmansee at [twitch.tv/qwoodmansee](twitch.tv/qwoodmansee).

**Special thanks** to all who have helped on this project so far and the entire ZSR community.

**Extended shoutouts** to Gombill, Runnerguy2489, Hyperion64, Juwk, Saltor, and dannyb21892 for their continued support and advice.
	
**Want to get involved?** Message qwoodmansee on Twitch or Discord and he would love to help get you set up.
