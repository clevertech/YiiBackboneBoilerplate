/**
 * Application controller
 *
 * @author antonio ramirez <antonio@clevertech.biz>
 */
define([
    'backboneMarionette',
    'http',
    'app',
    'session'
], function(Marionette, Http, App) {
    'use strict';

    return {
        /* renders error page with correspondent failure number */
        goto_error: function (actions) {
            require(['views/error/page'], function(ErrorPage){
                if(Http.isUnAuthorized(actions)) {
                    App.router.navigate('index', {trigger:true});
                    return false;
                }
                var description = Http.getStatusDescription(actions) || 'Unknown';
                var errorPage = new ErrorPage({model: new Backbone.Model({number:actions, description:description})});
                App.pageRegion.show(errorPage);
            });
        },
        /* renders index page - login*/
        goto_index: function() {
            require(['views/index/page'], function(IndexPage){
                var indexPage = new IndexPage();
                App.pageRegion.show(indexPage);
            })

        },
        /* renders settings page */
        goto_settings: function() {
            require(['views/settings/page'], function(SettingsPage){
                var settingsPage = new SettingsPage();
                App.pageRegion.show(settingsPage);
            });
        },
        /* renders dashboard */
        goto_dashboard: function(username) {

            require(['views/dashboard/page'], function(DashboardPage){
                var dashboardPage = new DashboardPage({username:username});
                App.pageRegion.show(dashboardPage);
            });
        },
        /* triggers not found error/404 when page is not found */
        goto_notFound: function() {
            App.router.navigate('error/404', {trigger: true});
        }
    }
});