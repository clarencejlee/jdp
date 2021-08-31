from marshmallow import Schema, fields
from werkzeug.datastructures import FileStorage

class FileStorageField(fields.Field):
    default_error_messages = {
        'Invalid': 'Not a valid image'
    }

    def _deserialize(self, value, attr, data) -> FileStorage:
        if value is None:
            return None

        if not isinstance(value, FileStorage):
            self.fail('Invalid')

        return value


class FeedbackSchema(Schema):
    image = FileStorageField(required=True)
    message = str
