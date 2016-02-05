var express = require("express");
var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/quoting_dojo');
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded());
var path = require("path");
app.use(express.static(__dirname + "/static"));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');



var QuoteSchema = new mongoose.Schema({
 name: String,
 quote: String,
 created_at : {type:Date, required:true, default:Date.now},
 upvotes: Number
})
mongoose.model('Quote', QuoteSchema); // We are setting this Schema in our Models as 'User'
var Quote = mongoose.model('Quote')




var io = require('socket.io').listen(server)

var server = app.listen(8000, function() {
  console.log("listening on port 8000");
})


app.get('/', function(req, res) {
 res.render('index');
})


app.get('/go', function(req, res) {
  Quote.find({}, function(err, quotes) {
    res.render('quotes', {quotes : quotes});
  }).sort({upvotes: -1});
})





app.post('/quotes', function(req, res) {
  console.log("POST DATA", req.body);

  var info = new Quote({name: req.body.name, quote: req.body.quote, upvotes: 0})

  info.save(function(err) {
    if(err) {
        console.log("something went wrong");
    } else {
        Quote.find({}, function(err, quotes) {
          res.redirect('go');
        })
    }

  })



})



app.get('/upvote/:id', function(req, res) {
  Quote.findOne({_id:req.params.id}, function(err, quote) {
    console.log(quote)
    quote.upvotes++
    console.log(quote);
    quote.save(function(err){
      if(err){
        console.log("err", err);
      } else {
        res.redirect('/go');
      }
    })
  })
})


app.get('/delete/:id', function(req, res) {
  Quote.remove({_id: req.params.id}, function() {
    res.redirect('/go');
  })

})




