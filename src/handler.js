const fs = require('fs');
const path = require('path');
const request = require('request');

function pubicPath(fileName) {
  return path.join(__dirname, '..', 'public', fileName);
}
function returnError(error, res) {
  res.writeHead(500, { 'Content-Type': 'text/html' });
  res.end('You\'ve fucked up');
}

const handlers = {
  indexHandler: (req, res) => {
    fs.readFile(pubicPath('index.html'),
      (error, file) => {
        if (error) {
          returnError(error, res);
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(file);
        }
      });
  },
  pubicHandler: (req, res) => {
    const extensionType = {
      html: 'text/html',
      css: 'text/css',
      js: 'application/javascript',
      json: 'application/json',
      jpg: 'image/jpg',
      ico: 'image/x-icon',
      png: 'image/png',
    };
    const ext = req.url.split('.')[1];
    fs.readFile(path.join(__dirname, '..', req.url),
      (error, file) => {
        if (error) {
          returnError(error, res);
        } else {
          res.writeHead(200, { 'Content-Type': `${extensionType[ext]}` });
          res.end(file);
        }
      });
  },
  queryHandler: (req, res) => {
    const query = req.url.split('?q=')[1].split('&')[0];
    const guardianApiKey = '7de6cbf7-40ff-4edd-9fe6-4d9b1b20a26b';
    const url = `https://content.guardianapis.com/search?q=${query}&show-fields=bodyText&api-key=${guardianApiKey}`;
    request(url, (error, response, body) => {
      console.log('Error: ', error);
      console.log('statusCode: ', response && response.statusCode);
      const parsedData = JSON.parse(body);
      console.log("Body: ", parsedData.response.results[0].fields.bodyText);
    });
  },
};

module.exports = handlers;
