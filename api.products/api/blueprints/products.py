from flask import Blueprint, request
from marshmallow import ValidationError
from api.models import Products
from api.schemas import ProductSchema

products_blueprint = Blueprint("products_blueprint", __name__)


@products_blueprint.route("/all", methods=["GET"])
def get_all_products():
    product_schema = ProductSchema(many=True)
    try:
        # Retrieve query parameters from the request object
        status = request.args.get("status")

        # Use the query parameters in your database query or filtering logic
        # For example:
        products = Products.select().where(Products.ProductStatus == status).dicts()
        # products = Products.select().dicts()
        # products = []

        products_serialized = product_schema.dump(products)
    except Exception as err:
        return {"data": [], "message": str(err)}, 500
    return {"data": products_serialized, "message": ""}, 200


# @products_blueprint.route("/update_status", methods=["POST"])
# def post_update_product_status():
#     product_schema = ProductSchema()
#     json_data = request.get_json()
#     if not json_data:
#         return {"message": "No product data provided!"}, 400
#     try:
#         product = product_schema.load(json_data)
#         Products.update(**product).where(
#             Products.ProductID == product["ProductID"]
#         ).execute()
#     except ValidationError as err:
#         return {"message": err.messages}, 422
#     except Exception as err:
#         return {"message": str(err)}, 500
#     return {"message": f'{product["ProductID"]} updated successfully!'}, 200
