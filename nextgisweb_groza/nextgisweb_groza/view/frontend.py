from settings import get_settings


def frontend(request):
    settings = get_settings()

    return {
        'grozaConfig': {
            'ngwUrl': request.application_url,
            'rgUrl': request.env.groza.settings['rg_url'],
            'settings': settings
        }
    }
