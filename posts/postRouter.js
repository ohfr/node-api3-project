const express = require('express');

const router = express.Router();

const { validatePostId, validatePost } = require("../Middleware/validate");

const db = require("./postDb");

router.get('/', async (req, res) => {
  let post = await db.get();

  if (post) {
    res.json(post);
  } else {
    next("Internal Error");
  };

});

router.get('/:id',validatePostId(), async (req, res) => {
  res.json(req.post);
});

router.delete('/:id',validatePostId(), async (req, res) => {
  let deletedPost = await db.remove(req.params.id);

  if (deletedPost) {
    res.status(200).json(deletedPost);
  } else {
    next("Internal Error");
  };

});

router.put('/:id',validatePostId(), validatePost(), async (req, res) => {
  let updatedPost = await db.update(req.params.id, req.body);

  if (updatedPost) {
    res.status(200).json(updatedPost);
  } else {
    next("Internal Error");
  };
  
});

module.exports = router;
