let total_current_order = 0;

// 以下は不要なら消す

// 数値を、桁数指定した文字列に整形する関数　の宣言　どう使うの？
Number.prototype.format = function(char, cnt){
  return (Array(cnt).fill(char).join("") + this.valueOf()).substr(-1*cnt); 
}

// メニューテーブル
//  singleMenu(json) = { "itemnum" : 0 , "itemname" : "dummyDrink" , "unitprice" : 0 };
let menuTable = [
  { "itemnum" : 1 , "itemname" : "coffee" , "unitprice" : 350 } ,
  { "itemnum" : 2 , "itemname" : "tea" , "unitprice" : 350 } ,
  { "itemnum" : 3 , "itemname" : "orange juice" , "unitprice" : 400 } ,
  { "itemnum" : 4 , "itemname" : "milk" , "unitprice" : 300 } ,
  { "itemnum" : 5 , "itemname" : "cola" , "unitprice" : 300 } ,
  { "itemnum" : 6 , "itemname" : "beer" , "unitprice" : 600 } ,
  { "itemnum" : 7 , "itemname" : "burger" , "unitprice" : 1000 } ,
  { "itemnum" : 8 , "itemname" : "pizza" , "unitprice" : 1200 } ,
  { "itemnum" : 9 , "itemname" : "pasta" , "unitprice" : 900 } ,
  { "itemnum" : 10 , "itemname" : "potato" , "unitprice" : 350 } 
];

// オーダー情報関連   
var orderNumber = 1; 
var hmn = null;               // ??order番号はアプリ起動時の時分秒（var hmn ）に下記番号を加味した9桁の番号とする
//var printcnt = 0;            // ???
//var printcnt00 = 0;      // ???
//var printcnt0 = 0;         // ???
//var printcnt1 = 0;         // ???
//var buttoncnt = 0;       // ???

// プリンタ情報　
let Grequesttype = "POST";
let printer_addr = "192.168.100.90";
let printer_url = "http://" + printer_addr + "/cgi-bin/epos/service.cgi?devid=local_printer&timeout=10000";

//let printer_port = 8008;
//let pollingInterval = 5000;
//let printerID = 'takeout_printer'; // 今回はtakeout_printerだけ 
//let printers = [ 'drink_printer' , 'kitchen_printer' , 'takeout_printer' ];

// for send loop
isSending = false;
SentCnt = 0;

// modelControllerからviewControllerへの通知手段
let eventNotify  = null;                   // viewConrollerへの通知用ファンクションに利用する

// 各コントローラのオブジェクトを生成する
var DC = new deviceController(Grequesttype, printer_url, true );
var MC = new modelController();
var VC = null;

let obj = null;





