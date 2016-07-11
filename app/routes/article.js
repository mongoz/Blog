var async = require('async');
var multer = require('multer');

var Archive = require('../models/Archive');
var Category = require('../models/Category');
var Article = require('../models/Article');

 var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, callback) {
            callback(null, './public/images/articleImages/')
        },
        filename: function (req, file, callback) {
            var datetimestamp = Date.now();
            callback(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
        }
    });
    var upload = multer({ //multer settings
                    storage: storage
                }).single('file');

module.exports = function(app) {

  app.post('/api/upload', function (req, res) {
        upload(req, res, function (err){
            if(err){
                res.json({ error_code: 1, err_desc: err});
                return;
            }
            res.json({ error_code: 0, err_desc:null, filename: req.file.filename});
        })
    });

  // get all Posts
  app.get('/api/articles', function (req, res) {
    // use mongoose to get all Posts in the database
    Article.find({}, 'title text comments image created_at').lean().populate('comments').exec(function (err, articles) {
      // if there is an error retrieving, send the error. nothing after res.send(err) will execute
      if (err)
        res.send(err)
      res.json(articles); // return all Posts in JSON format
    });
  });

    // get one Posts
  app.get('/api/articles/:article_id', function (req, res) {
     Article.findById(req.params.article_id, function (err, article) {
        if (err)
          res.send(err);
        res.json(article);
      });
  });

  app.put('/api/articles/:article_id', function (req, res) {
    Article.findById(req.params.article_id, function (err, article) {
        if (err)
          res.send(err);

        article.title = req.body.title;
        article.text = req.body.text;
        article.image = req.body.image;
        article.categories = req.body.categories;

        article.save(function (err) {
          if (!err) {
            res.send(article);
          } else {
            console.log(err);
          } 
        });
      });
  });

  // create Post and send back all Posts after creation
  app.post('/api/articles', function (req, res) {

    // create a Post, information comes from AJAX request from Angular
    Article.create({
      title: req.body.title,
      text : req.body.text,
      image: req.body.image,
      categories: req.body.categories,
      done : false
    }, function(err, Article) {
      if (err)
        res.send(err);
      else {
        async.map(req.body.categories, function (key, next) {
          Category.findByIdAndUpdate(
            key,
            {$push: {"articles": Article._id}},
            {safe: true, new : true}, 
            function (err, category) {
              next(err, category);
            }
          );
        },
        function (err, result) {
          res.send("done");
        });
      }
    });
  });

  // delete a Post
  app.delete('/api/articles/:id', function (req, res) {
    Article.findById(req.params.id, function (err, article) {
      if (err)
        res.send(err);
      else {
        article.remove();
        res.json(article);
      }
    });
  });


  app.put('/api/articles/:id/comments', function (req, res) {
    var comment = {'username': req.body.name, 'email': req.body.email, 'text': req.body.text};
    Article.findByIdAndUpdate(req.body._id,
      {$push:{"comments": comment}},
      {save: true, new: true},
      function (err, comment) {
        if (err) {
           res.send(err);
        };
      }
    );
  });
};
