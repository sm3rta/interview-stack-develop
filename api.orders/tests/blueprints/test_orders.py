from pytest import fixture
from app import ORDERS_URL
from api.blueprints.orders import orders_blueprint
from api.models import Customer, Product, Orders
import json

@fixture()
def test_client(test_app):
    test_app.register_blueprint(orders_blueprint, url_prefix=ORDERS_URL)
    return test_app.test_client()

@fixture()
def init_db():
    customer = Customer(CustomerFirstName="Test1", CustomerLastName="McTest1")
    customer.save()

    active_product = Product(
        ProductName="Test1",
        ProductPhotoURL="/test1",
        ProductStatus="Active"
    )
    active_product.save()
    in_active_product = Product(
        ProductName="Test2",
        ProductPhotoURL="/test2",
        ProductStatus="InActive"
    )
    in_active_product.save()

    orders = [
        Orders(**{
            "OrderStatus": "Queued",
            "ProductID": active_product.ProductID,
            "CustomerID": customer.CustomerID,
        }),
        Orders(**{
            "OrderStatus": "Complete",
            "ProductID": active_product.ProductID,
            "CustomerID": customer.CustomerID,
        }),
        Orders(**{
            "OrderStatus": "Cancelled",
            "ProductID": active_product.ProductID,
            "CustomerID": customer.CustomerID,
        }),
        Orders(**{
            "OrderStatus": "Cancelled",
            "ProductID": in_active_product.ProductID,
            "CustomerID": customer.CustomerID,
        }),
    ]
    for order in orders: order.save()
    return orders, [active_product, in_active_product], [customer]

def test_get_all_orders(test_client, init_db):
    response = test_client.get(f"{ORDERS_URL}/inpipeline")
    assert response.status_code == 200
    deserialized_response = json.loads(response.data)
    data = deserialized_response.get('data')
    assert data is not None
    assert len(data) == 1
    order_statuses = {}
    for order in data:
        status = order.get("OrderStatus")
        if status in order_statuses.keys():
            order_statuses[status] += 1
        else: order_statuses[status] = 1
    assert len(order_statuses.keys()) == 1
    assert order_statuses.get("Queued") == 1

def test_inprogress_orders(test_client, init_db):
    response = test_client.get(f"{ORDERS_URL}/all")
    assert response.status_code == 200
    deserialized_response = json.loads(response.data)
    data = deserialized_response.get('data')
    assert data is not None
    assert len(data) == 4
    order_statuses = {}
    for order in data:
        status = order.get("OrderStatus")
        if status in order_statuses.keys():
            order_statuses[status] += 1
        else: order_statuses[status] = 1
    assert len(order_statuses.keys()) == 3
    assert order_statuses.get("Queued") == 1
    assert order_statuses.get("Complete") == 1
    assert order_statuses.get("Cancelled") == 2

def test_post_update_order_status_empty_json(test_client):
    response = test_client.post(f"{ORDERS_URL}/update_status", json={})
    assert response.status_code == 400
    deserialized_response = json.loads(response.data)
    message = deserialized_response.get('message')
    assert message == 'No order data provided!'

def test_post_update_order_status_validation_error(test_client):
    response = test_client.post(
        f"{ORDERS_URL}/update_status",
        json={ "test": "test"},
    )
    assert response.status_code == 422

def test_post_update_order_status_database_error(test_client, init_db):
    [orders, [active_product, _], [customer]] = init_db
    response = test_client.post(
        f"{ORDERS_URL}/update_status",
        json={
            "OrderID": orders[0].OrderID,
            "OrderStatus": "TEST1",
            "ProductID": active_product.ProductID,
            "CustomerID": customer.CustomerID,
        },
    )
    assert response.status_code == 500

def test_post_update_order_status(test_client, init_db):
    [orders, [active_product, _], [customer]] = init_db
    orderID = orders[0].OrderID
    response = test_client.post(
        f"{ORDERS_URL}/update_status",
        json={
            "OrderID": orderID,
            "OrderStatus": "Complete",
            "ProductID": active_product.ProductID,
            "CustomerID": customer.CustomerID,
        },
    )
    deserialized_response = json.loads(response.data)
    message = deserialized_response.get('message')
    assert message == f'{orderID} updated successfully!'
    assert response.status_code == 200
