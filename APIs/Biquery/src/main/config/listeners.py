from main.composer.listeners import import_workers, notification_queue

def register_listeners(app):
    app.after_server_start(import_workers.compose())
    app.after_server_start(notification_queue.compose())
