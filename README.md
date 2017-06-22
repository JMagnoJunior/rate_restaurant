# rate_restaurant

## About This Project

    It shows a example implementation of a full stack app with javascript. (and you can rate restaurants too...)
 
    This project was divided in two part: Front end using React.js and a backend using express. 

    This app is very simple. It will show restaurants around you (if browser geo-localization is enabled). You can select one and see all the comments and stars received by the selected restaurant.
    If browser geo-localization is disabled it will show a input text  and you can inform where you are.
    That is all.

## Installation

    The easier way to see this thing running is using docker. 
    You need download the file docker-compose.yml and run the command:
    docker-compose up
    
    Another way to install it using npm install for both front and back end. You will need a mongo server and a server node installed.
   
## Architectural Decisions

    1 - In such small project to divide the front and back end can not be the best or fast solution. I think the benefits of separate the back end will be present when we have to expose some features to many client. My choice was keep this way as an example. of how this things can work together
    2 - I am using basic auth to apply some security level when accessing the backend. The problem here is: I fixed the user and password inside the code. The best approach is using some api manager to do this role. 
    3 - Node is running in cluster mode.
    4 - There is webpack in client and grunt in server. I put webpack in front because of react (and babel). In back end I used grunt just to test and build the application.

## About Tests

    1 - Ordinarily I use TDD, but for this project I did not take this approach.
    2 - There is no end-to-end test here. I know selenium. It is not difficult, but it consumes a lot of time to implement and  is needed a different project/server to run it.
    3 - I have a lot of code here not covered yet. 

## swagger

    1 - I put swagger running in /swagger address. It is just to show how the API was documented.

## CI, CD and Deploy

    1 - I prepared some scripts to test and build application both in the back end and in the front and. Jenkins can easily be prepared to run this pipeline at any time.
    2 - I put in package.json all scripts needed for test and build the application. Jenkins only will have to call it and run the pipeline. (All the hard work was done by webpack and grunt).
    3 - Using docker swarm we can put a new image of a service in production at any time we want. All we have to do is to update the image. It could be just on more step on jenkins pipeline. 

## Warning
     This application was tested on google chrome. I had a issue render it on safari (The css that I used to print the stars is not working properly.)
