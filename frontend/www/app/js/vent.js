/**
 * vent Module
 *
 * Initializes new event aggregator to be used without worrying about circular dependencies
 *
 * @author Antonio Ramirez <antonio@clevertech.biz>
 */
require(['backboneMarionette'], function (Marionette) {
    // http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/
    'use strict';
    return new Marionette.EventAggregator();
});