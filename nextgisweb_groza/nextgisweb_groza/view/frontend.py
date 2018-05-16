from settings import get_settings


def frontend(request):
    groza_settings = get_settings()
    config_settings = request.env.groza.settings

    return {
        'grozaConfig': {
            'ngwUrl': request.application_url,
            'rgUrl': config_settings['rg_url'],
            'rgPath': config_settings['rg_path'],
            'settings': groza_settings
        }
    }
