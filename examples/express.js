console.log(
  "If module not found, install express globally `npm i express -g`!"
);
var port =
  process.env.OPENSHIFT_NODEJS_PORT ||
  process.env.VCAP_APP_PORT ||
  process.env.PORT ||
  process.argv[2] ||
  8765;
var express = require("express");
var Gun = require("..");
require("../axe");

var app = express();
var http = require("http").createServer(app);
var cors = require("cors");

app.use(Gun.serve);
app.use(express.static(__dirname));
app.use(cors());

var server = http.listen(port);
var gun = Gun({ file: "data", web: server });

global.Gun = Gun; /// make global to `node --inspect` - debug only
global.gun = gun; /// make global to `node --inspect` - debug only

console.log("Server started on port " + port + " with /gun");
