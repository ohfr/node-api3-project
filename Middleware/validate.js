const db = require("../users/userDb");

const postDb = require("../posts/postDb");

const validateUserId = () => {
    return async (req, res, next) => {
      let user = await db.getById(req.params.id);
      
      if(user) {
        req.user = user;
        next();
      } else {
        return res.status(404).json({message: "invalid user ID"});
      };
    };
  };
  
  const  validateUser = () => {
    return async (req, res, next) => {
      if (!req.body) {
        return res.status(400).json({message: "missing user data"});
      };
      if (!req.body.name) {
        return res.status(400).json({message: "missing required name field"});
      };
      next();
      } ;
  };
  
  const validatePost = () => {
      return async (req, res, next) => {
      if (!req.body) {
        return res.status(400).json({message: "missing post data"})
      };
      if (!req.body.text) {
        return res.status(400).json({message: "missing required text field"})
      };
      next();
    };
  };

  
const validatePostId = () =>{
    return async (req, res, next) => {
      let post = await postDb.getById(req.params.id);
  
      if (post) {
        req.post = post;
        next();
      } else {
        return res.status(404).json({message: "No post with specified ID"})
      }
    }
  }

module.exports = {
    validatePost,
    validateUser,
    validateUserId,
    validatePostId
}