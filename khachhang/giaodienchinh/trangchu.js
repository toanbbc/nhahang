
var listfood = 'listfood';
var listcategory = 'listcategory';
var Listyeuthich = 'listyeuthich';
var objecttrangchu = {};
var trangchu = 'trangchu';
var userid = 1;
var k=20;

var category_and_food = function (io,socket,connection) {
 
    var sql_category = "SELECT * FROM category";
    var sql1_food = "SELECT * FROM food";
    var sql1_yeuthich = "SELECT * FROM yeuthich WHERE userid='%d'", userid;
    connection.query(sql_category, function (err, rs_category) {
        if (err) {
            throw err;
        }
        else {
            connection.query(sql1_food, function (err1, rs_food) {
                if (err1) {
                    throw err1;
                }
                else {
                    connection.query(sql1_yeuthich, function (err, rs_yeuthich) {
                        if (err) 
                        { throw err; }
                        else {
                            objecttrangchu[trangchu] = {
                                [listcategory]: rs_category,
                                [listfood]: rs_food,
                                [Listyeuthich]: rs_yeuthich
                            };
                       //    res.send(objecttrangchu);
                            io.sockets.emit("server_gui_trangchu",objecttrangchu);
                            console.log('đã gửi dữ liệu đến client');
                           
                        }
                    });

                }
            });

        }
    });


}
var category_and_food1 = function (connection,res) {
 
    var sql_category = "SELECT * FROM category";
    var sql1_food = "SELECT * FROM food";
    var sql1_yeuthich = "SELECT * FROM yeuthich WHERE userid='%d'", userid;
    connection.query(sql_category, function (err, rs_category) {
        if (err) {
            throw err;
        }
        else {
            connection.query(sql1_food, function (err1, rs_food) {
                if (err1) {
                    throw err1;
                }
                else {
                    connection.query(sql1_yeuthich, function (err, rs_yeuthich) {
                        if (err) 
                        { throw err; }
                        else {
                            objecttrangchu[trangchu] = {
                                [listcategory]: rs_category,
                                [listfood]: rs_food,
                                [Listyeuthich]: rs_yeuthich
                            };
                           res.send(objecttrangchu);
                            io.sockets.emit("server_gui_trangchu",objecttrangchu);
                            console.log('đã gửi dữ liệu đến client');
                           
                        }
                    });

                }
            });

        }
    });


}

//xuất function ở dạng module
//có 2 cách
//cách 1:
//module.exports.hienthifood = getlistfood;
//cách 2:cách này gọn hơn!!
module.exports = {
    category_and_food: category_and_food,
    category_and_food1: category_and_food1
}