module.exports = (app) => {
  const comments = require("../controllers/comment.controller.js");
  var router = require("express").Router();
  // Create a new Comment
  router.post("/", comments.create);
  // Retrieve all Comments
  router.get("/main", comments.findAllMainThreads);
  // Retrieve all Comments
  router.get("/sub", comments.findAllSubThreads);
  // Retrieve all Comments
  router.get("/findParentComment/:commentId", comments.findParentComment);
  // Retrieve a single Comment with id
  router.get("/:commentId", comments.findOne);
  // Update a Comment with id
  router.put("/:commentId", comments.update);
  // Delete a Comment with id
  router.delete("/:commentId", comments.delete);
  // Delete a Comment with id
  router.put("/delete/:commentId", comments.hide);

  app.use("/api/comment", router);
};
