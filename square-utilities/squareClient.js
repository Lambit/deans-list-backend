const { ApiError, Client, Environment } = require('square');
const { SAND_ACCESS } = require("../config"); 
const { v4: uuidv4 } = require('uuid');

const accessToken = SAND_ACCESS; 

console.log('accessToken:', accessToken);

/* Generate random key  using uuid4 function for idempotencyKey */ 
let myIdempotencyKey = uuidv4();


/* Set Square Sandbox credentials by creating a new Client with
enviroment and access token. */ 
const client = new Client({
    environment: Environment.Sandbox,
    accessToken
});

/* Initializing the payment API from Square */ 
const { paymentsApi } = client;

// Get an instance of the Square API you want call
const { locationsApi } = client

// Create wrapper async function 
const getLocations = async () => {
  // The try/catch statement needs to be called from within an asynchronous function
  try {
    // Call listLocations method to get all locations in this Square account
    let listLocationsResponse = await locationsApi.listLocations()

    // Get first location from list
    let firstLocation = listLocationsResponse.result.locations[0]

    console.log("Here is your first location: ", firstLocation)
  } catch (error) {
    if (error instanceof ApiError) {
      console.log("There was an error in your request: ", error.errors)
    } else {
      console.log("Unexpected Error: ", error)
    }
  }
}

// Invokes the async function
// getLocations()

// RESULTS
// Here is your first location:  {
// 
//     name: 'Default Test Account',
//     address: {
//       addressLine1: '1600 Pennsylvania Ave NW',
//       locality: 'Washington',
//       administrativeDistrictLevel1: 'DC',
//       postalCode: '20500',
//       country: 'US'
//     },
//     timezone: 'UTC',
//     capabilities: [ 'CREDIT_CARD_PROCESSING' ],
//     status: 'ACTIVE',
//     createdAt: '2021-08-02T21:37:13Z',
//     merchantId: 'ML1BXVMR5SRYJ',
//     country: 'US',
//     languageCode: 'en-US',
//     currency: 'USD',
//     businessName: 'Default Test Account',
//     type: 'PHYSICAL',
//     businessHours: {},
//     mcc: '7299'
//   }


module.exports = { client , myIdempotencyKey, paymentsApi, locationsApi }