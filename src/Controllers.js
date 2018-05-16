const express = require('express');
const router = express.Router();
const { getLink, storeLink, hashUri, checkUri } = require('./Helpers');

router.get('/:shortUri', (req, res) => {
  // If link a path is defined i.e. it is a shortened url
  if (req.params.shortUri != undefined) {
    getLink(req.params.shortUri)
      .then(longUri => res.redirect(303, longUri))
      .catch(err => res.status(404).send(err));
  } else {
    res.sendStatus(404);
  }
});

// POST body:
// LongUri: [Strings]
router.post('/', async function(req, res) {
  // Properties of a const variable can be changed
  const responseObject = {
    Links: new Object(),
    Host: 'http://' + req.get('host') + '/',
  };
  // POST Body
  const formData = req.body;
  //Check if POST body contains required Parameters
  if (formData['longUri'] == undefined || formData['longUri'] == null) {
    res.sendStatus(404);
  } else {
    let Links = new Array();
    // Iterate over each Link to check if valid and store.
    for (longUri of formData['longUri']) {
      // Check validity by making a GET request to the link
      if (checkUri(longUri)) {
        // Push the Link to the response Links array
        link = await storeLink({
          shortUri: hashUri(longUri),
          longUri: longUri,
        });
        console.dir(link);
        Links.push(link);
      } else {
        // For invalid/unreachable Uri
        Links.push({ invalid: false });
      }
    }
    // Set Links array in responseObject
    responseObject.Links = Links;
    res.send(JSON.stringify(responseObject));
  }
});

module.exports = router;
