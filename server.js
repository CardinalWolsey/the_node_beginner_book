var http = require('http');
var url = require('url');

// http.createServer(function(request, response) {
//   console.log('request received.')
//   response.writeHead(200, {"Content-Type": "text/plain"});
//   response.write('Hello World');
//   response.end();
// }).listen(8888);

function startServer(route, handle) {
  function onRequest(request, response) {
    // var postData = "";
    var pathname = url.parse(request.url).pathname;
    console.log('request for ' + pathname + ' received.');
    route(handle, pathname, response, request);
    // request.setEncoding('utf8');

    // request.addListener('data', function(postDataChunk) {
    //   postData += postDataChunk;
    //   console.log('recieved POST data chunk "' + postDataChunk + '".');
    // });

    // request.addListener('end', function() {
    //   route(handle, pathname, response, postData);
    // });

  }

  //   response.writeHead(200, {"content-Type": "text/plain"});
  //   var content = route(handle, pathname);
  //   response.write(content);
  //   response.end();
  // }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.startServer = startServer;
