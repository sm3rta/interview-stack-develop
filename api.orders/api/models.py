import os
from peewee import (
    Model,
    IntegerField,
    CharField,
    ForeignKeyField,
    Field
)
from playhouse.mysql_ext import MariaDBConnectorDatabase

MYSQL_USER = os.getenv('MYSQL_USER')
MYSQL_PASSWORD = os.getenv('MYSQL_PASSWORD')
MYSQL_HOST = os.getenv('MYSQL_HOST')
MYSQL_PORT = int(os.getenv('MYSQL_PORT', '3306'))

db = MariaDBConnectorDatabase(
    'marz',
    user=MYSQL_USER,
    password=MYSQL_PASSWORD,
    host=MYSQL_HOST,
    port=MYSQL_PORT
)

PRODUCT_STATUSES = {
    'Active': 'Active',
    'InActive': 'InActive'
}

ORDER_STATUSES = {
    'Queued': 'Queued',
    'InProgress': 'InProgress',
    'QA': 'QA',
    'Cancelled': 'Cancelled',
    'Complete': 'Complete'
}

PRODUCT_STATUSES_SET = set(PRODUCT_STATUSES.values())
ORDER_STATUSES_SET = set(ORDER_STATUSES.values())

class EnumField(Field):
    field_type='enum'
    def __init__(self, enum, *args, **kwargs):
        if type(enum) != set:
            raise TypeError(
                f"{self.__class__.__name__} Argument enum must be of type set not {type(enum)}"
            )
        self.enum = enum
        super().__init__(*args, **kwargs)
    
    def db_value(self, value):
        if value not in self.enum:
            raise ValueError(
                f"{self.__class__.__name__} Value not member of enum {value} {list(self.enum)}"
            )
        return value
    
    def python_value(self, value):
        return value

class BaseModel(Model):
    class Meta:
        database = db

class Customer(BaseModel):
    CustomerID = IntegerField(primary_key=True)
    CustomerFirstName = CharField(100, null=False)
    CustomerLastName = CharField(100, null=False)
    
    class Meta:
        table_name = 'Customer'

class Product(BaseModel):
    ProductID = IntegerField(primary_key=True)
    ProductName = CharField(100, null=False)
    ProductPhotoURL = CharField(255, null=False)
    ProductStatus = EnumField(PRODUCT_STATUSES_SET, null=False)
    
    class Meta:
        table_name = 'Product'

class Orders(BaseModel):
    OrderID = IntegerField(primary_key=True)
    OrderStatus = EnumField(ORDER_STATUSES_SET, null=False)
    ProductID = ForeignKeyField(Product, field='ProductID', null=False, column_name='ProductID')
    CustomerID = ForeignKeyField(Customer, field='CustomerID', null=False, column_name='CustomerID')
    
    class Meta:
        table_name = 'Orders'
