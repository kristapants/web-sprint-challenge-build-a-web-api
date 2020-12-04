// Write your "projects" router here!

const express = require('express');
const Projects = require('./projects-model');

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
router.put('/:id', validateProjectId, validateProjectContents, (req, res) => {
    Projects.update(req.params.id, req.body)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(() => {
            res.status(500).json({
                message: "The project could not be updated."
            })
        })

})


//delete a project

router.delete('/:id', validateProjectId, (req, res) => {
    Projects.remove(req.params.id)
        .then(() => {
            res.status(201).json({
                message: "Delete Success"
            })
        })
        .catch(() => {
            res.status(500).json({
                message: "The project could not be updated."
            })
        })

})

//get all actions associated with a project

router.get('/:id/actions', validateProjectId, (req, res) => {
    Projects.getProjectActions(req.params.id)
        .then(actions => {
            res.status(201).json(actions)
        })
        .catch(() => {
            res.status(500).json({
                message: "Could not be completed"
            })
        })

})


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
