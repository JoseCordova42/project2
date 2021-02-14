const express = require('express');

const PORT = process.env.PORT || 8080;

const app = express();

const db = require('./models');

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

const routes = require('./controllers/deeds_controller');

app.use(routes);



db.sequelize.sync().then(() => {
    app.listen(PORT, () =>
    console.log(`Server listening on: http://localhost:${PORT}`)
    );
});
