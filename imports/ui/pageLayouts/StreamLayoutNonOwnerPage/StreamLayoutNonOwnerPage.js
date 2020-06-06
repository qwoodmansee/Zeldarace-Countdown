/**
 * Created by Quinton on 5/19/17.
 */
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import {Timers} from '../../../api/timers/Timers.js';
import {PageViewers} from '../../../api/pageViewers/PageViewers.js';
import {Presets} from '../../../api/presets/Presets.js';
import {ItemList} from '../../../helpers/ItemList.js';

import '../../partialLayouts/GenerateTimerModal/GenerateTimerModal.js';
import '../../partialLayouts/StreamLayoutGoalList/StreamLayoutGoalList.js';
import '../../partialLayouts/StreamLayoutScorecard/StreamLayoutScorecard.js';
import '../../partialLayouts/MM_StreamLayoutScorecard/MM_StreamLayoutScorecard.js';
import '../../partialLayouts/ScreenshotModal/ScreenshotModal.js';
import './StreamLayoutNonOwnerPage.html';
import './StreamLayoutNonOwnerPage.css';

Template.StreamLayoutNonOwnerPage.onCreated(function(){
    var self = this;
    self.countdown = null;

    //these reactives act as observables that are changed when the timer changes
    self.timerExists = new ReactiveVar(false);
    self.timerRunning = new ReactiveVar(false);
    self.timerStartTime = new ReactiveVar(null);
    self.timerLength = new ReactiveVar(null);
    self.mmTimer = new ReactiveVar(null);

    // this array holds the ids of all the moveable elements on the page.
    self.moveableObjectIds = [
        'goals',
        'owner-control-panel',
        'timer',
        'racer-list-card',
        'preset-loader',
        'item-menu-card',
        'equip-menu-card',
        'quest-status-card',
        'hearts-skulls-rupees-card',
        'individual-score-card'
    ];

    self.basicPreset =
        {
            "goals": {
                "width": "353px",
                "height": "333px",
                "left": "6px",
                "right": "1316px",
                "bottom": "600px",
                "top": "5.5px"
            },
            "owner-control-panel": {
                "width": "192px",
                "height": "267px",
                "left": "367px",
                "right": "1116px",
                "bottom": "558px",
                "top": "113.5px"
            },
            "timer": {
                "width": "185px",
                "height": "66px",
                "left": "271px",
                "right": "1219px",
                "bottom": "433.5px",
                "top": "439px"
            },
            "racer-list-card": {
                "width": "372px",
                "height": "113px",
                "left": "372px",
                "right": "931px",
                "bottom": "825px",
                "top": "0.5px"
            },
            "preset-loader": {
                "width": "264px",
                "height": "163px",
                "left": "3px",
                "right": "1408px",
                "bottom": "432.5px",
                "top": "343px"
            },
            "item-menu-card": {
                "width": "238px",
                "height": "177px",
                "left": "11px",
                "right": "1426px",
                "bottom": "244.5px",
                "top": "517px"
            },
            "equip-menu-card": {
                "width": "179px",
                "height": "176px",
                "left": "251px",
                "right": "1245px",
                "bottom": "246px",
                "top": "516.5px"
            },
            "quest-status-card": {
                "width": "199px",
                "height": "171px",
                "left": "434px",
                "right": "1042px",
                "bottom": "254.5px",
                "top": "513px"
            },
            "hearts-skulls-rupees-card": {
                "width": "263px",
                "height": "96px",
                "left": "452px",
                "right": "960px",
                "bottom": "460.5px",
                "top": "382px"
            },
            "individual-score-card": {
                "width": "182px",
                "height": "161px",
                "left": "566px",
                "right": "927px",
                "bottom": "662px",
                "top": "115.5px"
            },
            "mm-item-menu-card": {
                "width": "238px",
                "height": "177px",
                "left": "11px",
                "right": "1426px",
                "bottom": "244.5px",
                "top": "517px"
            },
            "mm-quest-status-card": {
                "width": "200px",
                "height": "176px",
                "left": "251px",
                "right": "1245px",
                "bottom": "246px",
                "top": "516.5px"
            },
            "mm-mask-menu-card": {
                "width": "238px",
                "height": "177px",
                "left": "465px",
                "right": "1042px",
                "bottom": "254.5px",
                "top": "513px"
            },
            "mm-hearts-skulls-rupees-card": {
                "width": "263px",
                "height": "96px",
                "left": "452px",
                "right": "960px",
                "bottom": "460.5px",
                "top": "382px"
            },

            "mm-individual-score-card": {
                "width": "182px",
                "height": "161px",
                "left": "566px",
                "right": "927px",
                "bottom": "662px",
                "top": "115.5px"
            }
        };

    self.applyPreset = function(preset) {
        for (prop in preset) {
            var idProp = '#' + prop;
            if (preset.hasOwnProperty(prop)) {
                for (cssProp in preset[prop]) {
                    if (preset[prop].hasOwnProperty(cssProp)) {
                        $(idProp).css(cssProp, preset[prop][cssProp]);
                    }
                }
            }
            $(idProp).css("position", "fixed");

            $('.draggable').draggable();
            $('.droppable').droppable();
        }
    };

    self.createPreset = function() {
        var elementIdList = self.moveableObjectIds;
        var cssPropertyList = ["width", "height", "left", "right", "bottom", "top"];
        var preset = {};
        elementIdList.forEach(function(elementId) {
            var selectorId = "#" + elementId;
            var handle = $(selectorId);
            preset[elementId] = {};
            cssPropertyList.forEach(function(propertyName) {
                preset[elementId][propertyName] = $(selectorId).css(propertyName);
            });
        });

        return preset;
    };


    self.createTimer = function(id, endtime){
        var endTime = endtime;
        var clock = document.getElementById(id);
        var hoursSpan = clock.querySelector('.hours');
        var minutesSpan = clock.querySelector('.minutes');
        var secondsSpan = clock.querySelector('.seconds');
        $('#' + id).show();
        self.countdown = this;
        function updateClock(){
            var t = self.getTimeRemaining(endTime);
            hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
            minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
            secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
            if(t.total<=0){
                hoursSpan.innerHTML = ('00');
                minutesSpan.innerHTML = ('00');
                secondsSpan.innerHTML = ('00' + "  [Complete]");
                if (typeof timeinterval != 'undefined') {
                    clearInterval(timeinterval);
                }
            }
        }

        updateClock(endtime); // run function once at first to avoid delay
        window.timeinterval = setInterval(updateClock, 1000);
    };

    self.getTimeRemaining = function(endtime) {
        var t = endtime - new Date().getTime();
        var seconds = Math.floor( (t/1000) % 60 );
        var minutes = Math.floor( (t/1000/60) % 60 );
        var hours = Math.floor( (t/(1000*60*60)) % 24 );
        var days = Math.floor( t/(1000*60*60*24) );
        var timeObj = {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
        Session.set("currentTimerRemaining" , timeObj);
        return timeObj;
    };

    self.autorun(function() {

        // gets a single timer with the username from the URL
        self.subscribe('singleTimer', FlowRouter.getParam('username'), {
            onReady: function() {

                // this will be final now since singleTimer's on ready has been called
                var timer = Timers.findOne();

                if (timer) {

                    //initialize reactives to initial timer value
                    self.timerExists.set(true);
                    self.timerRunning.set(timer['running']);
                    self.timerLength.set(timer['length']);
                    if (timer.hasOwnProperty('is_mm') && timer['is_mm'] === true) {
                        console.log("set mmTimer to true");
                        self.mmTimer.set(true);
                    } else {
                        self.mmTimer.set(false);
                    }
                    if (self.timerRunning.get() === true) {
                        self.timerStartTime.set(timer['timeStarted']);

                        // create and start countdown
                        self.createTimer('countdown', self.timerStartTime.get().getTime() + self.timerLength.get() * 60 * 1000);

                    } else {
                        self.timerStartTime.set(null);
                    }
                }

                //subscribe to all pageViewers for the current timer
                self.subscribe('pageViewers', {

                    // make sure if you aren't added to it yet to add yourself
                    onReady: function() {
                        var viewers = null;

                        //logged in users get a pageViewer entry/are tracked on page
                        if (Meteor.userId()) {

                            //get pageviewers table
                            viewers = PageViewers.findOne({username: Meteor.user().profile.name, ownerUsername: FlowRouter.getParam('username')});

                            //create a viewer object to insert into the db
                            var requiredGoals = [];
                            if (timer) {
                                for (var i = 0; i < timer.goals.length; i++) {
                                    if (timer.goals[i].required) {
                                        requiredGoals.push(i);
                                    }
                                }

                                // initialize an array to hold the values of collected items, hearts, skulls, and rupees
                                scorecardValues = new Array(65);
                                for (var i=0; i < 66; i++) {
                                    scorecardValues[i] = 0
                                }
                                scorecardValues[63] = 3 // hearts start at 3

                                //basically perform a client side upsert - have to work around since this is untrusted code
                                if (!viewers) {
                                    //if none existing, create a page viewer to go into the table
                                    var newPageViewer = {
                                        username: Meteor.user().profile.name,
                                        ownerUsername: FlowRouter.getParam('username'),
                                        score: 0,
                                        isReady: false,
                                        currentlyRacing: false,
                                        scorecardValues: scorecardValues
                                    };
                                    PageViewers.insert(newPageViewer);


                                } else {
                                    //already exists, just update
                                    PageViewers.update(viewers._id, {
                                        $set: {'score': 0, 'currentlyRacing': false, 'scorecardValues': scorecardValues}
                                    });
                                }

                                //update viewers variable for observe timer function to use
                                viewers = PageViewers.findOne({username: Meteor.user().profile.name, ownerUsername: FlowRouter.getParam('username')});

                            }
                        }

                        //set up a function to be called whenever the timer is updated
                        var query = Timers.find();
                        var handle = query.observeChanges({
                            changed: function(id, fields) {
                                if (fields.hasOwnProperty('is_mm')) {
                                    self.mmTimer.set(fields['is_mm']);
                                }
                                if (fields['running'] === true) {
                                    // timer started
                                    self.timerRunning.set(true);
                                    self.timerStartTime.set(fields['timeStarted']);

                                    // create and start countdown
                                    self.createTimer('countdown', self.timerStartTime.get().getTime() + self.timerLength.get() * 60 * 1000);


                                } else if (fields['running'] === false) {

                                    if (fields.hasOwnProperty('goals')) {
                                        // new timer from existing running timer
                                        self.timerRunning.set(false);
                                        self.timerStartTime.set(null);
                                        Session.set('goals', fields['goals']);

                                        //if this is false the timer is the same length as before
                                        if (fields.hasOwnProperty('length')) {
                                            self.timerLength.set(fields['length']);
                                        }
                                        clearInterval(timeinterval);
                                        $('#countdown').hide();

                                    } else if (fields.hasOwnProperty('running')) {
                                        // timer was reset
                                        // new timer from non started timer
                                        self.timerStartTime.set(null);
                                        self.timerRunning.set(false);
                                        clearInterval(timeinterval);
                                        $('#countdown').hide();

                                    } else {
                                        // timer ended (hit 00:00:00) - this actually might not happen
                                        self.timerRunning.set(false);
                                        clearInterval(timeinterval);
                                        $('#countdown').hide();
                                    }
                                }

                                if (fields.hasOwnProperty('goals')) {
                                    // new timer from non started timer
                                    self.timerStartTime.set(null);
                                    Session.set('goals', fields['goals']);

                                    //if this is false the timer is the same length as before
                                    if (fields.hasOwnProperty('length')) {
                                        self.timerLength.set(fields['length']);
                                    }
                                }
                            }
                        });

                        Tracker.autorun(function() {
                            var score = Session.get("score");
                            if (viewers) {
                                PageViewers.update(viewers._id, {
                                    $set: {'score': score}
                                });
                            }
                        });

                    }
                });

                //if timer doesn't exist must tell page and hide timer specific things
                if (timer) {
                    self.timerExists.set(true);
                    $('.goal-and-scorecard').show();
                } else {
                    self.timerExists.set(false);
                    $('.goal-and-scorecard').hide();
                }
            }
        });

        if (Meteor.userId()) {
            self.subscribe('userPresets', Meteor.user().profile.name);
        }

    });
});


Template.StreamLayoutNonOwnerPage.onRendered(function() {
    $('.modal-trigger').leanModal();

    $('.collapsible').collapsible({});

    $('.resizable-column').resizable({
        handles: "n, e, s, w, ne, se, sw, nw"
    });
    $('.resizable-card').resizable({
        handles: "n, e, s, w, ne, se, sw, nw"
    });

    $('.draggable').draggable();
    $('.droppable').droppable();

    Template.instance().applyPreset(Template.instance().basicPreset);

});

Template.StreamLayoutNonOwnerPage.helpers({

    UnactiveTimeFormatted() {
        var timerLength = Template.instance().timerLength.get();
        if (timerLength && !Template.instance().timerStartTime.get()) {
            var t = timerLength * 60 * 1000;
            var seconds = Math.floor((t / 1000) % 60);
            var minutes = Math.floor((t / 1000 / 60) % 60);
            var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
            Session.set("currentTimerRemaining" ,
                {'hours': ('0' + hours).slice(-2),
                    'minutes': ('0' + minutes).slice(-2),
                    'seconds': ('0' + seconds).slice(-2)});
            return {
                'total': t,
                'hours': ('0' + hours).slice(-2),
                'minutes': ('0' + minutes).slice(-2),
                'seconds': ('0' + seconds).slice(-2)
            };
        } else {
            return {
                'total': 0,
                'hours': '00',
                'minutes': '00',
                'seconds': '00'
            };
        }
    },

    mmTimer() {
        return Template.instance().mmTimer.get();
    },

    OwnerUsername() {
        return FlowRouter.getParam('username');
    },

    TimerNotRunning() {
        return !Template.instance().timerRunning.get();
    },

    TimerExists() {
        return Template.instance().timerExists.get();
    },

    // returns all the viewers for the current page from highest to lowest score
    PageViewers() {
        var viewers = PageViewers.find({ownerUsername: FlowRouter.getParam('username')});
        viewers = viewers.fetch();
        //return viewers sorted by score
        return viewers.sort(function(a,b) {
            return parseInt(b.score) - parseInt(a.score);
        })
    },

    CurrentlyRacing() {
        if (Meteor.userId()) {
            //get pageviewers table
            var viewer = PageViewers.findOne({username: Meteor.user().profile.name, ownerUsername: FlowRouter.getParam('username')});
            if (viewer) {
                return viewer.currentlyRacing;
            }
        }
        return false;
    },

    LoggedIn() {
        return Meteor.userId();
    },

    Presets() {
        // get the presets table
        var presetRetVal = Presets.findOne({createdBy: Meteor.user().profile.name});
        if (presetRetVal && presetRetVal.presets) {
            return presetRetVal.presets;
        } else {
            return [];
        }
    }
});

Template.StreamLayoutNonOwnerPage.events({

    'click #join-race-button': function() {
        if (Meteor.userId()) {
            //get pageviewers table
            var viewer = PageViewers.findOne({username: Meteor.user().profile.name, ownerUsername: FlowRouter.getParam('username')});
            if (viewer) {
                PageViewers.update(viewer._id, {
                    $set: {'score': Session.get('score'), 'currentlyRacing': true}
                });
            }
        }
    },

    'click #leave-race-button': function() {
        if (Meteor.userId()) {
            //get pageviewers table
            var viewer = PageViewers.findOne({username: Meteor.user().profile.name, ownerUsername: FlowRouter.getParam('username')});
            if (viewer) {
                PageViewers.update(viewer._id, {
                    $set: {'score': Session.get('score'), 'currentlyRacing': false}
                });
            }
        }
    },

    'click #toggle-ready-button': function() {
        if (Meteor.userId()) {
            var viewer = PageViewers.findOne({username: Meteor.user().profile.name, ownerUsername: FlowRouter.getParam('username')});
            if (viewer) {
                if (viewer.isReady) {
                    PageViewers.update(viewer._id, {
                        $set: {'isReady': false}
                    });
                } else {
                    PageViewers.update(viewer._id, {
                        $set: {'isReady': true}
                    });
                }
            }
        }
    },

    'click #create-screenshot': function(event) {
        event.preventDefault();
        var fullPageDiv = document.getElementById('full-stream-layout');
        if (fullPageDiv) {
            html2canvas(fullPageDiv, {
                onrendered: function(canvas) {
                    // canvas is the final rendered <canvas> element
                    canvas.toBlob(function(blob) {
                        //create fake file using blob
                        var formData = new FormData();
                        formData.append("file", blob, "test.png");
                        var request = new XMLHttpRequest();
                        request.open("POST", "https://discordapp.com/api/webhooks/315622333152755714/IzYWj76r6ke5tnN0sbPaG-GFTbUUuF_IkCOkQS4P2CyO0F3dfQh6KgCySieuvN1yfHsa");
                        request.send(formData);

                        request.onreadystatechange = function() {
                            if (request.readyState == XMLHttpRequest.DONE) {
                                console.log(request.responseText);
                            }
                        };

                        saveAs(blob, "CountdownScorecard.png");
                    });
                }
            });
        }
    },

    'click .load-preset-button': function(element) {
        // get the index of which button you clicked
        var presetIndex = parseInt(element.target.dataset.value);
        var presetsRetVal = Presets.findOne({createdBy: Meteor.user().profile.name});
        if (presetsRetVal) {
            var preset = presetsRetVal.presets[presetIndex];
            Template.instance().applyPreset(preset);
        }
    },

    'contextmenu .load-preset-button': function(event) {
        event.preventDefault();
        if (confirm("This will delete this preset, are you sure?")) {
            // get the index of which button you clicked
            var presetIndex = parseInt(event.target.dataset.value);
            var presetsRetVal = Presets.findOne({createdBy: Meteor.user().profile.name});
            if (presetsRetVal) {
                var presets = presetsRetVal.presets.splice(presetIndex, 1);
                Presets.update(presetsRetVal._id, {
                    $set: {'presets': presetsRetVal.presets}
                });

            }
        }
    },

    'click #load-default-preset': function() {
        Template.instance().applyPreset(Template.instance().basicPreset);
    },

    'click #create-preset': function() {
        var newPreset = Template.instance().createPreset();
        // find the presets that are associated with this user
        var presetsRetVal = Presets.findOne({createdBy: Meteor.user().profile.name});
        console.log(presetsRetVal);

        // if a preset has never been made for this user
        if (presetsRetVal) {
            presetsRetVal.presets.push(newPreset);
            Presets.update(presetsRetVal._id, {
                $set: {'presets': presetsRetVal.presets}
            });

        } else {
            temp = [];
            temp.push(newPreset);
            var presetObject = {
                createdBy: Meteor.user().profile.name,
                presets: temp
            };
            console.log("inserting new preset row");
            console.log(presetObject);
            Presets.insert(presetObject);
        }
    },

    'resize #timer' : function() {
        var timer = $('#timer');
        if (timer.width() < timer.height() / 2.5){
            $('#timer span').css('font-size', timer.width() / 1.5);
        } else {
            $('#timer span').css('font-size', timer.height() / 1.5);
        }
    }
});

