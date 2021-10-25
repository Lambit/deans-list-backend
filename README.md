DEAN'S LIST CORAL

Dean’s List Coral is an Ecommerce website for marketing and distributing live coral. The goal is to display beautiful healthy coral that consumers can purchase for their home aquariums.

<br />
BACKEND - BUILT WITH  

Node.js

Express

Square

PostgreSQL

(View package.json for the rest of the dependencies.)


<br />
GETTING STARTED  

To create and seed the PostgreSQL database, cd into the backend directory run the command

node deans-list-seed.sql

After installing Node and Nodemon use these commands to start up the applications backend.

nodemon server.js

or

node server.js


<br />
OVERVIEW  

  The backend of this project is created with Node.js and written with Express. A RESTful API was built from scratch, and uses Square’s API to take payments. All sensitive information such as secret keys and users information, is safely stored and hidden. The Config page houses all my configurations using dotenv to hide variables, or make decisions on what to use when the app is in production. Like the database for example, Postgresql is used to store the data. The getDatabaseUri function decides which one to be, if the app is in development or production. Along with the SECRET_KEY which will be used to authenticate jsonwebtokens when a user registers. The db page uses pg (postgesql) and getDatabaseUri to decide what client to set for the database and connect it. The expressError page has custom errors that will be used across the site for bugs and user errors. The token page uses jsonwebtoken and the SECRET_KEY to sign a new token and set the users admin to default. The index has configurations that will be used site-wide like cors for request, express.json, to parse data and authenticateJWT for registration. All of the routes are imported from express router and named on the index page.
  
  There are 4 separate route pages for this project, auth, user, payment and profile. The userRoutes has routes for getting users, posting a new user, deleting and patching. Each route is awaited because they are calling async functions in the user module. In the user module a constructor class is created, which uses SQL querying and bcrypt to store a user's data safely in the database. Most of the routes have functions attached for admin and is current user security. These functions are located in the auth.js stored in the middleware folder. Here is where the jsonwebtoken is set to the headers and verified by the SECRET_KEY. With this being done, ensureAdmin and ensureLoggedIn were created.
  
   The auth page has two post routes, one for logging in and the other for  registering. Using functions from the Users module and the createToken from the tokens page. The app is able to determine if this is true or false. The profile page just has one get request with ensureLogginedIn so only the logged in user at the present time can access it. The paymentRoute holds one post request that acquires the payload from the Square payment form and sends it to the Square payment api. All of these routes use jsonwebschema with custom schemas built with an online resource. 
   
   The Square utilities page initializes the square client, sets an idempotency key using uuid4 and makes a test call to the locations API. The SQL folder has sql files for creating and deleteing databases, seeding them and testing them. They can be used by running them in the command line “node deans-list-seed.sql’.
