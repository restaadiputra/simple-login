# Simple Register

**Live Demo** 🔥: 

- Client: https://simple-login-client.herokuapp.com/
- Service: https://simple-login-services.herokuapp.com/



There two di app that need to be run, services and client.

## Service ⚙️

#### Pre Run

This service use  `Postgres` as its DB so install it first on your machine if you don't have. Also install `sequelize-cli` by running this command.

```shell
npm i -g sequelize-cli
```

This will add `sequelize-cli` in global.



#### Install All dependencies

go to server directory and install all its dependecies

```shell
cd server
npm install
```



#### Create Database

Make sure your database ready. If you don't have database yet, create one. You can change service configuration for database in `server/config/config.json`. By default the configuration for development will look like this. Change the value if you need it.

```json
{
	"development": {
    "username": "postgres",
    "password": "postgres",
    "database": "database_development",
    "host": "localhost",
    "dialect": "postgres"
  },
}
```



#### Migrate

After your database is running, migrate the table by running this command. (make sure you are still in `server` directory). 

```shell
npx sequelize-cli db:migrate
```

That commnand will create the table needed for you.



#### Run

Run the server by using `start` command

```shell
npm run start
```

By default it will run at http://localhost:3000.



#### API

##### Current User related

- [Show user list](docs/user/get-all.md): `GET /api/user`
- [Show user by id](docs/user/get-by-id.md): `GET /api/:id`
- [Create user](docs/user/create.md): `POST /api/user`
- [Update user by id](docs/user/update.md):  `PUT /api/user/:id`
- [Delete user by id](docs/user/delete.md): `DELETE /api/user/:id`

##### Auth

- [Login](docs/auth/login.md): `POST /api/auth`



## Client 🖥

#### Pre Run

Go to client directory and create `env` file

```shell
cd client
touch .env.development.local
```

That command will create `env` file for you. Open it and add

```shell
REACT_APP_SERVER_API=<your-server-host>
```

You can change `<your-server-host>`, for example if you previously run server at `http://localhost:3000`, you can add this in `env` file

```
REACT_APP_SERVER_API=http://localhost:3000
```



#### Install All dependencies

go to server directory and install all its dependecies (we assume you still in `client` directory )

```shell
npm install
```



#### Run

Run the client by using `start` command

```shell
npm run start
```

By default it will run at http://localhost:3000. 

**NOTE**: if you previously run server first, it it will asked you if you want to run with other port (let's assume that server will take port 3000 so it will suggest you to take port 3001 for client to run).



## Tech Use

#### Server

- Express
- Postgress
- Sequelize
- Express-Validator



#### Client

- React

- Ant-Design

- Axios

  

