const router = require('express').Router();
const { fetchTweets } = require('../twitter/fetchTweets');
const {
  adjectivesToWordFrequencies,
  nounsToWordFrequencies,
} = require('../twitter/parseTweets');
const { Tweet, Metadata } = require('../db/index');

// fetch adjective word frequency objects
router.get('/adjectives/:searchId', (req, res, next) => {
  console.log(req.params.searchId);
  Tweet.findAll({
    where: {
      search_id: Number(req.params.searchId),
    },
  })
    .then(tweets => adjectivesToWordFrequencies(tweets))
    .then(adj => res.send(adj))
    .catch(next);
});

// fetch noun word frequency objects
router.get('/nouns/:searchId', (req, res, next) => {
  Tweet.findAll({
    where: {
      search_id: Number(req.params.searchId),
    },
  })
    .then(tweets => nounsToWordFrequencies(tweets))
    .then(noun => res.send(noun))
    .catch(next);
});

router.post('/search', (req, res, next) => {
  Metadata.findAll()
    .then(metadata => metadata.map(search => search.search_id))
    .then(ids => { return ids.length ? Math.max(...ids) : 0 })
    .then(lastSearchId => fetchTweets(req.body.query, 500, lastSearchId)
      .then(search_id => res.send(`${search_id}`)));
})

router.get('/:query', (req, res, next) => {
  Tweet.findAll({
    where: {
      query: req.params.query,
    },
  }).then(tweets => res.send(tweets));
});

module.exports = router;
