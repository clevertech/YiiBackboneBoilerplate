// Use this as a quick template for future collections
// Use this as a quick template for future models
define([
    'jquery',
    'underscore',
    'backbone',
    'models/{{modelname}}'
], function ($, _, Backbone, ModelName) {

    var MyCollection = Backbone.Collection.extend({
        model:ModelName,
        url:'url'
    });

    return MyCollection;
});
