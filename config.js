/** Shared config for application; can be required many places. */

require("dotenv").config();
require("colors");

const SECRET_KEY = process.env.SECRET_KEY || 'secret-dev';

// const PORT = +process.env.PORT || 3001;

const BASE_URL = process.env.BASE_URL;


// development
const SANDBOX_ACCESS_TOKEN = process.env.SANDBOX_ACCESS_TOKEN;
const SANDBOX_APPLICATION_ID = process.env.SANDBOX_APPLICATION_ID;

console.log('config-token:', SANDBOX_ACCESS_TOKEN, 'config-id:', SANDBOX_APPLICATION_ID);

// production
const SQUARE_APPLICATION_ID = process.env.SQUARE_APPLICATION_ID;
const SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN;

// location for dev and pro
const LOCATION_ID = process.env.LOCATION_ID;

// Use dev database, testing database, or via env var, production database
function getDatabaseUri() {
  return (process.env.NODE_ENV === "test")
      ? "deans_list_coral"
      : process.env.DATABASE_URL || "deans_list_coral";
}

// Speed up bcrypt during tests, since the algorithm safety isn't being tested
//
// WJB: Evaluate in 2021 if this should be increased to 13 for non-test use
const BCRYPT_WORK_FACTOR = 12;

console.log("DB Config:".green);
console.log("SECRET_KEY:".yellow, SECRET_KEY);
console.log("PORT:".yellow, PORT.toString());
console.log("BCRYPT_WORK_FACTOR".yellow, BCRYPT_WORK_FACTOR);
console.log("Database:".yellow, getDatabaseUri());
console.log("---");

module.exports = {
  SECRET_KEY,
  BASE_URL,
  API,
  SANDBOX_ACCESS_TOKEN,
  SANDBOX_APPLICATION_ID,
  SQUARE_APPLICATION_ID,
  SQUARE_ACCESS_TOKEN,
  LOCATION_ID,
  BCRYPT_WORK_FACTOR,
  getDatabaseUri, 
};