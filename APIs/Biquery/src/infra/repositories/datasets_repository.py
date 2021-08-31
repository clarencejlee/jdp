from tortoise import Tortoise
from infra.models.datasets import Datasets

class DatasetsRepository:
    MAX_INSERT_SIZE = 1000

    def __init__(self, uuid_generator, connection='default') -> None:
        self.uuid_generator = uuid_generator
        self.connection = connection

        self.__type_map = {
            'STRING': 'TINYTEXT',
            'INTEGER': 'INTEGER',
            'INT64' : 'INTEGER',
            'FLOAT' : 'FLOAT',
            'FLOAT64' : 'FLOAT',
            'BOOLEAN' : 'BOOL',
            'BOOL' : 'BOOL',
            'TIMESTAMP' : 'TIMESTAMP',
            'DATE' : 'DATE',
            'TIME' : 'TIME',
            'DATETIME' : 'DATETIME',
            'NUMERIC' : 'NUMERIC',
            'BIGNUMERIC' : 'BIGINT'
        }

        self.__data_mapper = {
            'TIMESTAMP': lambda x: f'FROM_UNIXTIME({x})',
            'TINYTEXT': lambda x: f'"{x}"',
            'INT': lambda x: x,
            'FLOAT': lambda x: f'DECIMAL({x.replace(".", ",")})',
            'DATE': lambda x: f"TO_DATE('{x.replace('-', '/')}', 'YYYY/MM/DD')",
            'BOOL': lambda x: f'{x.capitalize()} ',
            'TIME': lambda x: f'"{x}"',
            'NUMERIC': lambda x: x,
            'BIGINT':  lambda x: x,
        }

        self.cached_schemas = {}

    async def create_dataset(self, provider, provider_id, name, schema):
        uuid = self.uuid_generator.uuid4()
        dataset = Datasets(id=uuid, provider=provider, provider_id = provider_id, name = name)
        await dataset.save()

        await self.__create_table(schema, uuid)

        return await Datasets.filter(id=uuid).first()

    async def get_by_provider_info(self, provider, provider_id):
        return await Datasets.filter(provider=provider, provider_id=provider_id).first()

    async def get_by_id(self, id):
        return await Datasets.filter(id=id).first()

    async def update_metadata(self, id, size, status='imported'):
        sql = 'UPDATE datasets\n' + \
            'SET\n' + \
            f'size = size + {size},\n' + \
            f"status = '{status}'\n" + \
            f"WHERE id = '{id}'"

        conn = self.__get_connection()
        await conn.execute_script(sql)

        return await Datasets.filter(id=id).first()

    async def list_datasets(self):
        return await Datasets.all()

    async def get_data(self, table, offset=0, page_size=10):
        sql = 'SELECT *\n' +\
            f'FROM `{table}`\n' + \
            f'ORDER BY _id\n' + \
            f'LIMIT {page_size}\n' +\
            f'OFFSET {offset}'

        print(sql)

        conn = self.__get_connection()
        result = await conn.execute_query_dict(sql)

        return result

    async def import_data(self, table, data = []):
        schema = await self.get_schema(table)

        sql = f'INSERT INTO`{table}`\nVALUES\n'
        for r_index, row in enumerate(data):
            uuid = self.uuid_generator.uuid4()
            sql += f"('{uuid}',"

            for index, value in enumerate(row):
                ID_OFFSET = 1
                type = schema[index + ID_OFFSET]
                mapper = self.__data_mapper[type]

                sql += mapper(value) if index == len(row) - 1 else f'{mapper(value)},'
   
            if (r_index == DatasetsRepository.MAX_INSERT_SIZE - 1 or r_index == len(data) - 1):
                sql += ");\n"
                conn = self.__get_connection()
                await conn.execute_script(sql)

                sql = f'INSERT INTO`{table}`\nVALUES\n'
            else:
                sql += "),\n"  

    async def get_schema(self, table, cached=True):
        if (table in self.cached_schemas):
            return self.cached_schemas.get(table)

        sql = "SELECT DATA_TYPE, COLUMN_NAME\n" + \
            "FROM INFORMATION_SCHEMA.COLUMNS\n" + \
            f"WHERE TABLE_NAME='{table}'"

        conn = self.__get_connection()
        result = await conn.execute_query_dict(sql)

        self.cached_schemas[table] = []

        for column in result:
            self.cached_schemas[table].append(column.get('DATA_TYPE').upper())
            # [column.COLUMN_NAME] = column.DATA_TYPE.upper()

        return self.cached_schemas[table]

    async def __create_table(self, schema, table_name):
        sql = f'CREATE TABLE IF NOT EXISTS `{table_name}` (_id CHAR(36) PRIMARY KEY'

        for field in schema.get('fields'):
            upper_type = field.get('type').upper()
            if (upper_type in self.__type_map):
                type = self.__type_map.get(upper_type)
                sql += f', {field.get("name")} {type}'

        sql += ')  ENGINE=INNODB;'

        conn = self.__get_connection()
        await conn.execute_script(sql)

    def __get_connection(self):
        return Tortoise.get_connection(self.connection)