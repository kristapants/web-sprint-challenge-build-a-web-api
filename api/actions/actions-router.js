// Write your "actions" router here!

const express = require('express');
const Actions = require('./actions-model');

const router = express.Router();

router.get('/', (req, res) => {
    Actions.get()
      .then(actions => {
        res.status(200).json(actions);
      })
      .catch(() => {
        res.status(500).json({
          error: "oogabooga"
        });
      });
  });

module.exports = router;