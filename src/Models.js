const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect(
  'mongodb+srv://phoenix:4wnb1tdmWZ24VPtC@phoenix-xdp1q.mongodb.net/test?retryWrites=true'
);

const linkSchema = new Schema({
  // TODO: Add Unique constraint
  longUri: String,
  shortUri: String,
});

const Link = mongoose.model('linkSchema', linkSchema);

module.exports = {
  Link: Link,
};
