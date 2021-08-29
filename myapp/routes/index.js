const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');


const router = express.Router();


/* GET home page. */
router.get('/', isNotLoggedIn, function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/success',isLoggedIn, function(req, res, next) {
  res.render('success', { title: 'Express' });
});

router.get('/session', isLoggedIn, function(req, res, next) {
  res.render('session', { title: 'Express' });
});

module.exports = router;
