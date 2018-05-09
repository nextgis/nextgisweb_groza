from settings import get_settings


def frontend(request):
    settings = get_settings()

    return {
        'grozaConfig': {
            'ngwUrl': request.application_url,
            'settings': settings
        }
    }
