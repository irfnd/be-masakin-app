<div align="center">
  <p>
    <img src="https://firebasestorage.googleapis.com/v0/b/masakin-app-irfnd.appspot.com/o/documentations%2Fmain-banner.png?alt=media&token=d88c4590-775a-4292-b1bb-7eaec79a4539" alt="Logo" width="auto">
  </p>

  <h3 align="center">Masakin App (Backend)</h3>
  <i><h4 align="center">A place to find inspiration for cooking recipes anywhere and anytime</h4></i>

  <p align="center">
    <a href="https://be-masakin-app.up.railway.app/">View Demo</a>
    |
    <a href="https://github.com/irfnd/be-masakin-app/issues">Report Bug</a>
    |
    <a href="https://github.com/irfnd/be-masakin-app/issues">Request Feature</a>
  </p>
</div>

## About The Project

**Masakin App** is a simple website that provides a variety of user-entered recipes, the recipes provided display ingredients and cooking stages with videos. Users can leave comments for the displayed recipes. In addition, users can also give likes and save the recipes they want.

### Built With

This app was built with some technologies below:

[![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)](https://www.ecma-international.org/publications-and-standards/standards/)
[![Express JS](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)](https://jwt.io/)
[![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)](https://sequelize.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?&style=for-the-badge&logo=redis&logoColor=white)](https://redis.com/)
[![Firebase](https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Heroku](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)](https://www.heroku.com/)

## Getting Started

### Prerequisites

#### Required

Before going to the installation stage there are some software that must be installed first.

[![Node JS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/en/download)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?&style=for-the-badge&logo=redis&logoColor=white)](https://redis.com/)
[![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white)](https://www.postman.com/)

#### Optional

You can install yarn package manager for your project

[![Yarn](https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white)](https://yarnpkg.com/)

### Installation

If you want to run this project locally, I suggest you to create a database on your local postgreSQL server first before configuring this backend repo. You can give the database name whatever you want, as long as it includes the postgreSQL URI in the .env file. and don't forget to include the redis URI too.

- Clone this repo

```bash
git clone https://github.com/irfnd/be-masakin-app
```

- Go to folder repo

```bash
cd be-masakin-app
```

- Install packages

```bash
npm install
```

- or install packages with yarn

```bash
yarn
```

- <a href="#setup-firebase">Setup Firebase</a>
- <a href="#setup-postgresql">Setup PostgreSQL</a>
- <a href="#setup-redis">Setup Redis</a>
- <a href="#setup-smtp">Setup SMTP</a>
- <a href="#setup-environment">Setup Environment</a>
- Type `npm run dev` or `yarn dev` to start project development
- Type `npm run start` or `yarn start` to start project production

### Setup Firebase

Create firebase to provide photo storage for this project. To get your firebase credentials follow this steps:

- Open your console firebase
- Open Project settings
- Click Service accounts tabs
- Click Firebase Admin SDK tabs
- Click Generate new private key button
- Download, rename it to `credentials.json` and put your credentials file to libs folder
- Add bucket name on `.env` file

### Setup PostgreSQL

PostgreSQL is required to provide database storage.

- Create a database on your local/cloud postgreSQL server
- Give database name whatever you want
- Check postgreSQL local/cloud host and port
- Add postgreSQL URI to `.env` file

### Setup Redis

Redis is required to provide REST API cached data when user doing GET request.

- If you prefer to create redis on cloud, you can register on [Redis Cloud](https://app.redislabs.com)
- Setup Data Access Control, Users, and Roles for database
- If you use local redis server, check host and port
- Add redis local/cloud URI to `.env` file

### Setup SMTP

SMTP is required to send verification user email and send resetting password email.

- If you have your own SMTP server, add server url, port, username, and password to `.env` file
- If you use gmail, you can create app password for your app and add the credential to `.env` file, for example:
  - SMTP_HOST=smtp.gmail.com
  - SMTP_PORT=587
  - SMTP_USERNAME=[your_gmail]
  - SMTP_PASSWORD=[your_app_password]

### Setup Environment

- Read `.env.example` to get all detail environment for this project
- Create your `.env` file based on `.env.example`
- Put `.env` to root project folder

## Postman

- Get `postman.json` file from this repo
- Import to your postman
- All routes for this project can be seen in postman

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

- Fork the Project
- Create your Feature Branch `git checkout -b feature/AmazingFeature`
- Commit your Changes `git commit -m 'Add some AmazingFeature'`
- Push to the Branch `git push origin feature/AmazingFeature`
- Open a Pull Request

## License

Distributed under the [MIT](/LICENSE) License.
