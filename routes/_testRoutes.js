const db = require("../app/db");
const User = require("../modules/user");
const { createToken } = require("../token/tokens");

async function commonBeforeAll() {
    // noinspection SqlWithoutWhere
    await db.query("DELETE FROM users");
  
    await User.register({
      id: Number,
      username: "u1",
      firstName: "U1F",
      lastName: "U1L",
      email: "user1@user.com",
      password: "password1",
      isAdmin: false,
    });
    await User.register({
      id: Number,
      username: "u2",
      firstName: "U2F",
      lastName: "U2L",
      email: "user2@user.com",
      password: "password2",
      isAdmin: false,
    });
    await User.register({
      id: Number,
      username: "u3",
      firstName: "U3F",
      lastName: "U3L",
      email: "user3@user.com",
      password: "password3",
      isAdmin: false,
    });
  }
  
  async function commonBeforeEach() {
    await db.query("BEGIN");
  }
  
  async function commonAfterEach() {
    await db.query("ROLLBACK");
  }
  
  async function commonAfterAll() {
    await db.end();
  }
  
  
  const u1Token = createToken({ username: "u1", isAdmin: false });
  const u2Token = createToken({ username: "u2", isAdmin: false });
  const adminToken = createToken({ username: "admin", isAdmin: true });
  
  
  module.exports = {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    u1Token,
    u2Token,
    adminToken,
  };