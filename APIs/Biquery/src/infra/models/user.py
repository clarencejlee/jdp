from tortoise.models import Model
from tortoise import fields

class User(Model):
    googleId = fields.CharField(50, pk=True)
    displayName = fields.CharField(50, default="")
    firstName = fields.CharField(50, default = "")
    lastName = fields.CharField(50, default="")
    email = fields.CharField(62, unique=True)
    createdAt = fields.DatetimeField(auto_now_add=True)