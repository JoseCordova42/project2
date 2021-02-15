const db = require('../models');


module.exports = (app) => {
  // GET route for getting all of the deeds (THIS WILL BE THE DEEDS AVAILIBLE TABLE)
  app.get('/', (req, res) => {
    db.Deeds.findAll({}).then((dbDeeds) => res.json(dbDeeds));
    });
  

  // POST route for saving a new deed (THIS WILL TAKE IN THE USER INPUT FROM "GOOD IDEA: " & "SELECT STATE")
  app.post('/', (req, res) => {
    console.log(req.params);
    db.Deeds.create({
      state: req.params.state,
      deed: req.params.deed,
      completed: req.params.completed,
    }).then((dbDeeds) => res.json(dbDeeds));
  });

  // PUT route for updating Deeds (THIS WILL UPDATE A DEED FROM COMPLETED: "FALSE" TO COMPLETED: "TRUE" IN THE DATABASE)
  app.put('/', (req, res) => {
    db.Deeds.update(req.params, {
      where: {
        completed: req.params.completed,
      },
    }).then((dbDeeds) => res.json(dbDeeds));
  });
};
