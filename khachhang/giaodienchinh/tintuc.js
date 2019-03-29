

var tintuc='tintuc';
var objectintuc={}
var mangtintuc = [];
let mangtrang = [];
var vnexpress = 'https://vnexpress.net/rss/giai-tri.rss';
var dantri = 'https://dantri.com.vn/suc-khoe.rss';
var vietnamnet = 'https://vietnamnet.vn/rss/phap-luat.rss';
var hai4h = 'https://www.24h.com.vn/upload/rss/amthuc.rss';
mangtrang.push(vnexpress);
mangtrang.push(dantri);
mangtrang.push(vietnamnet);
mangtrang.push(hai4h);



var danhsachtintuc = function (parser, io, socket) {
    mangtintuc = new mangtintuc;
    (async () => {
        for (let key in mangtrang) {
            let value = mangtrang[key]; //key là phần tử của mảng
            let feed = await parser.parseURL(value);
            // console.log(feed.items);

            feed.items.forEach(item => {
                mangtintuc.push(item);

                //  console.log(item.title + ':' + item.link)
            });
        }
        
        io.sockets.emit("server_gui_tintuc", mangtintuc)
    })();
}
var danhsachtintuc1 =async  function (parser, res) {
  

    // (async () => {
         for (let key in mangtrang) {
             let value = mangtrang[key]; //key là phần tử của mảng
             let feed = await parser.parseURL(value);
             // console.log(feed.items);

             feed.items.forEach(item => {
                 mangtintuc.push(item);
             });
         }
        objectintuc={[tintuc]:mangtintuc};
         res.send(objectintuc);
   //  })();
 }



//xuất function ở dạng module
//có 2 cách
//cách 1:
//module.exports.hienthifood = getlistfood;
//cách 2:cách này gọn hơn!!
module.exports = {
    danhsachtintuc: danhsachtintuc,
    danhsachtintuc1:danhsachtintuc1
}