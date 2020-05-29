# callcenter

The company has 3 levels of support:
1. Operator level 1
2. Supervisor
3. Manager

The technical support is assigned to one of them according to:
- If the Operator level 1 is not available, the supervisor must take the chat
- If the Supervisor is not available, the Manager must take the chat

There is an admin panel to setup available employees.

### Installation

```sh
$ npm install
```

### Run

```sh
$ npm run build
$ npm run start
```

## Run on Docker
You can run the project using docker to avoid install dependencies, packages or node, the following commands will allow you to get the project running on a virtualize container.

### Run container
```sh
$ docker-compose build
$ docker-compose up
```