Config = {
    _collection: new Mongo.Collection("config"),

    get: function (name, defaultValue) {
        var doc = this._collection.findOne({key: name});
        if (doc) {
            return doc.value;
        } else {
            this._collection.insert({"roundCounter":defaultValue});
            return defaultValue;
        }
    },

    inc: function (name) {
        this._collection.update({key: name}, {$inc: {value: 1}}, {upsert: true});
    }
};

if (Meteor.isServer) {
    Config._collection._ensureIndex({key: 1}, {unique: true});
}
