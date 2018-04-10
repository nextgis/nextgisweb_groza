<%inherit file='nextgisweb:pyramid/template/base.mako' />

<%def name="head()">
    <% import json %>
    <script type="text/javascript">
        require([
            "ngw-groza/settings/GrozaSettings",
            "dojo/domReady!"
        ], function (
            GrozaSettings
        ) {
            (new GrozaSettings()).placeAt('form').startup();
        });
    </script>
</%def>

<div id="form" style="width: 100%; height: 400px"></div>
