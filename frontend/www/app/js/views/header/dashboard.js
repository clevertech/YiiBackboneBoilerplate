/**
 *
 * DashboarHeaderMenuView
 *
 * Renders dashboard navigation bar
 * @author antonio ramirez <antonio@clevertech.biz>
 */
define([
    'backboneMarionette',
    'text!templates/header/dashboard.html',
    'app',
    'backboneBUI'
], function (Marionette, DashboardTemplate, App) {

    return Marionette.ItemView.extend({
        template: DashboardTemplate,
        /**
         * setup events
         */
        events:{
            'click #nav-logout':'logout'
        },
        /**
         * load required js files before rendering the view
         */
        beforeRender: function() {
            /**
             * Load twitter bootstrap by making use of Backbone.BUI.Loader
             */
            Backbone.BUI.Loader.load([Backbone.BUI.Loader.bootstrapDropdown], Backbone.BUI.Config.BOOTSTRAP);
        },

        /**
         * calls global app event
         */
        logout: function() {
            App.vent.trigger('site:logout');
        }
    });
});