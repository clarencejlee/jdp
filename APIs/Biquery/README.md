# Pre requisites

- Have python 3 installed
- Have `.env` file set up with appropriate values (template found under `.env.example`)
- A MySQL database

# Setting up database

To execute the project properly we need a MySQL database with an specific table created. After creating the database, run the following sql expression to create the required table:

````
CREATE TABLE "datasets" (
  "id" varchar(36) NOT NULL,
  "provider" varchar(10) NOT NULL,
  "provider_id" varchar(255) NOT NULL,
  "name" varchar(255) NOT NULL,
  "created_at" datetime NOT NULL,
  "size" int NOT NULL DEFAULT '0',
  "updated_at" datetime NOT NULL,
  "status" enum('pending','imported') DEFAULT NULL,
  PRIMARY KEY ("id")
);
````

**Remember to fill the connection settings in `.env` file**

# How to run the code

It is highly recommended that you configure a python virtual environment within the repository directory before installing dependencies and running the server. In order to create it, run the command below.

````
python3 -m venv /path/to/new/virtual/environment
````

After creating the virtual environment, execute the following commands to startup the server.

````
source /path/to/created/virtual/environment/bin/activate

pip install -r requirements.txt

python3 -W ignore src/server.py
````

The first command will activate the virtual environment to be used as the python interpreter and `pip install` will install all the dependencies required by the application. Finally, the last command is responsible to start the server.

After executing all commands, open [http://localhost:3000](http://localhost:3000) to view it in the browser.

**Note: The application will be running in development mode because making it run as in production would require the installation of additional dependencies.**

# Architecture

The architecture used in this application is a simplified version of a layered architecture, in which a layer can only interact with the ones below it. The inner a layer is, the more technology agnostic, domain-driven, and testable it is.

Following are the definitions of each layer as well as its responsibility:

## Infra

The infrastructure layer has the responsibility of implementing all the technology/library-related code. The source code that lives in this layer usually implements the protocols required to enforce the business logic. Here is where API calls, database connections and queries, etc are implemented.

## Presentation

The presentation layer is often responsible to create a bridge between the framework interface and the application's business logic. In an ideal scenario, the business logic should not be implemented within this layer but to simplify the application the route handlers were also implemented here. Due to this simplification you can expect to find all code that handles enpoint requests at the `Presentation` layer. Besides routing handlers, this layer is also responsible for implementing sanic listeners. These listeners are responsible for registering the queues and workers used to import data from BigQuery.

## Main

The last and final layer is responsible for assembling all the components of the application. Inside this layer, you might find factories, adapters, decorators, etc. As you've seen through this documentation, the architecture is highly decoupled and based on dependency injection, having the necessity of the main layer to assemble everything together. This section is also responsible for registering application routes.

## Client

This layer is a pretty simple layer and its only concern is to store static pages that are served to by the client.

# Points of improvement

- Create database migrations to generate tables and version it
- Enhance the achitecture to introduce the `Domain` and `Data` layers
- Remove SQL injection vulnerability within sql expression creation
    - This vulnerability is not extremelly critical since it isn't used with user provided data
- Enhance user token context management
- Replace Tortoise ORM by async version of SQL Alchemy
- Enchance user experience in the client side