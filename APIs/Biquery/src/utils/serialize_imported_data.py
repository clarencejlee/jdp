import datetime
import json

def serialize(data):
    def default(o):
        if isinstance(o, (datetime.date, datetime.datetime)):
            return o.isoformat()

    stringified = json.dumps(
        data,
        sort_keys=True,
        indent=1,
        default=default
    )

    return json.loads(stringified)