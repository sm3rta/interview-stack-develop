# MARZ Fullstack Web Developer Take-Home Interview

## Application break down

The application is comprised of 4 parts

1. webapp -> Frontend for the applicaiton (written in React and Typescript)
2. api.orders -> Backend for the applicaiton (written in flask)
3. nginx -> The proxy for the requests
4. db -> mariadb

## Requirements

1. Docker [https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/)
2. Docker Compose [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)
3. Node v17.9.1 [https://nodejs.org/fr/blog/release/v17.9.1/](https://nodejs.org/fr/blog/release/v17.9.1/)

## Setup

### webapp

The client side applicaiton uses node version 17, node 16 should also work as well. From the root of the `webapp` directory install the node dependencies using the command bellow

```Bash
npm ci
```

and build the docker image for the webapp container using the command bellow from the root of the `webapp` directory

```Bash
docker build -t webapp:latest .
```

### api.orders

To build the docker image for api.orders run the command bellow from the root of the `api.orders` directory

```Bash
docker build -t api.orders:latest .
```

### Starting the application

To start application run the following command from the root directory

```Bash
docker compose up -d
```

To connect to the app go to [http://localhost:80](http://localhost:80)

NOTE: If you see an NGINX 502 wait a couple of seconds, then refresh the page. It just means node is not done compiling the application

## Storybook

[Storybook](https://storybook.js.org/) is a frontend workshop for building UI components and pages in isolation.
To start storybook run the following command from the root of the `webapp` directory

```Bash
npm run storybook
```

To view the component library, go to [http://localhost:6006](http://localhost:6006). This will show you all the pages and components that have been built for the application without needing to start the applicaiton.

NOTE: Storybook is configured to run locally

## Testing

Both webapp and api.orders have tests written, webapp uses jest and api.orders uses pytest.

### Testing webapp

To run the jest tests run the following command at the root of the `webapp` directory

```Bash
npm run test
```

### Testing api.orders

To run the pytests from the root directory run the following commands

```Bash
docker compose exec -it api-orders bash
python -m pytest tests/ # from within the container
```

NOTE: Make sure the api.orders container is running.

You can also install all the dependencies locally and run the tests using the same command that you run inside the docker container from the bakcend directory. Would recommend setting up a python env under the .venv directory name for this

## Your task

You must develop the Products page for this application and create a PUBLIC github repo with the implementaion. There will be 3 steps to this task.

### Step 1: Webapp

You must develop a component to display the product name, product id and the product display image for each image. You can develop this component any way you wish (NOTE the current style system uses tailwind it is STRONGLY advised you use this style system). Then you will use this component to display all the products found in the database that are active. You will implemente this page at `webapp/src/pages/ProductsPage/ProductsPage.tsx`.

### Step 2: api.products

You must develop a products micro-service containing an endpoint with the following prefix `/api/products/` that returns a json object with the content needed to display the products on the products page. This micro-service MUST run in its own container and the container must be added to the docker compose file, and you must include the instructution on how to setup the new micro-service in this file. You must also modify nginx to direct the traffic to your new endpoint, see `nginx.conf` for details. (You can implement this micro-service however you like, i.e. any language or framework of your choosing).

### Step 3: mariadb

There are 2 sql init scripts in the db `schema.sql` and `data.sql`. The schema script sets up the the data base schema and the data script initialized the database with mock data.

The database has the following schema:

```
Database marz -> Table Customer(
    Column CustomerID = IntegerField(primary_key=True) # Auto-generated
    Column CustomerFirstName = CharField(100, null=False)
    Column CustomerLastName = CharField(100, null=False)
)
```

```
Database marz -> Table Products(
    Column ProductID = IntegerField(primary_key=True) # Auto-generated
    Column ProductName = CharField(100, can_be_null=False)
    Column ProductPhotoURL = CharField(255, can_be_null=False)
    Column ProductStatus = EnumField({ 'Active', 'InActive' }, can_be_null=False)
)
```

```
Database marz -> Table Orders(
    Column OrderID = IntegerField(primary_key=True) # Auto-generated
    Column OrderStatus = EnumField(
        { 'Queued', 'InProgress', 'QA', 'Cancelled', 'Complete' },
        can_be_null=False
    )
    Column ProductID = ForeignKeyField(
        Table=Product, field='ProductID', can_be_null=False, column_name='ProductID'
    )
    Column CustomerID = ForeignKeyField(
        Table=Customer, field='CustomerID', can_be_null=False, column_name='CustomerID'
    )
)
```

Currently the `marz.Product.ProductPhotoURL` column contains no valid urls to for photos 

```
MariaDB [marz]> select * from Product;
+-----------+-------------+-----------------+---------------+
| ProductID | ProductName | ProductPhotoURL | ProductStatus |
+-----------+-------------+-----------------+---------------+
|         1 | Hat         | t               | Active        |
|         2 | Shoes       | t               | Active        |
|         3 | Pants       | t               | Active        |
|         4 | Shirt       | t               | InActive      |
|         5 | Coat        | t               | InActive      |
+-----------+-------------+-----------------+---------------+
5 rows in set (0.00 sec)
```

You must replace all of the product photo urls with real photo urls (you can use any photo url) and modify the data.sql script to use the new urls.

## Submission

To submit the solution please email `aadeyeye@marzvfx.com` with a link to your github repo with the implemented task. For the email subject please specify your full name (first and last name) as well as the roll you are applying for