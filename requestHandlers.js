var querystring = require('querystring');
var fs = require('fs');
var formidable = require('formidable');

// var exec = require('child_process').exec;

function start(response) {
  console.log('request handler named start was called.');
  // var content = 'empty';

  // exec('ls -lah', function (error, stdout, stderr) {
  // });

  var body = '<!DOCTYPE html>'+
    '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="file" name="upload" multiple="multiple">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';
  // return content;


    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(body);
    response.end();
    // content = stdout;

}

  // function sleep(milliSeconds) {
  //   var startTime = new Date().getTime();
  //   while (new Date().getTime() < startTime + milliSeconds);
  // }

  // sleep(1000);
  // return 'hello start';



function upload(response, request) {
  console.log('request handler named upload was called');


  // return 'hello upload';
  // }
  var form = new formidable.IncomingForm();
  console.log("about to parse");
  form.parse(request, function(error, fields, files) {
    console.log("parsing done");
    debugger;
    fs.rename(files.upload.path, __dirname + "/tmp/test.png", function(error) {
    if (error) {
      fs.unlink(__dirname + "/tmp/test.png");
      fs.rename(files.upload.path, __dirname + "/tmp/test.png");
    }
  });
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write("received image:<br/>");
  response.write("<img src='/show' />");
  response.end();
  });
}

function show(response) {
  console.log('request handler named show was called.');
  response.writeHead(200, {"Content-Type": "image/png"});
  fs.createReadStream(__dirname + "/tmp/test.png").pipe(response);
}

exports.start = start;
exports.upload = upload;
exports.show = show;
