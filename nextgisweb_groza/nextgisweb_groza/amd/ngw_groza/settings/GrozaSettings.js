sdefine([
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'ngw-pyramid/modelWidget/Widget',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/request/xhr',
    'dojo/json',
    'ngw/route',
    'ngw-pyramid/i18n!tracker',
    'ngw-pyramid/hbs-i18n',
    'dojo/text!./GrozaSettings.hbs',
    'dijit/layout/ContentPane',
    'dijit/layout/BorderContainer',
    'dijit/form/NumberTextBox',
    'dijit/form/Button',
    'dijit/form/Select',
    'dojox/layout/TableContainer'
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
            var self = this;
            xhr.get(API_URL, {
                handleAs: 'json'
            }).then(function (data) {});
        },

        save: function () {
            xhr.put(API_URL, {
                handleAs: 'json',
                headers: {'Content-Type': 'application/json'},
                data: json.stringify({

                })
            }).then(function () {
                alert(i18n.gettext('Groza settings has been saved successfully!'));
            }, function () {
                alert(i18n.gettext('Error, Groza settings not has been saved!'));
            });
        }
    });
});
