const express = require('express');
const router = new express.Router();
const { ensureCorrectUserOrAdmin, ensureAdmin } = require("../middleware/auth");
const User = require('../modules/user');


/* User routes URL looks like http://localhost:3001/users */ 


/* Gets all users using the getAllUsers function from the User module 

returning json as an object with the key users. 

{ users: [ {username, firstName, lastName, email } 

Authorization required: admin token passed through headers */ 

router.get('/', async function (req, res, next) {
    try {
        let users = await User.getAllUsers();
        return res.json({users});
    } catch (e) {
        return next(e);
    }
});

/* Get by username
 
{ username, firstName, lastName, isAdmin, jobs }
    
 Authorization required: admin or same user-as-:username */

router.get("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
      const user = await User.get(req.params.username);
      return res.json({ user });
    } catch (err) {
      return next(err);
    }
  });

/* Get user by the id parameter and returning the json on user. 

{ users: [ {id, username, firstName, lastName, email }
    
Authorization required: admin token passed through headers */ 

router.get('/:id', ensureAdmin, async function (req, res, next) {
    try {
        let user = await User.getUserById(req.params.id);
        return res.json(user);
    } catch (e) {
        return next(e);
    }
});

/* Delete user by targeting id with the gertUserById function.

Authorization required: admin or same user-as-:username */ 

router.delete('/:id', ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
      let user = await User.getUserById(req.params.id);
      await user.remove();
      return res.json({ msg: "DELETED!"});
  } catch (e) {
      return next(e);
  }
  });
  
/* Update username by targeting id with the gertUserById function, ard requestion 

the body of user. Authorization required: admin or same user-as-:username */ 

router.patch('/:id/update', ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    let user = await User.getUserById(req.params.id);
    user.username = req.body.username;
    await user.updateUser();
    return res.json(user);
} catch (e) {
    return next(e);
}
});

/* Patch username 
 
 { firstName, lastName, password, email }

 Authorization required: admin or same-user-as-:username */

router.patch("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
      console.log(req.body);  
      const user = await User.update(req.params.username, req.body);
      return res.json({ user });
    } catch (err) {
      return next(err);
    }
  });

module.exports = router;