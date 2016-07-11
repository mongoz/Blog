var Archive = require('../models/Archive');

module.exports = function(app) {

// get all Posts
  app.get('/api/archives', function (req, res) {
    // use mongoose to get all Posts in the database
    Archive.find({}, 'month year').lean().exec(function (err, archives) {
      // if there is an error retrieving, send the error. nothing after res.send(err) will execute
      if (err)
        res.send(err)
      res.json(archives); // return all Posts in JSON format
    });
  });

  app.get('/api/archives/:year/:month', function (req, res) {

     Archive.findOne({ 'year': req.params.year, 'month': req.params.month })
        .populate('articles')
        .exec(function(error, articles) {
          res.send(articles);
        })
  });
};
