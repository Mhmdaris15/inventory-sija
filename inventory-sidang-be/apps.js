require('dotenv/config');
// DEFINING STUFF
const express = require('express');
const app = express();
const port = process.env.PORT;
const cors = require('cors');
const error = require('./middlewares/errorHandler');
const route = require('./routes/index');
const { sequelize } = require('./models');

// USE MIDDLEWARES
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(route);

app.use(error);

app.listen(port, async () => {
    console.log(`Server running at port ${port}`);
    await sequelize.authenticate();
    console.log(`Successfully Conntected to the Database !`);
})