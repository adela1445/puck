<body style="background-color: rgb(35,35,35); font-family: Times New Roman; font-size: 16px;>

<div style="color: yellow;">

# PuckMan Chase

</div>

<div style="text-align: left;">

![GitHub](https://img.shields.io/github/license/JOCECODE/PucMan_Chase?style=plastic) ![GitHub All Releases](https://img.shields.io/github/downloads/JOCECODE/PucMan_Chase/total?logo=Github&style=plastic) ![GitHub commit activity](https://img.shields.io/github/commit-activity/m/JOCECODE/PucMan_Chase?color=dodgerblue&logo=github&style=plastic) ![GitHub contributors](https://img.shields.io/github/contributors/JOCECODE/PucMan_Chase?color=goldenrod&logo=github&style=plastic)

</div>

## Table Of Contents

1. [User-Demo](#User-Demo)
1. [Description](#Description)
1. [User-Story](#User-Story)
1. [Installation&Usage](#Installation&Usage)
1. [License](#License)
1. [Questions](#Questions)

## User-Demo

Screenshots:
![screenshots](<./screenshots/Screenshots(1).png> "Screenshot Of User Demo")
![screenshots](<./screenshots/Screenshots(2).png> "Screenshot Of User Demo")
![screenshots](<./screenshots/Screenshots(3).png> "Screenshot Of User Demo")
![screenshots](<./screenshots/Screenshots(4).png> "Screenshot Of User Demo")
![screenshots](<./screenshots/Screenshots(5).png> "Screenshot Of User Demo")

## Description

In this application, the user is first taken to a login or sign-up page and needs to put in their info to make a new account or login to an existing account. The user inputs their email address and a password that gets hashed into the database. After authentication, the user is then shown the game instructions and can press a button to start the game. On "click" the user is then redirected to the gamestart.html page where they start the game. After losing 3 lives it is gameover. The user must dodge asteroids to avoid losing a life. Once the user loses all their lives they are then redirected to the highScores page where they can see their personal high scores and can replay the game if they want.

## User-Story

```
As a Retro Gamer,
I want to play a game
that pays homage to
PacMan and Asteroids!
```

## Installation&Usage

Must download and install [Node](https://nodejs.org/en/download/)

Must install the following NPM packages:

- to install [express](https://www.npmjs.com/package/express) run the following code in your terminal:
  `npm i express`
- to install [sequelize](https://www.npmjs.com/package/sequelize) run the following code in your terminal:
  `npm i sequelize`
- to install [mysql](https://www.npmjs.com/package/mysql) run the following code in your terminal:
  `npm i mysql`
- to install [planck-js](https://www.npmjs.com/package/planck-js) run the following code in your terminal:
  `npm i planck-js`
- to install [bcryptjs](https://www.npmjs.com/package/bcryptjs) run the following code in your terminal:
  `npm i bcryptjs`
- to install [dotenv](https://www.npmjs.com/package/dotenv) run the following code in your terminal:
  `npm i dotenv`
- to install [express-session](https://www.npmjs.com/package/express-session) run the following code in your terminal:
  `npm i express-session`
- to install [passport](https://www.npmjs.com/package/passport) run the following code in your terminal:
  `npm i passport`
- to install [passport-local](https://www.npmjs.com/package/passport-local) run the following code in your terminal:
  `npm i passport-local`

User-Flow

- Using the _server.js_ as a an entry point run `npm start` on the terminal to start the application. From there, the user will sign up or login. The user will be shown the rules of the game and clicks start when they're ready to play. The game is survival and the user must dodge the incoming asteroids in order to not lose a life. Losing three is gameover which will automatically cut to the highscores page where the user sees their high score.

## License

[MIT](https://choosealicense.com/licenses/mit/) Copyright (c) 2020 Jose Ulices Perez Jr.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Contact-Info

_<strong style="font-size: 22px;">Jose Ulices Perez Jr.</strong>_

<strong style="color: palegoldenrod;">GitHub:</strong> https://github.com/JOCECODE

<strong style="color: palegoldenrod;">Email:</strong> jocecode27@gmail.com

_<strong style="font-size: 22px;">Melinda Lindsey</strong>_

<strong style="color: palegoldenrod;">GitHub:</strong> https://github.com/mlindsey13

_<strong style="font-size: 22px;">Stephany Adela Lopez</strong>_

<strong style="color: palegoldenrod;">GitHub:</strong> https://github.com/adela1445

_<strong style="font-size: 22px;">Stuart Wong</strong>_

<strong style="color: palegoldenrod;">GitHub:</strong> https://github.com/swong1200

Feel free to email the team with any questions with the application or troubleshooting. Provide your name and or contact info and we will get back to you ASAP.

</body>
