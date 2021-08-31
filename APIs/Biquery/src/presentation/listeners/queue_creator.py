def listener(queue_factory, params, name):
    def create_queue(app, loop):
        queue = queue_factory(loop=loop, maxsize=params.get('max_size'))
        setattr(app, name, queue)
    
    return create_queue