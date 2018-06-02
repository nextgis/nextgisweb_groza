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
                if (data.web_map) self.webMap.attr('value', {'id': data.web_map});
                if (data.zone_1_class) self.zoneFirstClass.attr('value', {'id': data.zone_1_class});
                if (data.zone_2_class) self.zoneSecondClass.attr('value', {'id': data.zone_2_class});
                if (data.zone_3_class) self.zoneFirstClass.attr('value', {'id': data.zone_3_class});

                self.ellipseZoomVisible.attr('value', data.ellipse_z_visible);
            });
        },

        save: function () {
            if (!this.validate()) {
                return false;
            }
            xhr.put(API_URL, {
                handleAs: 'json',
                headers: {'Content-Type': 'application/json'},
                data: json.stringify({
                    web_map: this.webMap.attr('value').id,
                    zone_1_class: this.zoneFirstClass.attr('value').id,
                    zone_2_class: this.zoneSecondClass.attr('value').id,
                    zone_3_class: this.zoneThirdClass.attr('value').id,
                    ellipse_z_visible: this.ellipseZoomVisible.attr('value')
                })
            }).then(function () {
                alert(i18n.gettext('Groza settings has been saved successfully!'));
            }, function () {
                alert(i18n.gettext('Error, Groza settings not has been saved!'));
            });
        },

        validate: function () {
            if (!this.webMap.attr('value')) {
                alert(i18n.gettext('"Web map" is required field! Please, check it.'));
                return false;
            }
            if (!this.zoneFirstClass.attr('value')) {
                alert(i18n.gettext('"Zone 1 class" is required field! Please, check it.'));
                return false;
            }
            if (!this.zoneSecondClass.attr('value')) {
                alert(i18n.gettext('"Zone 2 class" is required field! Please, check it.'));
                return false;
            }
            if (!this.zoneThirdClass.attr('value')) {
                alert(i18n.gettext('"Zone 3 class" is required field! Please, check it.'));
                return false;
            }
            return true;
        }
    });
});
