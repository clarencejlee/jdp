from sqlalchemy import INTEGER, Column, ForeignKey, String, FLOAT
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()

class BaseModel(Base):
    __abstract__ = True
    id = Column(INTEGER(), primary_key=True)

class QBExport(BaseModel):
    __tablename__ = "qbexports"

    project_id = Column(INTEGER())
    name = Column(String())
    client = Column(String())
    contract = Column(FLOAT())
    billed_to_date = Column(FLOAT())
    left_to_bill = Column(FLOAT())
    actual_costs = Column(FLOAT())
    profit_margins = Column(FLOAT())
    paid_to_date = Column(FLOAT())
    balance_due = Column(FLOAT())
    past_due = Column(FLOAT())

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

