var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var CategorySchema = new Schema({
	name: { type: String, required: true, trim: true },
	articles : [{ type: Schema.Types.ObjectId, ref: 'Article' }]
});

// the schema is useless so far
// we need to create a model using it
var Category = mongoose.model('Category', CategorySchema);

// make this available to our users in our Node applications
module.exports = Category;
