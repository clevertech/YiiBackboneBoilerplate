/**
 * ErrorPageView
 *
 * Renders http errors
 *
 * @author Antonio Ramirez <antonio@clevertech.biz>
 */
define([
    'backboneMarionette',
    'http',
    'text!templates/error/page.html'
], function (Marionette, Http, ErrorPageTemplate) {

    return Marionette.ItemView.extend({
        template: ErrorPageTemplate
    });
});