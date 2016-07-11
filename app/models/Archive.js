var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var ArchiveSchema = new Schema({
	month: Number,
	year: Number,
	articles : [{ type: Schema.Types.ObjectId, ref: 'Article' }]
});

// the schema is useless so far
// we need to create a model using it
var Archive = mongoose.model('Archive', ArchiveSchema);

// make this available to our users in our Node applications
module.exports = Archive;
