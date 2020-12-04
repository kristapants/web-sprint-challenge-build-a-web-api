// Write your "projects" router here!

const express = require('express');
const Projects = require('./projects-model');
const Actions = require('../actions/actions-model')

const router = express.Router();

//get all projects
router.get('/', (req, res) => {
    Projects.get()
      .then(projects => {
        res.status(200).json(projects);
      })
      .catch(() => {
        res.status(500).json({
          error: "Unable to complete request"
        });
      });
});

//get all projects by id
router.get('/:id', validateProjectId, (req, res) => {
    Projects.get(req.params.id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(() => {
      res.status(500).json({
        error: "The project information could not be retrieved."
      })
    })
})

//Post a newly created project
router.post('/', validateProjectContents, (req, res) => {
    Projects.insert(req.body)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(()=> {
            res.status(500).json({ 
                error: "There was an error while saving to the database" 
            });
        })
})
//update an existing project

//delete a project

//get all actions associated with a project


//Middleware
function validateProjectId(req, res, next) {
    Projects.get(req.params.id)
        .then(project => {
            if (!project) {
                res.status(404).json({
                    message: "The project with the specified ID does not exist."
                });
            }
            next()
        })
}

function validateProjectContents(req, res, next) {
    if (!req.body.description || !req.body.name) {
        res.status(404).json({
            errorMessage: "Please provide description and name for the project."
        })
    }
    next()
}

module.exports = router;
