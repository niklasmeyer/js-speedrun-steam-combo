A little project combining react.js, the speedrun.com API and the steam API to match games in the steam library with games that are ran by people on speedrun. 
With this you can easily check out new games to speedrun.

I'll maybe add personal profiles and console games later on.

API Server:
gunicorn -b localhost:8080 getGames:api

NPM Server (React):
cd wcisr/
npm start
