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

const htmlRoutes = require('./routes/html-routes.js');
const apiRoutes = require('./routes/api-routes.js');

htmlRoutes(app);
apiRoutes(app);

db.sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log(`Server listening on: http://localhost:${PORT}`));
});
