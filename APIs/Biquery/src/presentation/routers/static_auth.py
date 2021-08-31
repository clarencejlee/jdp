import chevron

from sanic.response import html

class StaticAuth:
    def __init__(self, template_path, variables={}) -> None:
        self.template = template_path
        self.params = variables

    def route(self, request, *args, **kwargs):
        with open(self.template, 'r') as f:
            return html(chevron.render(f, self.params))
        