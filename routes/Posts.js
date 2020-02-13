const express = require("express");

const router = express.Router();

const db = require("../data/db.js");

// router.use(express.json());

router.post("/", (req, res) => {
  const data = req.body;
  // console.log(data);

  if (!data.title || !data.contents) {
    res.status(400).json(error);
  } else {
    db.insert(data)
      .then(datas => {
        res.status(201).json(datas);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          error: "error"
        });
      });
  }
});

// comments

router.post("/:id/comments", (req, res) => {
  const { id } = req.params;
  const info = { ...req.body, post_id: id };

  if (id) {
    // find post
    db.findById(id)
      .then(post => {
        // added comment
        db.insertComment(info)
          .then(comment => {
            res.status(201).json(comment);
          })
          // dont added a comment
          .catch(error => {
            console.log(error);
            console.log(info);
            res.status(500).json({ error: "error" });
          });
      })
      // cant find post
      .catch(error => {
        res.status(404).json({ message: "id not found" });
      });
  }
});

// Array or Objects

router.get("/", (req, res) => {
  db.find()
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      console.log("error", error);
      res.status(500).json({
        error: "error"
      });
    });
});

// post

router.get("/:id", (req, res) => {
  const id = req.params.id;

  db.findById(id)
    .then(post => {
      if (post.length !== 0) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ error: "error" });
      }
    })
    .catch(error => {
      console.log("error", error);
      res.status(500).json({
        error: "error"
      });
    });
});

router.get("/:id/comments", (req, res) => {
  const id = req.params.id;

  db.findPostComments(id)
    .then(comments => {
      if (comments.length !== 0) {
        res.status(200).json(comments);
      } else {
        res.status(404).json({ error: "error" });
      }
    })
    .catch(error => {
      console.log("error", error);
      res.status(500).json({
        error: "error"
      });
    });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const data = req.body;
  console.log(id, data);
  if (!data.title || !data.contents) {
    res.status(400).json({ error: "error" });
  } else {
    db.update(id, data)
      .then(datas => {
        if (datas) {
          res.status(200).json(data);
        } else {
          console.log(datas);
          res.status(404).json({ error: "error" });
        }
      })
      .catch(error => {
        console.log("error", error);
        res.status(500).json({
          error: "error"
        });
      });
  }
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  db.remove(id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ error: "error" });
      }
    })
    .catch(error => {
      console.log("error", error);
      res.status(500).json({
        error: "error"
      });
    });
});

module.exports = router;
