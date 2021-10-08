const jsonschema = require("jsonschema");
const User = require("../modules/user");
const express = require("express");
const router = new express.Router();
const { createToken } = require("../token/tokens");
const registerUserSchema = require("../schemas/registerUser.json");
const userLoginSchema = require("../schemas/userLogin.json");
const { BadRequestError } = require("../app/expressError");

/** Auth routes URL looks like http://localhost:3001/auth 
 * 
 * POST /auth/login:  { username, password } => { token }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 */

router.post("/login", async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userLoginSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const { username, password } = req.body;
    const user = await User.logIn(username, password);
    const token = createToken(user);
    console.log(user);
    console.log(token);
    return res.json({ token });
  } catch (err) {
    return next(err);
  }
});


/** POST /auth/register:   { user } => { token }
 *
 * user must include { username, password, firstName, lastName, email }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 */

router.post("/register", async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, registerUserSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const newUser = await User.register({ ...req.body, isAdmin: false });
    const token = createToken(newUser);
    return res.status(201).json({ token });
  } catch (err) {
    return next(err);
  }
});




module.exports = router;