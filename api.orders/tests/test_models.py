from api.models import Customer, Product, Orders

def test_new_customer():
    first_name = 'Test'
    last_name = 'McTest'
    customer = Customer(
        CustomerFirstName=first_name,
        CustomerLastName=last_name
    )
    assert customer.CustomerFirstName == first_name
    assert customer.CustomerLastName == last_name

def test_new_product():
    product_name = 'Test'
    product_photo_url = '/test'
    product_status = 'Active'
    product = Product(
        ProductName=product_name,
        ProductPhotoURL=product_photo_url,
        ProductStatus=product_status
    )
    assert product.ProductName == product_name
    assert product.ProductPhotoURL == product_photo_url
    assert product.ProductStatus == product_status

def test_new_product_error(test_db):
    product_name = 'Test'
    product_photo_url = '/test'
    product_status = 'Active1'
    try:
        product = Product(
            ProductName=product_name,
            ProductPhotoURL=product_photo_url,
            ProductStatus=product_status
        )
        product.save()
    except:
        return
    assert 'Product status field allowed incorrect data' == ''

def test_new_order(test_db):
    first_name = 'Test'
    last_name = 'McTest'
    customer = Customer(
        CustomerFirstName=first_name,
        CustomerLastName=last_name
    )
    customer.save()

    product_name = 'Test'
    product_photo_url = '/test'
    product_status = 'Active'
    product = Product(
        ProductName=product_name,
        ProductPhotoURL=product_photo_url,
        ProductStatus=product_status
    )
    product.save()

    OrderStatus = 'Queued'
    order = Orders(
        OrderStatus=OrderStatus,
        ProductID=product.ProductID,
        CustomerID=customer.CustomerID
    )

    assert order.OrderStatus == OrderStatus
    assert order.ProductID == product
    assert order.CustomerID == customer