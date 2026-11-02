//This will represent the home page of the screen. It will provide a brief description of where the project is at.
function Homepage() {
  return (
    <>
      <h2 style={{ justifyContent: "center" }}>
        Hello, welcome to K.O. Time Flow!
      </h2>
      <p style={{ justifyContent: "center" }}>
        This is the app that will let you schedule boxers for fights at
        different arenas. As of right now it is in it's early stages but there will be 
        enhancements and new additions to this application as time goes on. The tech stack
        for this application goes as follows:
      </p>
      <ul>
        <li>React Typescript and HTML/CSS - Use for frontend and development and UI design</li>
        <li>Java Springboot - Used for performing backend business logic and handling server-side operations</li>
        <li>MySQL - Used for storing and managing the application's data</li>
        <li>Docker - Used for containerizing each of the microservices and the react frontend</li>
        <li>Git - Used for version control and managing the source code of the application</li>
        <li>AWS EC2 - Used for deploying and running the application on the cloud</li>
        <li>AWS Aurora and RDS - Used for hosting and managing the application's database</li>
        <li>Github Co-pilot - Used for AI-assisted code generation and development</li>
        <li>Postman - used for API testing</li>
        <li>Visual Studio Code, Intellij IDEA - Used for code editing and development</li>
      </ul>
      <p>So far, these are the screens that have been implemented:</p>
      <ul>
        <li>Fighter Management Screen</li>
        <li>Arena Management Screen</li>
        <li>Schedule Fight Screen</li>
      </ul>
      <p>
        There are still plans to implement the Calendar and Financing screens in the future,
        as well as other potential features and improvements to the existing screens. For now,
        please take a look at the existing screens and provide feedback. Thank you for your time!
      </p>
    </>
  );
}

export default Homepage;
