/**
 * UserModel object
 * 
 * Resources taken from Sherago <not yet used in kmodeling>
 * 
 */
define([
	'jquery', 
	'underscore', 
	'backbone',
	], function($, _, Backbone) {

		var UserModel = Backbone.Model.extend({

			urlRoot: 'api/user'
		});

		return UserModel;
	});
