var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategoryModel = require('mongoose').model('Category');
var ArchiveModel = require('mongoose').model('Archive');
var CommentSchema = require('./Comment');

// create a schema
var ArticleSchema = new Schema({
 	title: { type: String, required: true, trim: true },
  image: String,
  released: String,
  categories : [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  text: String,
  comments: [CommentSchema],
  created_at: Date,
  updated_at: Date
});

// on every save, add the date
ArticleSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();

  var month = currentDate.getUTCMonth() + 1;
  var year = currentDate.getUTCFullYear();

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  ArchiveModel.findOneAndUpdate(
    {month: month, year: year},
    {$push: {articles: this._id}},
    {upsert: true, new: true}, 
    function(err,obj) {
      if(err){
        console.log("error: " + err);
      }
  });

  next();
});

ArticleSchema.pre('remove', function(next) {

  CategoryModel.update(
    {_id: {$in: this.categories}}, 
    {$pull: {articles: this._id}}, 
    {multi: true},
    next
  );
});

ArticleSchema.pre('remove', function(next) {
  var month = this.created_at.getUTCMonth() + 1;
  var year = this.created_at.getUTCFullYear();

  ArchiveModel.update(
    {month: month, year: year },
    {$pull: {articles: this._id}},
    next
  );
});

// the schema is useless so far
// we need to create a model using it
var Article = mongoose.model('Article', ArticleSchema);

// make this available to our users in our Node applications
module.exports = Article;
