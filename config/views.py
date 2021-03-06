import logging
from django.template import TemplateDoesNotExist

from django.views import View
from django.http import HttpResponse
from django.shortcuts import render


class FrontendAppView(View):
    """
    Serves the compiled frontend entry point (only works if you have run `npm run build`)
    """

    def get(self, request):
        try:
            return render(request, 'index.html')
        except TemplateDoesNotExist:
            logging.exception('Production build not found')

        return HttpResponse(
            """
            This URL is only used when you have built the production
            version of the app. Visit http://localhost:3000/ instead, or
            run `yarn run build` to test the production version.
            """,
            status=501,
        )
