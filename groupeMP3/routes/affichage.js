var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('affichage');
});

router.post('/', function(req, res, next) {
  res.send('Uploaded');
});

module.exports = router;
