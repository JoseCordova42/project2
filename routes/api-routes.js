const db = require('../models');


module.exports = (app) => {

    app.get('/api/posts', (req, res) => {
        db.Posts.findAll({}).then((result) => res.json(result));
    });

    app.post('/api/posts', (req, res) => {
        console.log(req.body, '...api-routes.js:11');
        console.log(req.body.state, '...api-routes.js:12');
        console.log(req.body.deed, '...api-routes.js:13');
        db.Posts.create({
            state: req.body.state,
            deed: req.body.deed,
            completed: false,
        }).then((dbPost) => res.json(dbPost));

    });

    app.put('/api/posts', (req, res) => {
        console.log(req.body.completed, '...api-routes.js:23');
        console.log(req.body.id, '...api-routes.js:24');
        db.Posts.update(
            {
                completed: req.body.completed,
            },
            {
                where: {
                    id: req.body.id,
                },
            }
        ).then((dbPost) => res.json(dbPost));
    });

    app.get('/graph', (req, res) => {
        db.Posts.findAndCountAll({
            where:{
                completed: true
            }
        }).then((result) => res.json(result));
        
        
    });



};