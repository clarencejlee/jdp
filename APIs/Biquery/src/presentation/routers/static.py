import chevron

from sanic.response import html

def route(template_path, variables):
    async def render(request): 
        with open(template_path , 'r') as f:
            return html(chevron.render(f, variables))
        
    return render
    
        