const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
});

// Transform _id to id and remove __v when converting to JSON
postSchema.method('toJSON', function() {
  const { _id, __v, ...object } = this.toObject();
  object.id = _id.toString();
  return object;
});

module.exports = mongoose.model('Post', postSchema);
