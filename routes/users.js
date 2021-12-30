var express = require('express');
var usersRouter = express.Router();

/* GET users listing. */
usersRouter.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = usersRouter;

// Structured Query Lang-  relational db
// NoSql db - key-value, column-family based, graph based, document based(MongoDB)
// mondo handle large datR