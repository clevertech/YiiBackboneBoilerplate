/**
 * DashboardPageView
 *
 * Renders dashboard page
 *
 * @author Antonio Ramirez <antonio@clevertech.biz>
 */
define([
    'backboneMarionette',
    'text!templates/dashboard/page.html',
    'views/header/dashboard',
    'app',
    'backboneBUI'
], function (Marionette, DashboardPageTemplate, DashboardHeaderMenuView, App) {

    return Marionette.ItemView.extend({
        template: DashboardPageTemplate,
        /**
         * setup initial values
         * todo: we should actuall get the username from logged user ajax'ed from the server instead. This is for
         * demo purposes.
         */
        initialize: function() {
            this.username = this.options.username
        },
        /**
         * before rendering dashboard, render main top menu
         */
        beforeRender: function() {
            var dashboardHeaderMenuView = new DashboardHeaderMenuView({model:new Backbone.Model({username:this.options.username})});
            App.menuRegion.show(dashboardHeaderMenuView);
        }
    });
});