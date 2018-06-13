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
    <link href="${request.route_url('amd_package', subpath='ngw-groza/frontend/css/app.eea737823e1163fd956bd179f80397c0.css')}"
          rel="stylesheet" type="text/css"/>
</head>
<body>
<div id="app"></div>
<script src="${request.route_url('amd_package', subpath='ngw-groza/frontend/js/manifest.0563134b714d88290c59.js')}"></script>
<script src="${request.route_url('amd_package', subpath='ngw-groza/frontend/js/vendor.a7efbb82e9a58a3b7362.js')}"></script>
<script src="${request.route_url('amd_package', subpath='ngw-groza/frontend/js/app.273ea672dab357459540.js')}"></script>
</body>
</html>
