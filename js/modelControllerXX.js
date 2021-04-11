class modelController {
	
  constructor() {
	  
    //create modelController
    var startdate = new Date();
    hmn = (startdate.getHours()).format("0",2) + (startdate.getMinutes()).format("0",2)+(startdate.getSeconds()).format("0",2); 

    //create single order array  
    this.singleOrder = { ordernum: 0 , job: '0' , ordertime: '0', status: 0 , result: "" , finishtime: '0' };
    this.arrOrder = [];
    
    //create sendOrderInfo array time(timeObject)
    this.sendOrderInfo = { starttime: 0 , totalnum: 0 , currentJob: 0, lastsendtime: 0 };
    
  }


  entryOrder() {
	  
    //buttoncnt++;
    var currentdate = new Date();
    var ordernum = hmn + orderNumber.format("0",2);
    var ordertime =  (currentdate.getHours()).format("0",2)+ "時" +(currentdate.getMinutes()).format("0",2)+ "分" +(currentdate.getSeconds()).format("0",2)+ "秒";
    orderNumber++;   

    var PrintData = this.createPrintData("drink", ordernum );
    
    //drink と　kitchen の２つのオーダーを発生させる
    this.arrOrder.push( { 'ordernum' : ordernum ,
       'job' : "drink----" + ordernum ,
       'ordertime' : ordertime ,
       'status' : "",
       'result' : "",
       'finishtime' : "",
       'printdata' : PrintData }
    );
    
    PrintData = this.createPrintData("kitchen", ordernum );
    
    this.arrOrder.push( { 'ordernum' : ordernum ,
       'job' : "kitchen-" + ordernum ,
       'ordertime' : ordertime ,
       'status' : "",
       'result' : "",
       'finishtime' : "",
       'printdata' : PrintData }
    );

   //DC.printDataを一回だけよぶ 
   //DC.currentPrintingJob = "drink----" + ordernum;
   isSending = true;
   SentCnt = 0;
   //MC.sendOrderInfo['starttime'] = new Date();
   //MC.sendOrderInfo['totalnum'] = arrOrder.length + 2;
   //MC.sendOrderInfo['currentJob'] = "";
   //MC.sendOrderInfo['lastsendtime'] = null;
   DC.sendJob();
   //DC.printData( PrintData, "drink----" + ordernum, "drink_printer" );

   //DC.printData( PrintData, "kitchen-" + ordernum, "kitchen_printer" );
  }


  createPrintData(printername , ordernum ) {
    var TableRandom = Math.floor( Math.random() * 10 + 0.9); 
    var PersonRandom = Math.floor( Math.random() * 10 + 0.9);
    var item;
    //ordernum = printername + "_" + ordernum;
    if( printername == "drink" ) {
        printername = "drink_printer";
        item = "ドリンク";
    }
    if( printername == "kitchen" ) {
        printername = "kitchen_printer";
        item = "フード";
    }

    if( DC.printers[printername] != null ) {

            var TableRandom = Math.floor( Math.random() * 10 + 0.9); 
    var PersonRandom = Math.floor( Math.random() * 10 + 0.9);
    var item;
    var NumRandom1 = Math.floor( Math.random() * 10 + 0.9);
    var NumRandom2 = Math.floor( Math.random() * 10 + 0.9);
    var NumRandom3 = Math.floor( Math.random() * 10 + 0.9);
    
    
    if( printername == "drink" ) {
        printername = "drink_printer";
        item = "ドリンク";

    }
    if( printername == "kitchen" ) {
        printername = "kitchen_printer";
        item = "フード";
    }

    //if( DC.printers[printername] != null ) {
    DC.printers[printername].addSound(DC.printers[printername].PATTERN_A, 1);
            DC.printers[printername].addTextLang('ja');
			DC.printers[printername].addTextRotate(true);
			DC.printers[printername].addCut(DC.printers[printername].CUT_RESERVE);
			//DC.printers[printername].addFeedUnit(112);
			
			DC.printers[printername].addTextDouble(false, false);
                        DC.printers[printername].addText( ordernum + '1  ' );
			DC.printers[printername].addText( PersonRandom );
			DC.printers[printername].addText('名 ');
			DC.printers[printername].addText('担当：片山 ');
			var jikan= new Date();
			DC.printers[printername].addText('  時刻:' + jikan.getHours()+"時" + jikan.getMinutes() + "分" + jikan.getSeconds() + "秒" + '\n');
			DC.printers[printername].addTextStyle(false, false, false, DC.printers[printername].COLOR_1);
			
			DC.printers[printername].addTextDouble(true, true);
			DC.printers[printername].addText('　' + NumRandom1 + '　　　　　');
            DC.printers[printername].addText(item + "1");
			DC.printers[printername].addText('\n');
            DC.printers[printername].addFeedUnit(8);	
            
            DC.printers[printername].addTextDouble(false,false);
            DC.printers[printername].addText('調理単品　');
			DC.printers[printername].addTextStyle(false, false, false, DC.printers[printername].COLOR_1);
			DC.printers[printername].addText('【新　規】　　　　　');
			DC.printers[printername].addTextDouble(true, true);
			DC.printers[printername].addText( TableRandom + '卓\n');
                        DC.printers[printername].addFeedUnit(8);
            		
            DC.printers[printername].addCut(DC.printers[printername].CUT_RESERVE);



            DC.printers[printername].addTextLang('ja');
			DC.printers[printername].addTextRotate(true);
			DC.printers[printername].addCut(DC.printers[printername].CUT_RESERVE);
			//DC.printers[printername].addFeedUnit(112);
			
			DC.printers[printername].addTextDouble(false, false);
                        DC.printers[printername].addText( ordernum + '2  ' );
			DC.printers[printername].addText( PersonRandom );
			DC.printers[printername].addText('名　');
			DC.printers[printername].addText('担当：片山　');
			var jikan= new Date();
			DC.printers[printername].addText('  時刻:' + jikan.getHours()+"時" + jikan.getMinutes() + "分" + jikan.getSeconds() + "秒" + '\n');
			DC.printers[printername].addTextStyle(false, false, false, DC.printers[printername].COLOR_1);
			
			DC.printers[printername].addTextDouble(true, true);
			DC.printers[printername].addText('　' + NumRandom2 + '　　　　　');
            DC.printers[printername].addText(item + "2");
			DC.printers[printername].addText('\n');
            DC.printers[printername].addFeedUnit(8);	
            
            DC.printers[printername].addTextDouble(false,false);
            DC.printers[printername].addText('調理単品　');
			DC.printers[printername].addTextStyle(false, false, false, DC.printers[printername].COLOR_1);
			DC.printers[printername].addText('【新　規】　　　　　');
			DC.printers[printername].addTextDouble(true, true);
			DC.printers[printername].addText( TableRandom + '卓\n');
                        DC.printers[printername].addFeedUnit(8);
            		
            DC.printers[printername].addCut(DC.printers[printername].CUT_RESERVE);
            
            
            
            DC.printers[printername].addTextLang('ja');
			DC.printers[printername].addTextRotate(true);
			DC.printers[printername].addCut(DC.printers[printername].CUT_RESERVE);
			//DC.printers[printername].addFeedUnit(112);
			
			DC.printers[printername].addTextDouble(false, false);
                        DC.printers[printername].addText( ordernum + '3  ' );
			DC.printers[printername].addText( PersonRandom );
			DC.printers[printername].addText('名　');
			DC.printers[printername].addText('担当：片山　');
			var jikan= new Date();
			DC.printers[printername].addText('  時刻:' + jikan.getHours()+"時" + jikan.getMinutes() + "分" + jikan.getSeconds() + "秒" + '\n');
			DC.printers[printername].addTextStyle(false, false, false, DC.printers[printername].COLOR_1);
			
			DC.printers[printername].addTextDouble(true, true);
			DC.printers[printername].addText('　' + NumRandom3 + '　　　　　');
            DC.printers[printername].addText(item + "3");
			DC.printers[printername].addText('\n');
            DC.printers[printername].addFeedUnit(8);	
            
            DC.printers[printername].addTextDouble(false,false);
            DC.printers[printername].addText('調理単品　');
			DC.printers[printername].addTextStyle(false, false, false, DC.printers[printername].COLOR_1);
			DC.printers[printername].addText('【新　規】　　　　　');
			DC.printers[printername].addTextDouble(true, true);
			DC.printers[printername].addText( TableRandom + '卓\n');
            DC.printers[printername].addFeedUnit(8);
            		
            DC.printers[printername].addCut(DC.printers[printername].CUT_RESERVE);

            //DC.printers[printername].addCut(DC.printers[printername].CUT_FEED);
            DC.printers[printername].addCommand("\xff");
      return DC.printers[printername].message;
    }
    else return;


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

    
}
