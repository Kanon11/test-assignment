# Product inventory app

Goal of the assignment is to create a minimalistic product inventory system.
This repository contains a stub of the application with the same tech stack
that our real application is built with:

* [Docker](https://www.docker.com/)
* [Postgres SQL database](https://www.postgresql.org/)
* [Hasura GraphQL server](https://hasura.io/)
* [Typescript](https://www.typescriptlang.org/)
* [React](https://react.dev/)
* [Apollo GraphQL client](https://www.apollographql.com/docs/react/)
* [Ant Design UI library](https://ant.design/)

## Tasks

Please complete all of the following:

1. List available products, their stock and prices
1. Calculate total value of all products in the inventory
1. Create a form to add new product to inventory

## Run the application

```sh
# install dependencies
npm i

# start frontend server
npm start

# start postgres & hasura
docker compose up

# add env var postgres database to Hasura as a data source
Go to http://localhost:8080/console/data/v2/manage/database/add?driver=postgres
then set Environment variable as "HASURA_GRAPHQL_METADATA_DATABASE_URL",
set Database name as "db" and then click on "Connect Database" button.

after that go to http://localhost:8080/console/data/db/schema/public and click on "Track All" button,
which is right side of "Untracked tables or views" option.

now you are done, open http://localhost:3000/ in your browser.


```


Hasura serves a grapql endpoint with schema auto generated from Postgres schema. It is available at http://localhost:8080/v1/graphql. Frontend should interact with the database only through this endpoint.

Hasura console is available at http://localhost:8080/console.

To add migrations for new database tables, you would have to run Hasura console locally using [Hasura CLI](https://hasura.io/docs/latest/hasura-cli/overview/).
