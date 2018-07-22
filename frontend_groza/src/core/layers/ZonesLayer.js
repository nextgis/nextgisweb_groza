import L from 'leaflet';
import EventBus from '../../event-bus';
import parse from 'wellknown';
import Proj from 'proj4leaflet';
import leafletPointPip from '@mapbox/leaflet-pip';
import './ZonesLayer.css';

const ZonesLayer = L.FeatureGroup.extend({
  initialize: function (zones, options) {
    const proj = Proj;
    this._layers = {};
    this._zones = [];
    this._listeners = [];
    this._intervalId = null;
    this._buildZones(zones);
    L.setOptions(this, options);
  },

  _buildZones: function (zones) {
    for (const index of zones.keys()) {
      const zoneData = zones[index];
      const geojsonLayer = L.Proj.geoJson([], {
        'weight': 1,
        'opacity': 0.7,
        'className': `ng-zone ng-zone-${index}`
      });
      const features = zoneData.map(geom => {
        const geomGeoJson = parse(geom);
        return {
          'type': 'Feature',
          'geometry': geomGeoJson,
          'crs': {
            'type': 'name',
            'properties': {
              'name': 'urn:ogc:def:crs:EPSG::3857'
            }
          }
        };
      });
      geojsonLayer.addData(features);
      this.addLayer(geojsonLayer);
      this._zones[index] = geojsonLayer;
    }
  },

  onAdd: function (map) {
    this._bindEvents();
    L.LayerGroup.prototype.onAdd.call(this, map);
    this._runInterval();
  },

  _runInterval: function () {
    let classAdded = false;
    this._intervalId = setInterval(() => {
      const layerPane = this.getPane();
      if (classAdded) {
        layerPane.classList.remove('ng-alert');
      } else {
        layerPane.className += ' ng-alert';
      }
      classAdded = !classAdded;
    }, 1000);
  },

  _bindEvents: function () {
    const that = this;
    let listener;

    listener = EventBus.$on('EVENT_LESS_FIVE_MINUTE_CREATED', (eventItem) => this._createTargetEvent(eventItem));
    this._listeners.push(listener);

    listener = EventBus.$on('EVENT_LESS_FIVE_MINUTE_REMOVED', (eventItem) => this._removeTargetEvent(eventItem));
    this._listeners.push(listener);
  },

  _createTargetEvent(eventItem) {
    this._geoProcessTargetEvent(eventItem, true);
  },

  _removeTargetEvent(eventItem) {
    this._geoProcessTargetEvent(eventItem, false);
  },

  _geoProcessTargetEvent(eventItem, isAdded) {
    for (const zoneIndex of this._zones.keys()) {
      if (eventItem.ligh_t === 0 && (zoneIndex === 0 || zoneIndex === 1)) {
        continue;
      }

      const zoneLayer = this._zones[zoneIndex];
      const zonePolygons = leafletPointPip.pointInLayer({
        lng: eventItem.lon,
        lat: eventItem.lat
      }, zoneLayer);

      for (const zonePolygon of zonePolygons) {
        if (!zonePolygon.hasOwnProperty('groza')) {
          zonePolygon.groza = {
            count: 0,
            events: {},
            alert: false
          };
        }

        if (isAdded) {
          zonePolygon.groza.count++;
          zonePolygon.groza.events[eventItem.id] = eventItem;
        } else {
          zonePolygon.groza.count--;
          delete zonePolygon.groza.events[eventItem.id];
        }

        this._verifyPolygon(zonePolygon, zoneIndex);
      }
    }
  },

  _verifyPolygon: function (zonePolygon, zoneIndex) {
    let alertCondition = false;

    switch (zoneIndex) {
      case 0:
        alertCondition = zonePolygon.groza.count > 4;
        break;
      case 1:
        alertCondition = zonePolygon.groza.count > 4;
        break;
      case 2:
        alertCondition = zonePolygon.groza.count > 9;
        break;
      default:
        throw Exception(`Unknown zone index "${zoneIndex}"`);
    }

    if (zonePolygon.groza.alert === alertCondition) return true;

    const zonePolygonElement = zonePolygon.getElement();
    const oldClassName = zonePolygonElement.className.baseVal;
    if (alertCondition) {
      zonePolygonElement.setAttribute('class', `${oldClassName} ng-alert`);
    } else {
      zonePolygonElement.setAttribute('class', oldClassName.replace(' ng-alert', ''));
    }
    zonePolygon.groza.alert = alertCondition;
  },

  destroy: function () {
    this._unbindEvents();
    this._destroyInterval();
  },

  _unbindEvents: function () {
    this._listeners.forEach((listener) => {
      listener.$off();
    });
  },

  _destroyInterval: function () {
    if (this._intervalId) {
      clearInterval(this._intervalId);
      this._intervalId = null;
    }
  }
});

L.ZonesLayer = ZonesLayer;

L.zonesLayer = function () {
  return new ZonesLayer();
};

export default ZonesLayer;
