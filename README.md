# Acebot ![Build Status](https://travis-ci.org/derek-palmer/acebot-discord.svg)
Bot for Discord Server

## Setup

### Prerequistes

Docker

### Clone repo:
```
git clone https://github.com/derek-palmer/acebot-discord.git
```

### Your App/Bot, client ID and token can be created here:

https://discordapp.com/developers/applications/me/

### Add your bot to your discord server:

https://discordapp.com/oauth2/authorize?&client_id=YOUR_CLIENT_ID_HERE&scope=bot&permissions=0

Add your token to your .env file

### Build and run docker container:
```
docker-compose build
```
```
docker-compose up
```

## Commands (work in progress):

*   !pong - Sends "ping" back to user
*   !bitcoin - Responds with current USD market price of bitcoin
*   !goat - Responds with random goat gif
*   !kitten - Responds with random kitten gif
*   !helpme - Bot help
*   !add - Adds numbers
*   !foo - Responds with "bar!" if you're an Admin.
*   !triggered - Responds with favorite triggered gif.
*   !brule - Responds with randome Steve Brule gif.
*   !bringo - Responds with favorite Steve Brule bringo gif.
*   !bow - Responds with favorite James Franco bow gif.
*   !hue - Responds with favorite HueHueHue gif.
