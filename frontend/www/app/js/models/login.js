/**
 * LoginModel object
 * 
 * Model containing the interactive data as well as a large part of the logic 
 * surrounding it: conversions, validations, computed properties, 
 * and access control of LoginModel.
 * 
 * Here is where we need to setup logic with database
 * 
 */
define([
	'backbone'
	], function(Backbone) {

		return Backbone.Model.extend({
    
			defaults:{
				authenticated: false,
                username: null
			},

            /**
             * validation object
             * @see backbone.validation.js
             */
            validation: {
                username: {
                    required: true,
                    msg: 'Username is required'
                }
            }
		});

	});

