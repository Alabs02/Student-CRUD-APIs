require("dotenv").config();

// MODULE ALIASES
require('module-alias/register');

const express = require("express");

const app = express();

const port = 3000;

// ROUTES
const studentRoutes = require('@src/student/student.routes');

// MIDDLEWARE
app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello world')
})

app.use('/api/v1/students', studentRoutes);

app.listen(port, () => {
  console.log(`App runnning at http://127.0.0.1:${port}`);
});