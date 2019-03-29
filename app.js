var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
var fs = require("fs");
server.listen(process.env.PORT || 3000);
var list_use = [];


//phần mysql
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "toan19981805",
  database: "nhahang"
});

//phần modul
var modul = require('./modul');
var modul_trangchu = require('./khachhang/giaodienchinh/trangchu');
var modul_tintuc = require('./khachhang/giaodienchinh/tintuc');
var modul_video = require('./khachhang/giaodienchinh/video');

// khai báo của modul tin tức (rss reader)
let Parser = require('rss-parser');
let parser = new Parser();
//khai báo của  modul video (json from url)
var request = require("request");

app.listen(4000, function () {
  console.log('Node server running @ http://localhost:4000')
});




//phần này để gửi lên web
app.get('/chaocutoandi/hihi.html', function (req, res) {

  modul_tintuc.danhsachtintuc1(parser,res);
});


//phần socket
io.sockets.on('connection', function (socket) {
  console.log("Có người vừa kết nối!");

  socket.on('client_lay_trangchu', function () {
    modul_trangchu.category_and_food(io, socket, connection);
  });
  socket.on('client_lay_tintuc', function () {
    modul_tintuc.danhsachtintuc(parser, io, socket);
  });
  socket.on('client_lay_danhsachvideo_of_channel', function () {
    modul_video.danhsanhvideo_of_channel(request, io, socket);
  });

});