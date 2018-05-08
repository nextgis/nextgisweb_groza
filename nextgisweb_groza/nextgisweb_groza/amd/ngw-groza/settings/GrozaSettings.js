define([
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'ngw-pyramid/modelWidget/Widget',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/request/xhr',
    'dojo/json',
    'ngw/route',
    'ngw-pyramid/i18n!groza',
    'ngw-pyramid/hbs-i18n',
    'dojo/text!./GrozaSettings.hbs',
    'dijit/layout/ContentPane',
    'dijit/layout/BorderContainer',
    'dijit/form/NumberTextBox',
    'dijit/form/Button',
    'dijit/form/Select',
    'dojox/layout/TableContainer',
    'ngw-resource/ResourceBox'
], function (declare,
             array,
             lang,
             Widget,
             _TemplatedMixin,
             _WidgetsInTemplateMixin,
             xhr,
             json,
             route,
             i18n,
             hbsI18n,
             template) {
    var API_URL = route.groza.settings();

    return declare([Widget, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: hbsI18n(template, i18n),

        postCreate: function () {
            this.inherited(arguments);
            var self = this;
            this.buttonSave.on('click', function () {
                self.save();
            });
        },

        startup: function () {
            this.inherited(arguments);
            var self = this,
                data;
            xhr.get(API_URL, {
                handleAs: 'json'
            }).then(function (result) {
                data = result.data;
                if (data.web_map) {
                    self.webMap.attr('value', {'id': data.web_map});
                }
                self.ellipseZoomVisible.attr('value', data.ellipse_z_visible);
            });
        },

        save: function () {
            xhr.put(API_URL, {
                handleAs: 'json',
                headers: {'Content-Type': 'application/json'},
                data: json.stringify({
                    web_map: this.webMap.attr('value').id,
                    ellipse_z_visible: this.ellipseZoomVisible.attr('value')
                })
            }).then(function () {
                alert(i18n.gettext('Groza settings has been saved successfully!'));
            }, function () {
                alert(i18n.gettext('Error, Groza settings not has been saved!'));
            });
        }
    });
});
