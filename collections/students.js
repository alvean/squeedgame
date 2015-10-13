Students = new Mongo.Collection("students");

if (Meteor.isServer) {
    Students._ensureIndex({email: 1}, {unique: true});
}
