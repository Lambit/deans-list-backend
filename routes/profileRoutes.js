const express = require('express');
const router = new express.Router();
const { ensureLoggedIn } = require("../middleware/auth");
const { UnauthorizedError } = require("../app/expressError");

/* profile routes URL looks like http://localhost:3001/profile */

/* GET request with ensureLoggedIn, route only accesed by registered users.

Token is passed through the headers  */ 

router.get('/', ensureLoggedIn, async function (req, res, next) {
    try {
        return res.json({msg: `Signed into profile!`});
    } catch (e) {
        throw UnauthorizedError("Please login first!")
    }
});

module.exports = router;