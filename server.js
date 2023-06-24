var http = require("http");
var fs = require("fs");
var url = require("url");
var port = process.argv[2];

if (!port) {
  console.log("请指定端口号好不啦？\nnode server.js 8888 这样不会吗？");
  process.exit(1);
}

var server = http.createServer(function (request, response) {
  var parsedUrl = url.parse(request.url, true);
  var pathWithQuery = request.url;
  var queryString = "";
  if (pathWithQuery.indexOf("?") >= 0) {
    queryString = pathWithQuery.substring(pathWithQuery.indexOf("?"));
  }
  var path = parsedUrl.pathname;
  var query = parsedUrl.query;
  var method = request.method;

  /******** 从这里开始看，上面不要看 ************/

  console.log("有个傻子发请求过来啦！路径（带查询参数）为：" + pathWithQuery);

  response.statusCode = 200;
  let content;
  const dest = path === "/" ? "index.html" : path;
  const fileTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "javascript",
    ".png": "image/png",
    ".jpg": "image/jpeg",
  };
  try {
    response.setHeader(
      "Content-Type",
      `${
        fileTypes[dest.substring(dest.lastIndexOf("."))] || "html"
      };charset=utf-8`
    );
    content = fs.readFileSync(`./public/${dest}`);
    response.write(content);
  } catch (error) {
    // do nothing
    response.statusCode = 404;
    content = "nothing";
    response.write(content);
  }
  response.end();

  /******** 代码结束，下面不要看 ************/
});

server.listen(port);
console.log(
  "Listen " +
    port +
    " Success\nPlease use this link to preview http://localhost:" +
    port
);
