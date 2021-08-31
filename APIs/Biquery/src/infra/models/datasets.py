from enum import Enum

from tortoise import fields
from tortoise.models import Model

class Status(str, Enum):
    PENDING = "pending"
    IMPORTED = "imported"

class Datasets(Model):
    id = fields.CharField(36, pk=True)
    provider = fields.CharField(10, null=False)
    provider_id = fields.CharField(255, null=False)
    name = fields.CharField(255, null=False)
    size = fields.IntField(default=0, null=False)
    status = fields.CharEnumField(Status, default=Status.PENDING)
    created_at = fields.DatetimeField(auto_now_add=True)
    updated_at = fields.DatetimeField(auto_now=True)

    def serialize(self):
        return {
            'id': self.id,
            'provider': self.provider,
            'name': self.name,
            'size': self.size,
            'status': self.status.value,
            'createdAt': self.created_at.timestamp() * 1000,
            'updatedAt': self.updated_at.timestamp() * 1000,
        }