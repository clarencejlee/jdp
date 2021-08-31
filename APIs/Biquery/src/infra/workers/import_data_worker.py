from tortoise import Tortoise

class ImportDataWorker:
    def __init__(self, providers, dataset_repo, app, name) -> None:
        self.providers = providers
        self.app = app
        self.dataset_repo = dataset_repo
        self.name = name

    async def run(self):
        while True:
            import_request = await self.app.import_queue.get()

            provider = import_request.get('provider')
            token = import_request.get('token')
            dataset = import_request.get('dataset')

            print(f'[ImportDataWorker] -  Starting to import data from {provider.get("name")}/{provider.get("data_id")}')
            
            has_more, insert_count = await self.__import_data(provider, dataset, token)
            while has_more:
                has_more, current_count = await self.__import_data(provider, dataset, token)

                insert_count += current_count

            updated_dataset = await self.dataset_repo.update_metadata(
                id=dataset.get('id'),
                size=insert_count,
                status='imported'
            )

            await self.app.notification_queue.put({
                'data': updated_dataset.serialize(),
                'channel_id': updated_dataset.id
            })

    async def __import_data(self, provider, dataset, token): 
        handler = self.providers.get(provider.get('name'))   
        data, has_more = await handler.import_data(
            provider.get('data_id'),
            token,
            startIndex=dataset.get('size') - 1
        )

        await self.dataset_repo.import_data(dataset.get('id'), data)
        dataset['size'] = dataset.get('size') + len(data)

        return has_more, len(data)
        

class ImportDataWorkerBuilder:
    def __init__(self):
        self.clear()

    def clear(self):
        self.providers = {}
        self.app = None
        self.dataset_repo = None
        self.name = ""
    
    def with_providers(self, providers):
        self.providers = providers
        return self

    def with_app(self, app):
        self.app = app
        return self
    
    def with_dataset_repo(self, dataset_repo):
        self.dataset_repo = dataset_repo
        return self

    def with_name(self, name):
        self.name = name
        return self
    
    def build(self):
        return ImportDataWorker(
            providers=self.providers,
            app = self.app,
            dataset_repo = self.dataset_repo,
            name = self.name
        )