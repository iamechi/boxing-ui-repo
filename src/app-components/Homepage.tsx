//This will represent the home page of the screen. It will provide a brief description of where the project is at.
function Homepage() {
  return (
    <>
      <h2>
        Hello, welcome to K.O. Time Flow!
      </h2>
      <p>
        This is the app that will let you schedule boxers for fights at
        different arenas. The goal of this application is provide a simple, easy to use interface,
        for the sole purpose of scheduling fighters rather than have it be an all-in-one applications 
        that serve multiple purposes, like other fight scheduling applications are. All-in-one applications can be overwhelming
        so for smaller organizations who just want a simpler and easy way of scheduling fighters 
        at different venues, this will be an application that they can use without feeling overwhelmed.
        This is a first version of the application with plans to add more functionality 
        in the future. Down below is more information about 
        how the application is self was built.
      </p>
      <h3>Tech Stack</h3>
      <p>
        The overall architecture of this application is a microservices architecture. 
        Each microservice is responsible for a specific domain of the application, such as fighter management, arena management, and fight scheduling. 
        The frontend is built using React and communicates with the Java Spring Boot backend services via RESTful APIs. There is also a 
        eureka server for service discovery to help facilitate REST communication between the them.
        The database is managed using MySQL, and the entire application is containerized using Docker for easy deployment 
        and scalability. As for cloud technologies, the application is deployed on AWS EC2, with the database hosted on AWS Aurora and RDS.
        Furthermore, AWS Route 53 is used for managing the application's domain and DNS records. Down below is a list of
        all technologies used to build the application for easier readability and understanding.
      </p>
      <ul>
        <li>React Typescript and HTML/CSS - Use for frontend and development and UI design</li>
        <li>Java Springboot - Used for performing backend business logic and handling server-side operations</li>
        <li>MySQL - Used for storing and managing the application's data</li>
        <li>Docker - Used for containerizing each of the microservices and the react frontend</li>
        <li>Docker Compose - Used for orchestrating and managing multiple Docker containers</li>
        <li>Git - Used for version control and managing the source code of the application</li>
        <li>AWS EC2 - Used for deploying and running the application on the cloud</li>
        <li>AWS Aurora and RDS - Used for hosting and managing the application's database</li>
        <li>Github Co-pilot - Used for AI-assisted code generation and development</li>
        <li>Postman - used for API testing</li>
        <li>Visual Studio Code, Intellij IDEA - Used for code editing and development</li>
        <li>AWS Route 53 - Used for managing the application's domain and DNS records</li>
      </ul>
      <h3>Implemented Screens</h3>
      <p>
        The initial development plan was to focus on the main services that were needed 
        for the main purpose of the application to be fulfilled. There will be other screens
        implemented in the future, but for now these are the screens that have been implemented:
      </p>
      <ul>
        <li>Fighter Management Screen</li>
        <li>Arena Management Screen</li>
        <li>Schedule Fight Screen</li>
      </ul>
      <h3>Repo Organization and Version Control</h3>
      <p>
        GitHub was the main tool used for version control and managing the source code.
        Each microservice and the frontend have their own repositories, and the main application
        has its own repository that has the other repositories as submodules. At the root the main repository
        is a docker compose file that is used to run all of the containers for the microservice and front-end.
        Here are the links to the git repositories for each microservices and the frontend, 
        as well as the repo for the main application:
      </p>
      <ul>
        <li><a href="https://github.com/iamechi/boxing-fighter-management-app">Fighter Management Service Repo</a></li>
        <li><a href="https://github.com/iamechi/boxing-arena-management-application">Arena Management Service Repo</a></li>
        <li><a href="https://github.com/iamechi/boxing-scheduling-fights-management-app">Schedule Fight Service Repo</a></li>
        <li><a href="https://github.com/iamechi/boxing-ui-repo">React Front End Repo</a></li>
        <li><a href="https://github.com/iamechi/KO-Time-Flow-Main-Application">Main Application Repo</a></li>
      </ul>
      <h3>Future Plans</h3>
      <p>
        There are still plans to implement the Calendar and Financing screens in the future,
        as well as other potential features and improvements to the existing screens. For now,
        please take a look at the existing screens and provide feedback. Thank you for your time!
      </p>
    </>
  );
}

export default Homepage;
