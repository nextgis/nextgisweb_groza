<%
    import json
%>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>ГИС "Гроза"</title>
    <link href="https://unpkg.com/vuetify/dist/vuetify.min.css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
    <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
    <script>
        window.grozaConfig = ${grozaConfig | json.dumps, n };
    </script>
    <link href="${request.route_url('amd_package', subpath='ngw-groza/frontend/css/app.a449393e95d81d33f9823bca4ac57db9.css')}"
          rel="stylesheet" type="text/css"/>
</head>
<body>
<div id="app"></div>
<script src="${request.route_url('amd_package', subpath='ngw-groza/frontend/js/manifest.0563134b714d88290c59.js')}"></script>
<script src="${request.route_url('amd_package', subpath='ngw-groza/frontend/js/vendor.7aab313841254772ade7.js')}"></script>
<script src="${request.route_url('amd_package', subpath='ngw-groza/frontend/js/app.bff42a05146a30697143.js')}"></script>
</body>
</html>
