var async = require('async');

var Category = require('../models/Category');

module.exports = function(app) {

  // get all Posts
  app.get('/api/categories', function (req, res) {
    // use mongoose to get all Posts in the database
    Category.find({}, 'name articles').lean().exec(function (err, Categories) {
      // if there is an error retrieving, send the error. nothing after res.send(err) will execute
      if (err)
        res.send(err)
      res.json(Categories); // return all Posts in JSON format
    });
  });

    //
  app.get('/api/categories/:category_id', function (req, res) {
     Category.findById(req.params.category_id)
            .populate('articles')
            .exec(function(error, articles) {
                res.send(articles);
            })
  });

  app.put('/api/categories/:category_id', function(req, res) {
    Category.findById(req.params.category_id, function(err, category) {
        if (err)
          res.send(err);

        category.name = req.body.name;

        category.save(function (err) {
          if (!err) {
            res.send(category);
          } else {
            console.log(err);
          } 
        });
      });
  });

  // create Category and send back all Posts after creation
  app.post('/api/categories', function(req, res) {
    console.log(req.body);

    // create a Category, information comes from AJAX request from Angular
    Category.create({
      name: req.body.name,
      done : false
    }, function(err, Category) {
      if (err)
        res.send(err);

      res.json(Category);
    });
  });

  // delete a Post
  app.delete('/api/categories/:id', function(req, res) {
    Category.remove({
      _id : req.params.id
    }, function(err, Category) {
      if (err)
        res.send(err);
      res.send(Category);
    });
  });
};
