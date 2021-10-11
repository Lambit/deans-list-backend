const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
  } = require("../expressError");
  const db = require("../db");
  const User = require("./user");

  /************************************** logIn */

describe("logIn", function () {
    test("works", async function () {
      const user = await User.logIn("u1", "password1");
      expect(user).toEqual({
        id: Number,
        username: "u1",
        firstName: "U1F",
        lastName: "U1L",
        email: "u1@email.com",
        isAdmin: false,
      });
    });
  
    test("unauth if no such user", async function () {
      try {
        await User.logIn("nope", "password");
        fail();
      } catch (err) {
        expect(err instanceof UnauthorizedError).toBeTruthy();
      }
    });
  
    test("unauth if wrong password", async function () {
      try {
        await User.logIn("c1", "wrong");
        fail();
      } catch (err) {
        expect(err instanceof UnauthorizedError).toBeTruthy();
      }
    });
  });

  /************************************** register */

describe("register", function () {
    const newUser = {
      id: Number,
      username: "new",
      firstName: "Test",
      lastName: "Tester",
      email: "test@test.com",
      isAdmin: false,
    };
  
    test("works", async function () {
      let user = await User.register({
        ...newUser,
        password: "password",
      });
      expect(user).toEqual(newUser);
      const found = await db.query("SELECT * FROM users WHERE username = 'new'");
      expect(found.rows.length).toEqual(1);
      expect(found.rows[0].is_admin).toEqual(false);
      expect(found.rows[0].password.startsWith("$2b$")).toEqual(true);
    });
  
    test("works: adds admin", async function () {
      let user = await User.register({
        ...newUser,
        password: "password",
        isAdmin: true,
      });
      expect(user).toEqual({ ...newUser, isAdmin: true });
      const found = await db.query("SELECT * FROM users WHERE username = 'new'");
      expect(found.rows.length).toEqual(1);
      expect(found.rows[0].is_admin).toEqual(true);
      expect(found.rows[0].password.startsWith("$2b$")).toEqual(true);
    });
  
    test("bad request with dup data", async function () {
      try {
        await User.register({
          ...newUser,
          password: "password",
        });
        await User.register({
          ...newUser,
          password: "password",
        });
        fail();
      } catch (err) {
        expect(err instanceof BadRequestError).toBeTruthy();
      }
    });
  });

/************************************** getAllUsers */

describe("getAllUsers", function () {
    test("works", async function () {
      const users = await User.getAllUsers();
      expect(users).toEqual([
        {
          id: Number,
          username: "u1",
          firstName: "U1F",
          lastName: "U1L",
          email: "u1@email.com",
          isAdmin: false,
        },
        {
          id: Number,
          username: "u2",
          firstName: "U2F",
          lastName: "U2L",
          email: "u2@email.com",
          isAdmin: false,
        },
      ]);
    });
  });

/************************************** get */

describe("get", function () {
    test("works", async function () {
      let user = await User.get("u1");
      expect(user).toEqual({
        username: "u1",
        firstName: "U1F",
        lastName: "U1L",
        email: "u1@email.com",
        isAdmin: false,
        applications: [testJobIds[0]],
      });
    });
  
    test("not found if no such user", async function () {
      try {
        await User.get("nope");
        fail();
      } catch (err) {
        expect(err instanceof NotFoundError).toBeTruthy();
      }
    });
  });