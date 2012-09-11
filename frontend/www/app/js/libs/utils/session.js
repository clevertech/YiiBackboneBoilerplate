define([
    'jquery'
], function ($) {
    var authUri = '/site/isLogged';

    return {
        /**
         * Checks whether is logged in or not
         * @return {Boolean}
         */
        checkAuth:function (callback) {
            $.when($.ajax(authUri)).then(callback);
        }
    };
});