var express = require('express'),
  // DONE: require in our request proxy module
  requestProxy = require('express-request-proxy'),
  port = process.env.PORT || 3000,
  app = express();

// DONE: now use our proxy within a function to request
//        our github data on the server.

function proxyGitHub(request, response) {
  console.log('Routing Github request for', request.params[0]);
  (requestProxy({
    url: 'https://api.github.com/' + request.params[0],
    header: process.env.GITHUBTOKEN
  }))(request, response);
};

app.get('/github/*', proxyGitHub);

app.use(express.static('./'));

app.get('*', function(request, response) {
  console.log('New request:', request.url);
  response.sendFile('index.html', { root: '.' });
});

app.listen(port, function() {
  console.log('Server started on port ' + port + '!');
});
