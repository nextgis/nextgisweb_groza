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
    <link href="${request.route_url('amd_package', subpath='ngw-groza/frontend/css/app.08d4ef4c1341bac84949d4e29c6f965a.css')}"
          rel="stylesheet" type="text/css"/>
</head>
<body>
<div id="app"></div>
<script src="${request.route_url('amd_package', subpath='ngw-groza/frontend/js/manifest.0563134b714d88290c59.js')}"></script>
<script src="${request.route_url('amd_package', subpath='ngw-groza/frontend/js/vendor.ba018aca22e52b302789.js')}"></script>
<script src="${request.route_url('amd_package', subpath='ngw-groza/frontend/js/app.184755ffbf47b9f478c4.js')}"></script>
</body>
</html>
