const db = require("../models");
const Comments = db.comments;
const Op = db.Sequelize.Op;
// Create and Save a new Comment
exports.create = (req, res) => {
  // Validate request
  if (!req.body.desc) {
    res.status(400).send({
      message: "Comment can not be empty!",
    });
    return;
  }
  // Create a Tutorial
  const comment = {
    USER_ID: req.body.userId,
    USERNAME: req.body.username,
    PARENT_COMMENT_ID: req.body.commentId ? req.body.commentId : null,
    DESCRIPTION: req.body.desc,
    IS_DELETED: false,
    REF_COMMENT_STAGE_ID: req.body.stage ? req.body.stage + 1 : 1,
  };
  // Save Tutorial in the database
  Comments.create(comment)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error occurred while creating the Comment.",
      });
    });
};
// Retrieve all Comments from the database.
exports.findAllMainThreads = (req, res) => {
  var condition = { REF_COMMENT_STAGE_ID: 1, IS_DELETED: false };
  Comments.findAll({ where: condition, order: [["COMMENT_ID", "ASC"]] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Main Threads.",
      });
    });
};

exports.findAllSubThreads = (req, res) => {
  const commentId = req.query.commentId;
  var condition = commentId
    ? { PARENT_COMMENT_ID: commentId, IS_DELETED: false }
    : null;
  Comments.findAll({ where: condition, order: [["COMMENT_ID", "ASC"]] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Sub Threads.",
      });
    });
};

exports.findParentComment = (req, res) => {
  const parentCommentId = req.params.commentId;
  var condition = parentCommentId
    ? { COMMENT_ID: parentCommentId, IS_DELETED: false }
    : null;
  Comments.findOne({
    where: condition,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Parent Comment.",
      });
    });
};
// Find a single Comment with an id
exports.findOne = (req, res) => {
  const id = req.params.commentId;
  Comments.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Comment with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Comment with id=" + id,
      });
    });
};
// Update a Comment by the id in the request
exports.update = (req, res) => {
  const id = req.params.commentId;
  const comment = {
    USER_ID: req.body.userId,
    USERNAME: req.body.username,
    PARENT_COMMENT_ID: req.body.commentId ? req.body.commentId : null,
    DESCRIPTION: req.body.desc,
    IS_DELETED: false,
    REF_COMMENT_STAGE_ID: req.body.stage ? req.body.stage + 1 : 1,
  };
  Comments.update(comment, {
    where: { COMMENT_ID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Comment was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Comment with id=${id}. Comment was not found or no input was given!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Comment with id=" + id,
      });
    });
};
// Delete a Comment with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.commentId;
  Comments.destroy({
    where: { COMMENT_ID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Comment was deleted successfully!",
        });
      } else {
        res.send({
          message: `Comment ${id} not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Comment with id=" + id,
      });
    });
};

exports.hide = (req, res) => {
  const id = req.params.commentId;
  Comments.update(
    { IS_DELETED: true },
    {
      where: { COMMENT_ID: id },
    }
  )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Comment was deleted successfully!",
        });
      } else {
        res.send({
          message: `Comment ${id} not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Comment with id=" + id,
      });
    });
};
