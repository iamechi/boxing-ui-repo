# K.O. Time Flow React Front End
This is the front end for the boxing management application. It is developed through the use of REACT + TypeScript. Node.js was used to create the initial project, but Vite was used to build the application and install necessary libraries and dependencies. The libraries installed for the application were:
- React Router - for handling web links and screen navigation
- Bootstrap - for using table elements
- Axios - for creating an api that will communicate to the Java Spring Boot backend.

There is also a dockerfile that builds the image that will create the Docker container for this REACT application. In this container, a Nginx web server is utilized for better web performance. That is also why a nginx.conf file was added to set up the configuration for the web server.

