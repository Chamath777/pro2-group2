# Merchant Game

The Merchant Game is a medieval fantasy themed trading game where players can travel around a world map via icons on a map image and buy ad sell goods/commodities at different locations on the map.

![Preview Image](./public/images/screenshot.png?raw=true "Preview Image")

## Table Of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributors](#contributors)
- [Tests](#tests)
- [Contact](#contact)

<br/>

## Description

The game allows players to log in as individual users and either start a new game or resume a previously saved game in progress. The game will store player data on a database, storing information such as player location on the map and player inventory of items as a saved game. Inventories will also be generated for towns on the map that will randomly generate inventories of commodities that can be traded with the player.

[Deployed Version](https://ascrivener-merchant-game.herokuapp.com)

## User Story

```md
AS A person who likes trading and fantasy video games
I WANT a video game that has a fantasy theme with a trading features
SO THAT I will enjoy the video game I am playing
```

## Acceptance Criteria

```md
GIVEN a video game
WHEN I visit the site for the first time
THEN I am presented with a landing page to log in a a player
WHEN I log in a player
THEN I am taken to the user page for that player
WHEN I click on "new game"
THEN I can start a new game
WHEN I choose to load a saved game
THEN I can resume a previously saved game from a previous session
```

## Project Requirements

The project was designed to fulfil the following requirements:

* Use Node.js and Express.js to create a RESTful API.

* Use Handlebars.js as the template engine.

* Use MySQL and the Sequelize ORM for the database.

* Have both GET and POST routes for retrieving and adding new data.

* Use at least one new library, package, or technology that we haven’t discussed.

* Have a folder structure that meets the MVC paradigm.

* Include authentication (express-session and cookies).

* Protect API keys and sensitive information with environment variables.

* Be deployed using Heroku (with data).

* Have a polished UI.

* Be responsive.

* Be interactive (i.e., accept and respond to user input).

* Meet good-quality coding standards (file structure, naming conventions, follows best practices for class/id naming conventions, indentation, quality comments, etc.).

* Have a professional README (with unique name, description, technologies used, screenshot, and link to deployed application).

<br/>

## Installation

Required Packages:

* NodeJS

* MySQL

* Handlebars.JS

Enter the following commands in the terminal:

```md
npm i
npm run seed
npm start
```
<br/>

## Usage

After completing the steps in the installation section, new players will be required to create a user ID/account and then start a new game.

<br/>

## License

MIT
<br/>

## Contributors
Alex Scrivener, Appoline Cogan, Huw Richmond, Chamath De Silva

View the [Presentation slides](https://docs.google.com/presentation/d/1FsnH6WcCx5L4SBj87xBRRjMUimduqcfGt-27REr1_aU/edit?usp=sharing)

<br/>

## Contact

[Github Repository](https://github.com/Wombattree/MerchantGame)
