from sqlalchemy import INTEGER, Column, ForeignKey, String
from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy.sql.sqltypes import FLOAT

Base = declarative_base()


class BaseModel(Base):
    __abstract__ = True
    id = Column(INTEGER(), primary_key=True)


class Product(BaseModel):
    __tablename__ = "product"
    name = Column(String())
    # clients = relationship("Client")
    type = Column(String())
    price = Column(FLOAT())
    client = Column(String())
    stripe_id = Column(String())

    def to_dict(self):
        return {"name": self.name, "type": self.type, "price": self.price, "client": self.client}


# class Client(BaseModel):
#     __tablename__ = "client"

#     name = Column(String())
#     product_id = Column(ForeignKey("product.id"))