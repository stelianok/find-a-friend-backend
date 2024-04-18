# Find a friend (Platform to connect Animal shelters with future pet adopters).

# Description

This is the backend, more specifically api of the platform find a friend. A platform that uses an intuitive interface to display information
about pets in animal shelters available for adoption. Users can see all pets available for adoption in a given city, and use a set of filters (age, energy level, size) to increase the chances that they'll find a pet that matches their lifestyle.

## Objective

The main objective of this project is to study and learn more about JWT authentication, ORMs, automated testing, designing an API, and improving my knowledge about software engineering as a whole.

---

# Tech Stack
 - NodeJS
 - Typescript
 - Docker
 - Fastify
 - Prisma
 - PostgreSQL
 - Vitest

---
## Installation

Create a .env file in the root of your project, following .env.example as a guide.

Install the necessary dependencies:

```bash
$ npm i 
```

Start the database:
```bash
$ docker compose up
```

Initialize prisma:

```bash
$ npx prisma init
```

Don't forget to update the username, password and database name in **DATABASE_URL** variable in **.env**

Run the migrations: 

```bash
$ npx prisma migrate dev 
```

## Running the app

```bash
# development
$ npm run start:dev
```
```bash
# build
$ npm run build
```
```bash
# production mode
$ npm run start
```

