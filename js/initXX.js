// 数値を桁数指定された文字列化する関数宣言
Number.prototype.format = function(char, cnt){
  return (Array(cnt).fill(char).join("") + this.valueOf()).substr(-1*cnt); 
}

//// local_printer スプールプリンタを指定すること
var printerID = 'drink_printer';
var printers = [ 'drink_printer' , 'kitchen_printer' ];
var printer_addr = "192.168.100.168";
var printer_port = 8008;
var pollingInterval = 5000;
var notice0 = null;                   // viewConrollerへの通知用ファンクションに利用する
var obj = null;
//order番号はアプリ起動時の時分秒（var hmn ）に下記番号を加味した9桁の番号とする
var orderNumber = 1;// 001の意味
var hmn = null;               //???
var printcnt = 0;            //???
var printcnt00 = 0;      //???
var printcnt0 = 0;         //???
var printcnt1 = 0;         //???
var buttoncnt = 0;       //???

// for send loop
isSending = false;
SentCnt = 0;

var DC = new deviceController(printer_addr,printer_port, printers);
var MC = new modelController();
var VC = null;





