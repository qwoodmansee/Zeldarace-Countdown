/**
 * Created by Quinton on 9/24/2016.
 */
import { Meteor } from 'meteor/meteor';

// Don't let people write arbitrary data to their 'profile' field from the client
Meteor.users.deny({
    update() {
        return true;
    }
});