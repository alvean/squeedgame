Config = {
    _collection: new Mongo.Collection("config"),

    get: function (name, defaultValue) {
        var doc = this._collection.findOne({key: name});
        if (doc) {
            return doc.value;
        } else {
            return defaultValue;
        }
    },

    inc: function (name) {
        this._collection.update({key: name}, {$inc: {value: 1}}, {upsert: true});
    },

    init: function(name) {
        var doc = this._collection.findOne({key: name});
        if (!doc) {
            this._collection.insert({key: name, value: 0});
        }
    }

};

if (Meteor.isServer) {
    Config._collection._ensureIndex({key: 1}, {unique: true});
}
