from settings import get_settings
from nextgisweb_groza.default_settings import default_ellipse_style


def frontend(request):
    groza_settings = get_settings()
    groza_settings['ellipseStyle'] = default_ellipse_style
    config_settings = request.env.groza.settings

    return {
        'grozaConfig': {
            'ngwUrl': request.application_url,
            'rgUrl': config_settings['rg_url'],
            'rgPath': config_settings['rg_path'],
            'settings': groza_settings
        }
    }
