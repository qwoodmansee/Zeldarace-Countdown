Goals = new Mongo.Collection('goals');

 export  const GoalSchema = new SimpleSchema({
    name: {
        type: String,
        label: "Name of Goal",
    },
    jp: {
        type: String,
        label: "Jap. Name",
    },
    types: {
        type: [{String: Number}],
        label: "Types",
        autoform: {
            type:"hidden"
        }
    },
    subtypes: {
        type: [{String: Number}],
        label: "Subtypes",
        autoform: {
            type:"hidden"
        }
    },
    child: {
        type: Boolean,
        label:"Child Goal"
    }
});

Goals.attachSchema(GoalSchema);