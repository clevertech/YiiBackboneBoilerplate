// Use this as a quick template for future models
define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {

    var MyModel = Backbone.Model.extend({

        urlRoot:'url/root',

        defaults:{},
        url:function () {
        }
    });

    return MyModel;
});
