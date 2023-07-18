"use strict";

;(function(jQuery, Drupal, drupalSettings, google) {

    Drupal.behaviors.initCoordonneesMap = {
        attach: function (context, settings) {
            var mapBlock = jQuery(".block-coords-map .map");

            if (typeof Drupal.acreat.leaflet != "undefined") {
                // Get options.
                var options = jQuery.extend(true, settings.acreat.leaflet.map.options, {
                    markers: [
                        {"lat": mapBlock.data("latitude"), "lng": mapBlock.data("longitude")}
                    ]
                });

                // Set icons.
                if (typeof settings.acreatFactory.markerUrl != "undefined") {
                    // Set the pointer to center bottom by default.
                    var image = new Image();
                    image.onload = function(event) {
                        if (this.naturalWidth && this.naturalHeight) {
                            Drupal.acreat.leaflet.defaults.icon.iconSize = [this.naturalWidth, this.naturalHeight];
                            Drupal.acreat.leaflet.defaults.icon.iconAnchor = [this.naturalWidth/2, this.naturalHeight];
                            Drupal.acreat.leaflet.defaults.icon.iconUrl = settings.acreatFactory.markerUrl;
                            Drupal.acreat.leaflet.setDefaults(Drupal.acreat.leaflet.defaults);
                        }

                        // Draw map.
                        var map = Drupal.acreat.leaflet.createMap(mapBlock.get(0), settings.acreat.leaflet.map.options);
                        map.zoomControl.setPosition('bottomright');
                    };
                    image.src = settings.acreatFactory.markerUrl;
                }
                else {
                    // Draw map.
                    var map = Drupal.acreat.leaflet.createMap(mapBlock.get(0), settings.acreat.leaflet.map.options);
                    map.zoomControl.setPosition('bottomright');
                }
            } else {
                var markerPos = new google.maps.LatLng(mapBlock.data("latitude"), mapBlock.data("longitude"));
                var mapOptions = {
                    zoom: 11,
                    center: markerPos
                };

                if (drupalSettings.acreatFactory.mapsStyles) {
                    mapOptions.styles = eval(drupalSettings.acreatFactory.mapsStyles);
                }

                if (mapBlock.length) {
                    var map = new google.maps.Map(mapBlock.get(0), mapOptions);
                    var marker = new google.maps.Marker({
                        position: markerPos,
                        map: map,
                        icon: drupalSettings.acreatFactory.markerUrl
                    });
                }
            }
        }
    };
})(jQuery || window.jQuery, Drupal, drupalSettings, google);
;
