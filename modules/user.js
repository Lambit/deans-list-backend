const db = require("../db");
const bcrypt = require("bcrypt");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config");


class User {
    constructor( id, username, firstName, lastName, email, isAdmin) {
      this.id = id;
      this.username = username;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.isAdmin = isAdmin;
    }

    /* Get all user function  querying the database and selecting data from users.

    Map over the results to get all. */ 
    
    static async getAllUsers() {
      const results = await db.query(
        `SELECT id, 
                username,
                first_name AS "firstName", 
                last_name AS "lastName", 
                email,
                is_admin AS "isAdmin"
        FROM users`
      );
      // console.log(results.rows);
      const users = results.rows.map(u => new User( u.id, 
                                                    u.username, 
                                                    u.firstName, 
                                                    u.lastName, 
                                                    u.email,
                                                    u.isAdmin));
      console.log(users);                                      
      return users;
    }


    /* Get users by id function targeting the id from database and setting it as a parameter. */ 

    static async getUserById(id) {
      const results = await db.query(
        `SELECT id,
                username,
                first_name AS "firstName",
                last_name AS "lastName",
                email,
                is_admin AS "isAdmin"
        FROM users 
        WHERE id = $1`,[id]);

      let u = results.rows[0];

      if (!u) {
        throw new NotFoundError(`No user with such ${id}`);
      }
      return new User( u.id, 
                       u.username,
                       u.firstName,
                       u.lastName,
                       u.email,
                       u.isAdmin);
    }

      /** Given a username, return data about user.
   *
   * Returns { username, first_name, last_name, is_admin, jobs }
   *   where jobs is { id, title, company_handle, company_name, state }
   *
   * Throws NotFoundError if user not found.
   **/

  static async get(username) {
    const userRes = await db.query(
          `SELECT username,
                  first_name AS "firstName",
                  last_name AS "lastName",
                  email,
                  is_admin AS "isAdmin"
           FROM users
           WHERE username = $1`,
        [username],
    );

    const user = userRes.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);

    return user;
  }

  /** authenticate user with username, password for logging in.
   *
   * Returns { token }
   *
   * Throws UnauthorizedError is user not found or wrong password.
   **/

  static async logIn(username, password) {
    // try to find the user first
    const result = await db.query(
      `SELECT username, 
              password,
              is_admin AS "isAdmin"
      FROM users
      WHERE username = $1`,
        [username],);

    const user = result.rows[0];

    if (user) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        delete user.password;
        return user;
      }
    }

    throw new UnauthorizedError("Invalid username/password");
  }


    /** Register user with data.
   *
   * Returns { username, firstName, lastName, email, isAdmin }
   *
   * Throws BadRequestError on duplicates.
   **/

  static async register(
    { username, password, firstName, lastName, email, isAdmin }) {
  const duplicateCheck = await db.query(
        `SELECT username
         FROM users
         WHERE username = $1`,
      [username],);

  if (duplicateCheck.rows[0]) {
    throw new BadRequestError(`Duplicate username: ${username}`);
  }

  const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

  const result = await db.query(
        `INSERT INTO users
         (username,
          password,
          first_name,
          last_name,
          email,
          is_admin)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id, username, first_name AS "firstName", last_name AS "lastName", email, is_admin AS "isAdmin"`,
      [
        username,
        hashedPassword,
        firstName,
        lastName,
        email,
        isAdmin,
      ],);

    const user = result.rows[0];

    return user;
  }



  /* Create a new user function for post request. Inserting data and returning it. */ 

  static async createNewUser(data) {
      const result = await db.query(
            `INSERT INTO users (username,
                               password,
                               first_name,
                               last_name,
                               email,
                               is_admin)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING id, username, password, first_name AS "firstName", last_name AS "lastName", email, is_admin AS "isAdmin"`,
          [
            data.username,
            data.password,
            data.firstName,
            data.lastName,
            data.email,
            data.isAdmin
          ]);

      let newUser = result.rows[0];
  
      return newUser;
    }

  /* Delete user by id */

  async remove() {
    await db.query(`
        DELETE FROM users
        WHERE id = $1`, 
        [this.id]);
  } 

  /* Update user's username */ 
  
  async updateUser() {
    const results = await db.query(
    `UPDATE users
    SET username = $1
    WHERE id = $2`,
    [this.username, this.id]);
  }


}

module.exports = User;