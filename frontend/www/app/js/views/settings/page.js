/**
 * SettingsPageView
 *
 * Renders demo settings page
 *
 * @author Antonio Ramirez <antonio@clevertech.biz>
 */
define([
    'backboneMarionette',
    'text!templates/settings/page.html'
], function (Marionette, SettingsPageTemplate) {
    return Marionette.ItemView.extend({
        template:SettingsPageTemplate
    });
});
