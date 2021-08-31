def listener(queue_factory, worker_builder, params):
    def create_import_queue(app, loop):
        app.import_queue = queue_factory(loop=loop, maxsize=params.get('max_size'))

        for x in range(params.get('worker_count')):
            worker = worker_builder.with_app(app)\
                .with_name(f"Worker-{x}")\
                .build()

            app.add_task(worker.run())
    
    return create_import_queue