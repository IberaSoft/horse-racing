<p align="center">
  <img src="hr-logo.png" width="450" title="Multiplayer Horse Racing Game">
</p>

# Multiplayer Horse Racing Game

> Web and mobile app developed for WH's Hackathon 2017

[![Build Status](http://img.shields.io/travis/badges/badgerbadgerbadger.svg?style=flat-square)](https://travis-ci.org/badges/badgerbadgerbadger) [![Coverage Status](http://img.shields.io/coveralls/badges/badgerbadgerbadger.svg?style=flat-square)](https://coveralls.io/r/badges/badgerbadgerbadger) [![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

---

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Team](#team)
- [License](#license)

## Description

This is an addictive multiplayer game developed for WH's Hackathon 2017 where the participants can play as jockeys or just bet for each of them using their SmartPhones.

### Play now!

> Go to [this](https://racing.vlrz.es) url and follow the instructions...

***Race administrator***
```
1- Enter the race duration (in milliseconds e.x.: 5000) and press `Create` button.
2- Once the players have entered their names, click on `Start Race` button...
```
***Players***
```
1- Scan the QR code provided with your mobile's camera and open the url provided. 
2- Enter your name and wait until the administrator start the race.
3- Once the race start, shake your mobile as much as you can in order to move your horse.
4- Enjoy!
```
***Betting***
```
- For betting, just scan the QR code provided before the race start and follow the instructions.
```

## Installation

### Prerequisites
- [NodeJS](https://nodejs.org/en/download/) v6.0.0 or greater is installed, and `node` and `npm` are available on the PATH environment variable.
- [Git](https://git-scm.com/) v2.6.4 or greater is installed, and is available on the PATH environment variable.
- [RethinkDB](https://rethinkdb.com/docs/install/)
- Any SmartPhone with accelerometer and QR code scanner

### Clone

- Clone this repo to your local machine using `https://github.com/IberaSoft/horce-racing.git`

### Setup

```shell
$ npm install
$ brew update && brew install rethinkdb
```

> Open a console tab for racing-backend project

```shell
$ rethinkdb       // Start the DB
```

> Open a new console tab for racing-frontend project

```shell
$ npm run reql    // Builds the DB
$ npm run start
```

> Open a new console tab for racing-frontend project

```shell
$ sudo npm start --port:80
```

## Team

- Manuel Valls Fernandez [@manvalls](https://github.com/manvalls)
- Radi Hristova [@radiola](http://radoila.com/)
- Erika Matesanz [@ematesanz](https://github.com/ematesanz)
- Juan Cruz Llorens [@iberasoft](https://github.com/iberasoft)

## License

- [MIT license](http://opensource.org/licenses/mit-license.php)
- Copyright 2017 © <a href="http://iberasoft.com" target="_blank">IberaSoft</a>.