# YiiBackboneBoilerplate
We use this folder structure setup on [***Clevertech***](http://clevertech.biz) for our own projects when developing [BackboneJS](http://www.backbonejs.org) applications.

### Overview

**YiiBackboneBoilerplate**, aims to provide *Yii Backbone developers* with an application folder to easy their project startups. It uses the flexibility of our [**YiiBoilerplate**](https://github.com/clevertech/YiiBoilerplate) with a *twist* for Backbone applications.

#### What is BackboneJS?
Backbone.js gives structure to web applications by providing models with key-value binding and custom events, collections with a rich API of enumerable functions, views with declarative event handling, and connects it all to your existing API over a RESTful JSON interface.
 
You may be thinking now that Yii is too powerful to be working just as a RESTful service, that could be done with [NodeJS](http://nodejs.org) or any of the libraries to serve the purpose but it is the power of Yii that made us decide for it for the sake of application scalability.

### BackboneJS + Yii 
We love to work at [***Clevertech***](http://clevertech.biz) with [Yii](http://www.yiiframework.com), in fact, is one of the biggest assets of the company nowadays. Nevertheless, we are very aware of the new trends and we had the opportunity to work with [BackboneJS](http://www.backbonejs.org) and decided that it could be good to provide a project startup for our developers and get the best out of both worlds.
 

### Backbone Overall Folder Structure
This document will be focused mainly in the folder structure that we set for the Backbone application. Please, read [YiiBoilerplate's README](https://github.com/clevertech/YiiBoilerplate) for a deep explanation of the main [Yii](http://www.yiiframework.com)
folder structure setup.

Below the directory structure we are using:

	/
    backend/
        ...
    common/
        ...
    console/
		...
    frontend/
		...
		www/
	    	app/
	            css/
	            img/
	            js/
	                boilerplate/
	                collections/
	                libs/
	                models/
	                views/
	                app.js
	                controller.js
	                main.js
	                router.js
	                vent.js
	            templates/
    tests/
        ...


####Backbone Application Directories
At the js directory, we have:  
  
* ***boilerplate***: we have created a set of elements for you to create a model, collection, module and/or view. Please, note that the basic application skeleton that we have setup for you is based on  [Backbone.Marionette](https://github.com/marionettejs/backbone.marionette) and the views are different from norml Backbone views.
* ***collections***: this is were we place the collections of our application.   
* ***libs***: holds the main libraries. We include in it the ones we thought are the most useful.  
* ***models***: should include the Backbone models of the application.
* ***views***: backbone views.

A special mention is the ***templates*** directory. This folder is normally within the ***js*** folder but we thought that would be better to separate UI design from the business logic of the javascript files. 

###The _runpostdeploy_ script
This section is actually extracted from [YiiBoilerplate](https://github.com/clevertech/YiiBoilerplate) but is worth repeating the procedure.  

The project has a very useful script that automatically creates the required and **not** shared folders for a Yii application: the **runtime** and **assets** folders, extracts the configuration settings specified for a specific environment and copies them to the ****-env.php*** files and runs migrations when not on private environments -we believe that migrations should be always run manually by developers on their machines.

From the application's root folder, to run the script simply do:

```
./runpostdeploy environmentType migrations
```

* **environmentType** (required): can be "any" of the ones you configure on the **environments** folders (i.e. `./runpostdeploy private` to use ****-private.php*** configurations)
* **migrations** (optional): could be "**migrate**"" or "**no-migrate**". 
	* migrate: will run migrations
	* no-migrate: will not run migrations (on private wont run them anyway) 
	
###Final Notes
We would like to inform that this is just a startup **boilerplate** for your own projects. It is not intended by no means to be used ***'AS IS'*** but as a base to scale to more complicated structures.   

Neverteless, we have included a couple of goodies that we hope to improve with the help of the community. 

====

> [![Clevertech](http://clevertech.biz/images/slir/w54-h36-c54:36/images/site/index/home/clevertech-logo.png)](http://www.clevertech.biz)    
well-built beautifully designed web applications  
[www.clevertech.biz](http://www.clevertech.biz)
