const handlers = require('./handler.js');

const router = (req, res) => {
  const reqUrl = req.url;
  if (reqUrl === '/') {
    handlers.indexHandler(req, res);
  } else if (reqUrl.indexOf('/public/') !== -1) {
    // handlers.pubicHandler(req, res);
  } else if (reqUrl.indexOf('/?q=') !== -1) {
    // handlers.queryHandler(req, res);
  }
};

module.exports = router;
