from infra.providers.notification_provider import Notificator

notificators = {}

def get_notificator(name, app):
    if name in notificators:
        return notificators.get(name)
    else:
        notificator = Notificator(app=app, feed_name=name)
        notificators[name] = notificator
        
        return notificator