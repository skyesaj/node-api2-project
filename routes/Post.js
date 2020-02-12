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
  const info = req.body;
  if (!info.text) {
    res.status(400).json({ error: "error" });
  } else {
    db.insertComment(info)
      .then(comment => {
        if (comment) {
          res.status(201).json(comment);
        } else {
          res.status(404).json({ error: "error" });
        }
      })
      .catch(error => {
        console.log("error on comments", error);
        res.status(500).json({ error: "error" });
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
        res.status(200).json(comment);
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
