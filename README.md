# Smart-city

Install Instructions - 
1. Download the entire repository in a Zip file.
2. In SMART-CITY repository, first right click on "IOT>platform>app.js" .
3. In integrated terminal run "npm i" command.
4. Similarly right click on "IOT>sensors>app.js" .
5. Again run "npm i" command in integrated terminal.

How to Run
1. After the node modules are installed, run both the "app.js" files in integrated terminal.
2. After establishing the server, go to "Postman" for testing the API calls.
3. create a new "GET" request and check for the response by entering ,
    "http://localhost:3000/allData" or
    "http://localhost:3000/allSensor" or
    "http://localhost:3000/data/aq.csv" or
    "http://localhost:3000/data/sr-aq.csv" or
    "http://localhost:3000/data/WM-WD.csv"  in postman API.


Flow Diagram-
is attached in C:\Users\user\Documents\GitHub\Smart-city\Untitled presentation.jpg

Programming Languages/tools used -
1. Languages used - Javascript
2. Frameworks used - NodeJS , ExpressJS, axios, fs(file system), CSV-Parser.
3. Database - MongoDB
4. IDE - Visual Studio Code
5. tools - like chatgpt and google are used for rectifying code errors and understand about required frameworks.

Screenshots -
Screenshots are attached in the repository(C:\Users\user\Documents\GitHub\Smart-city\IOT\ScreenShots)

Assumptions if any - 
Assumptions are that the CSV files are the data generated from from Sensors,
All the three sensors are considered in a single while loop and assuming that out of 3 nodes at any instance random node gives data signal to the sensor server.