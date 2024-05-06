<h1 > Challenge Implement JWT and CRUD task authentication</h1>
<h3 > Task Control Server #todoIzi</h3>

<br/>
<img src="https://raw.githubusercontent.com/eliveltonsf/todo-izi-api/95f46c1ef29310fc2ad719f26fc44b2000b113f5/src/assets/todo-izi.gif"/>

<br />
<br />

<p id="badges">
  <img src="https://img.shields.io/badge/-NODE-000?style=for-the-badge&logo=nodedotjs"/>
  <img src="https://img.shields.io/badge/-prisma-000?style=for-the-badge&logo=prisma"/>
  <img src="https://img.shields.io/badge/-Fastify-000?style=for-the-badge&logo=Fastify"/>
    <img src="https://img.shields.io/badge/zod-000?style=for-the-badge&logo=zod"/>
  <img src="https://img.shields.io/badge/typescript-000?style=for-the-badge&logo=typescript"/>
  <img src="https://img.shields.io/badge/docker-000?style=for-the-badge&logo=docker"/>
  <img src="https://shields.io/badge/-swagger-000?style=for-the-badge&logo=swagger"/>
</p>

<br />

<h2 id="technologies" name="technologies">
🚀 Used technologies
</h2>

- [Node.js](https://nodejs.org/pt-br) using the framework [Fastify](https://fastify.dev/)
- [Prima](https://nodejs.org/pt-br) is an open-source ORM for Node.js and TypeScript.
- [Typescript](https://www.typescriptlang.org/) for element typing
- [Docker](https://www.docker.com/) to work with containers and upload postgres without the need for local installation
- [Swagger](https://swagger.io/) to document all methods implemented in the api

<br />

<h2 id="technologies" name="technologies">
🎯 What I learned from this project
</h2>

The objective of this challenge is to assess the participant's ability to develop a robust and secure web service application, using Node.js and implementing secure authentication practices with JWT, as well as CRUD operations in a database.

<br />
<h2 id="technologies" name="technologies">
⌨️ Prerequisites
</h2>

Before starting, you will need to have the following tools installed on your machine: [git](https://git-scm.com/downloads), [Node.js](https://nodejs.org/en/), [npm](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable) and the [docker](https://www.docker.com/)

###### You will also need to place the ".env" file in the root of the project, this file will be sent via email, as it contains confidential data

Furthermore it is recommended to use an editor to work with the code as [VSCode](https://code.visualstudio.com/download).

#### :tada: Start the project and generate the database

###### Remembering that you need to have a Docker instance open to run the command:

<blockquote>
  docker-compose up --build -d
</blockquote>

```bash
# Clone the repository in some directory of your computer
$ git clone https://github.com/eliveltonsf/todo-izi-api.git

# Enter in the repository
$ cd todo-izi-api

# Install the dependencies
$ npm install

# Start the database for docker
$ docker-compose up --build -d

# Start the server
$ npm run dev
```

<br />
<h2 id="technologies" name="technologies">
▶️ Application Demonstration

#### :gear: You can test the API

- [ ] Install Insomnia Core - <a href="https://insomnia.rest/download/"> Download </a>

- [ ] After installing, download the request structure created for insomina. <a href="https://raw.githubusercontent.com/eliveltonsf/todo-izi-api/main/src/assets/Insomnia-todo-izi.json"> Insomnia-todo-izi.json </a>

<blockquote>
  Importing the json link into insomnia:
  <br />
load the Insomnia-todo-izi.json file
<br />
<br />
<img src="https://uploaddeimagens.com.br/images/004/256/317/original/import_url_insomnia.jpeg?1670804205">
<br />
</blockquote>
<br />

#### :vertical_traffic_light: Routes

The server will start on port 4444, every request is sent by parameters, body, query or header to the back end, whether by insomnia or in a web application, always taking into account the rules developed in the routes

<h2 id="technologies" name="technologies">
⌨️ Documentation of routes in swagger
</h2>

After starting the project, you will have access to an endpoint configured to document and test all the functioning of your routes.

<blockquote>
  http://localhost:4444/docs
</blockquote>

<img src="https://uploaddeimagens.com.br/images/004/780/068/original/swagger.png?1715012045"/>

<hr>

Made with 🧡 By Elivelton Ferreira. [Get in touch!](https://www.linkedin.com/in/eliveltonsf/) :calling:
