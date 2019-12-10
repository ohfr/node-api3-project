const express = require('express');

const { validatePost, validateUser, validateUserId } = require("../Middleware/validate");

const db = require("./userDb");

const postDb = require("../posts/postDb");

const router = express.Router();

router.post('/', validateUser(), async (req, res) => {
  let user = await db.insert(req.body);
  if (user) {
    res.status(201).json(user);
  } else {
    next("Internal Error");
  };
});

router.post('/:id/posts', validatePost(), async(req, res) => {
  let post = await postDb.insert(req.body);
  if (post) {
    res.status(201).json(post);
  } else {
    next("Internal Error");
  };
});

router.get('/', async (req, res) => {
  let users = await db.get();
  if (users) {
    res.status(200).json(users);
  } else {
      next("Internal Error");
  };
});

router.get('/:id', validateUserId(),(req, res) => {
  res.status(200).json(req.user);
});

router.get('/:id/posts',validateUserId(),async(req, res) => {
  let post = await db.getUserPosts(req.params.id);

  if (post) {
    res.json(post);
  } else {
    next("Intenal Error");
  };
});

router.delete('/:id',validateUserId(),async (req, res) => {
  let deletedUser = await db.remove(req.params.id);

  if (deletedUser) {
    res.status(200).json(deletedUser);
  } else {
    next("Internal Error");
  };
});

router.put('/:id',validateUserId(), validateUser(), async (req, res) => {
  let updatedUser = await db.update(req.params.id, req.body);

  if (updatedUser) {
    res.status(200).json(updatedUser);
  } else {
    next("Internal Error");
  };
});

module.exports = router;
