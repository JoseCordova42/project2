const db = require('../models');

module.exports = (app) => {
    // app.get('/api/posts', (req, res) => {
    //     db.Posts.findAll({}).then((result) => res.json(result));
    // });

    app.post('/api/posts', (req, res) => {
        console.log(req.body, '...api-routes.js:5');
        console.log(req.body.state, '...api-routes.js:6');
        console.log(req.body.deed, '...api-routes.js:7');
        db.Posts.create({
            state: req.body.state,
            deed: req.body.deed,
            completed: false,
        }).then((dbPost) => res.json(dbPost));
    });
};