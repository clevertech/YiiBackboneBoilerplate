/**
 * IndexPageView
 *
 * Renders demo index page with login box
 *
 * @author Antonio Ramirez <antonio@clevertech.biz>
 */
define([
    'backboneMarionette',
    'session',
    'text!templates/index/page.html',
    'models/login',
    'app',
    'backboneBUI'
], function (Marionette, Session, IndexPageTemplate, LoginModel, App) {

    return Marionette.ItemView.extend({

        /**
         * All Marionette views require a template
         */
        template:IndexPageTemplate,

        /**
         * Setup events
         */
        events:{
            'click button[name=sign-in]':'login'
        },

        /**
         * Backbone's initialize method
         */
        initialize:function () {
            _.bindAll(this, 'logout', 'checkAuth', 'error');


            // setup global events
            App.vent.on('site:logout', this.logout, this);

            this.model = new LoginModel();
            this.model.on('error', this.error);

            // fire checkAuth event when the attribute authenticated of
            // the LoginModel has been changed
            this.model.on('change:authenticated', this.checkAuth);

        },

        /**
         * Login user
         */
        login:function (e) {
            e.preventDefault();
            this.model.url = '/site/login';
            this.model.save({
                username:this.$('input[name=username]').val(),
                password:this.$('input[name=password]').val()
            });
        },

        /**
         * Logout from the application
         */
        logout:function () {
            this.model.url = '/site/logout';
            this.model.save({
                username:this.model.get('username')
            });
            /* remove menu region */
            App.menuRegion.close();
        },
        /**
         * Checks authorization
         */
        checkAuth:function (model, value) {
            if (value) {
                // now display dashboard
                App.router.navigate('dashboard/' + model.get('username'), {trigger: true});
            }
            else {

                // now display index
                App.router.navigate('index', {trigger: true});
            }

        },
        /**
         * Displays an inline error message
         */
        error:function (model, response) {

            if (response.responseText) {
                var alertError = new Backbone.BUI.Alert({
                    ctype:Backbone.BUI.Config.Alert.ERROR,
                    title:'Oops!',
                    message:response.responseText,
                    renderTo:$('.head'), /* change to whatever */
                    timeout:3000
                });
                alertError.render();
            }
        },

        /**
         * Renders the login
         */
        onRender:function () {
            var that = this;

            Session.checkAuth(function (data) {
                if (!data.authenticated) {
                    that.model.set(data, {silent:true});
                }
                else {
                    that.model.set(data);
                }
                return that;
            });
        }
    });
});