from flask import Flask
from api.blueprints.products import products_blueprint
from api.models import db

_URL_PREFIX = "/api"
PRODUCTS_URL = f"{_URL_PREFIX}/products"

app = Flask(__name__)


@app.before_request
def before_request():
    db.connect()


@app.after_request
def after_request(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    db.close()
    return response


app.register_blueprint(products_blueprint, url_prefix=PRODUCTS_URL)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5002)
