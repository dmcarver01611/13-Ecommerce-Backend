const express = require('express');
const sequelize = require('./config/connection.js');
const routes = require('./routes');

// Connect to Sequelize
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(routes);

// Sequelize models, turn on server
sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => {
		console.log(`App listening on port ${PORT}!`);
	});
});
