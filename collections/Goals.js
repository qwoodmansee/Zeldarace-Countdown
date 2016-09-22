Goals = new Mongo.Collection('goals');

GoalSchema = new SimpleSchema({
    name: {
        type: String,
        label: "Name of Goal",
    },
    types: {
        type: [{String: Number}],
        label: "Types"
    },
    subtypes: {
        type: [{String: Number}],
        label: "Subtypes"
    },
    child: {
        type: Boolean,
        label:"Child Goal"
    }
});

Goals.attachSchema(GoalSchema);