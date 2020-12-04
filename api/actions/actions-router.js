// Write your "actions" router here!

const express = require('express');
const Actions = require('./actions-model');
const Projects = require('../projects/projects-model')

const router = express.Router();

//get all actions
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

//get actions by ID
router.get('/:id', validateActionId, (req, res) => {
    Actions.get(req.params.id)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(() => {
      res.status(500).json({
        error: "The action information could not be retrieved."
      })
    })
})

//post a new action and sends new action in res
router.post('/', validateActionContents, (req, res) => {
    Actions.insert(req.body)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(()=> {
            res.status(500).json({ 
                error: "There was an error while saving to the database" 
            });
        })
})

//Update an action by ID and sends updated action in res
router.put('/:id', validateActionId, validateActionContents, (req, res) => {
    Actions.update(req.params.id, req.body)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(() => {
            res.status(500).json({
                message: "The action could not be updated."
            })
        })

})

//Deletes an action and sends an empty res
router.delete('/:id', validateActionId, (req, res) => {
    Actions.remove(req.params.id)
        .then(() => {
            res.status(201).json({
                message: "Delete Success"
            })
        })
        .catch(() => {
            res.status(500).json({
                message: "The action could not be updated."
            })
        })

})

//Middlewares
function validateActionId(req, res, next) {
Actions.get(req.params.id)
    .then(action => {
    if (!action) {
        res.status(404).json({
        message: "The action with the specified ID does not exist."
        });
    }
    next()
    })
}

function validateActionContents(req, res, next) {
    if (!req.body.description || !req.body.notes) {
        res.status(400).json({
            errorMessage: "Please provide description and notes for the post."
        })
    } else if (!req.body.project_id) {
        res.status(400).json({
            errorMessage: "An action must be associated with a project."
        })
    } else if (req.body.description.length > 128) {
        res.status(400).json({
            errorMessage: "Description must be 128 characters or less."
        })
    } else {
        Projects.get(req.body.project_id)
            .then(project => {
                if (!project) {
                    res.status(404).json({
                        message: "The project with the specified ID does not exist."
                    });
                }
                next()
            })
    }
}

module.exports = router;
