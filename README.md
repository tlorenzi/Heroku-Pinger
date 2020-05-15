# Heroku-Pinger
This website allows users to entire a website address, which will be regularly pinged. This is meant to stop Heroku apps 
from "sleeping." Heroku apps that are sleeping take longer to load, and they are sleeping due to a user not accessing the 
site recently. Even, when using a pinger to keep Heroku apps from sleeping, the free tier of Heroku requires apps to sleep for
a minimum of 6 hours a day.

Instruction to run localy: 
1) npm install
2) node server.js
