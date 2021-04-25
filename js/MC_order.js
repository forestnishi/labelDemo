class modelController {
	
    constructor() {
        
        // create modelController
        var startdate = new Date();

        // 時分秒を２けたで表す時間文字列　ここでは使わない気がする
        hmn = (startdate.getHours()).format("0",2) + (startdate.getMinutes()).format("0",2)+(startdate.getSeconds()).format("0",2); 

        // create single order array   define structure of an order information
        this.singleOrder = { ordernum: 0 , job: '0' , ordertime: '0', status: 0 , result: "" , finishtime: '0' };

        // create order array to store all order information  
        this.arrOrder = [];

        // create sendOrderInfo array time(timeObject)
        this.sendOrderInfo = { starttime: 0 , totalnum: 0 , currentJob: 0, lastsendtime: 0 };

    }


    entryOrder() {
        
        let currentdate = new Date();
        let ordernum = hmn + orderNumber.format("0",2);
        let ordertime =  (currentdate.getHours()).format("0",2)+ "時" +(currentdate.getMinutes()).format("0",2)+ "分" +(currentdate.getSeconds()).format("0",2)+ "秒";
        orderNumber++;   

        // entry random order  
        let newOrderMC = { 
            'ordernum' : ordernum ,
            'job' : "ord_" + ordernum ,
            'ordertime' : ordertime ,
            'status' : "",
            'result' : "",
            'finishtime' : "",
            'item' : "juice",
            "size" : "short", 
            "num" : 1       // 今回はデモなので数量は常に１にしておく
        };

        this.arrOrder.push( newOrderMC );
        // 印刷データを生成する
        const printdata = this.createPrintData();

        // 印刷指示を行う
        var id = setTimeout( function(){ 
                        DC.sendJob( printdata,  function () { 
                            // 印刷完了をVCに伝える
                            eventNotify( "printCompletion" , 0, "#" + newOrderMC['job'] );
                        });
                      }
                    , 1000 );

        return newOrderMC;
    }


    updateOrder(response, statusText, resultText) {
      
        var finishedDate = new Date();
          
        if( isSending ) {
            this.arrOrder[SentCnt]['status'] = response['status'] + statusText;
            this.arrOrder[SentCnt]['result'] = resultText
        }

        else if( resultText == "印刷完了" || resultText == "印刷失敗" ) {
        
            for( var i = 0; i < MC.arrOrder.length; i++ ) {

                if( MC.arrOrder[i]['job'] == response['printjobid'] ) {
                  
                    MC.arrOrder[i]['status'] = response['status'] + statusText;
                    MC.arrOrder[i]['result'] = resultText;
                    this.arrOrder[i]['finishtime'] = finishedDate.getHours()+'時'+ finishedDate.getMinutes()+'分'+finishedDate.getSeconds()+'秒';
                }
            }
            notice0( "updateGrid", "" );

        }     
    }

    removeOrder( job ) {

        // arrOrderをループしながら所定のオーダー番号のオーダーを削除する
        const targetOrderIndex = this.arrOrder.findIndex((v) => v["job"] === job);
        if( -1 < targetOrderIndex ) {
            this.arrOrder.splice( targetOrderIndex, 1 );
            return 0;
        }
        // 対象のオーダーが配列に無かった場合
        else return -1;

    }

    createPrintData() {
      // 印刷データを雛形を整形して作る
      return '<?xml version="1.0" encoding="utf-8"?><s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Header><parameter xmlns="http://www.epson-pos.com/schemas/2011/03/epos-print"></parameter></s:Header><s:Body><epos-print xmlns="http://www.epson-pos.com/schemas/2011/03/epos-print"><text>Hello, World!&#10;</text><cut /></epos-print></s:Body></s:Envelope>';
    }

    
}
