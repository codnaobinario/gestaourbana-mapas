var App = window.App || {};

window._ = require('underscore');
window.Eventable = require('../bower_components/Eventable/eventable');
require('../bower_components/sir-trevor-js/sir-trevor');

var L = require('../bower_components/leaflet/dist/leaflet');

var LayerModel = require('./model/Layer');
var ThemeModel = require('./model/Theme');
var GroupLayerModel = require('./model/GroupLayer');
var PoiModel = require('./model/Poi');

var Router = Backbone.Router.extend({
    routes: {
        '': 'index',
        'ponto-de-interesse/:id': 'show',
        'noticia/criar/:poi_id': 'noticiaCriar',
        'search/:query': 'search',
        '*default': 'default'
    },

    index: function() {

        var groups = new GroupLayerModel();

        groups.fetch({
            success: function(model, response, options) {
                var s = new App.GroupLayerView({
                    model: groups
                });
            }
        });

        var theme_active = new ThemeModel();

        theme_active.fetch({
            success: function(model, response, options) {
                var t = new App.ThemeView({
                    model: theme_active
                });
            }
        });

    },

    show: function(id) {
        var poi = new PoiModel({'_id':id});
        poi.fetch({success:function(model, response, options) {
            var g = new App.PoiView({
                model:poi
            });
        }});
    },

    noticiaCriar: function (poi_id) {
        jQuery('.modal-noticia-criar').trigger('click');
        new SirTrevor.Editor({ el: $('.js-st-instance') });
    },

    download: function(random) {
        $(document.body).append("download route has been called.. with random equals : " + random);
    },

    search: function(query) {
        $(document.body).append("Search route has been called.. with query equals : " + query);
    },

    default: function(defaultt) {
        $(document.body).append("This route is not hanled.. you tried to access: " + defaultt);

    }

});


module.exports = Router;
