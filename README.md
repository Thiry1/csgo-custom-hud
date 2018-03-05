csgo-custom-hud
=======

react based cs:go custom hud.

# How to use
## before running app.
- `gameConfig/gamestate_integration_observerspectator.cfg` needs to be placed in cfg folder in CS:GO location
- `gameConfig/observer.cfg` needs to be placed in cfg folder in CS:GO location.

Then execute these command.
```sh
npm i
npm run build
npm start
```
# For developer
## how to enable Chrome dev tools
```sh
npm run install:sdk
npm run build
npm start
```
Now you may press `F12`, then you can use Chrome dev tools.
## how to start storybook
```sh
npm i
npm run start:storybook
```
access [http://localhost:3000/](http://localhost:3000/).  
Story subjects are currently written in Japanese.  
I will change to English whenever I feel like.  