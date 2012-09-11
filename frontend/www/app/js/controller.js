/**
 * Application controller
 *
 * @author antonio ramirez <antonio@clevertech.biz>
 */
define([
    'backboneMarionette',
    'http',
    'session'
], function(Marionette, Http){
    'use strict';

    return {
        /* renders error page with correspondent failure number */
        goto_error: function (actions) {
            require(['views/error/page'], function(ErrorPage){
                if(Http.isUnAuthorized(actions)) {
                    app.router.navigate('index', {trigger:true});
                    return false;
                }
                var description = Http.getStatusDescription(actions) || 'Unknown';
                var errorPage = new ErrorPage({model: new Backbone.Model({number:actions, description:description})});
                app.pageRegion.show(errorPage);
            });
        },
        /* renders index page - login*/
        goto_index: function() {
            require(['views/index/page'], function(IndexPage){

                var indexPage = new IndexPage();
                app.pageRegion.show(indexPage);
            })

        },
        /* renders settings page */
        goto_settings: function() {
            require(['views/settings/page'], function(SettingsPage){
               var settingsPage = new SettingsPage();
               app.pageRegion.show(settingsPage);
            });
        },
        /* renders dashboard */
        goto_dashboard: function(username) {

            require(['views/dashboard/page'], function(DashboardPage){
                var dashboardPage = new DashboardPage({username:username});
                app.pageRegion.show(dashboardPage);
            });
        },
        /* triggers not found error/404 when page is not found */
        goto_notFound: function() {
            app.router.navigate('error/404', {trigger: true});
        }
    }
});
