// here we load the Quote model that we created on the server.js page
var mongoose = require('mongoose');
var Quote = mongoose.model('Quote');

var quotes = require('../controllers/quotes.js');
module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('index')
  })
  app.post('/quotes', function(req,res){
    quotes.create(req, res)
  })
  app.get('/main', function (req, res) {
    quotes.show(req, res)
  })
}
