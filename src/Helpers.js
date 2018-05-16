const sh = require('shorthash');
var memory = {};

const LinkModel = require('./Models').Link;

function storeLink(link) {
  let newLink = new LinkModel({
    shortUri: link.shortUri,
    longUri: link.longUri,
  });
  return new Promise((resolve, reject) => {
    newLink.save((err, data) => {
      if (err) reject(err.message);
      else {
        data = data.toJSON();
        resolve({
          longUri: data.longUri,
          shortUri: data.shortUri,
        });
      }
    });
  });
  // memory[link.shortUri] = link.longUri;
  // return link;
}
function getLink(shortUri) {
  return new Promise((resolve, reject) => {
    LinkModel.findOne({ shortUri: shortUri }, (err, Link) => {
      if (err) reject(err.message);
      else {
        resolve(Link.longUri);
      }
    });
  });
}

function checkUri(uri) {
  return true;
}

function hashUri(uri) {
  return sh.unique(uri);
}

module.exports = {
  getLink,
  storeLink,
  hashUri,
  checkUri,
};
