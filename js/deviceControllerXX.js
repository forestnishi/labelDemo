class deviceController {
	
  constructor(ipaddress,port, printerlist) {
    this.ipaddr = ipaddress;
    this.printerlist = printerlist;
    this.printers = {};
    this.creatingPrinter = null;
    this.defaultprinter = "drink_printer";
    this.port = port;
    this.printer = null;
    this.ePosDev = new epson.ePOSDevice();
    this.isSent = false;
    this.currentPrintingJob = "";
  }
  
  
  connect() {

		var option = { 'eposprint' : true };

		this.ePosDev.connect(this.ipaddr, this.port, this.Callback_connect.bind(this), option );
		this.ePosDev.onreconnecting = this.OnReconnecting.bind(this);
		this.ePosDev.onreconnect = this.OnReconnect.bind(this);
		this.ePosDev.ondisconnect = this.OnDisconnect.bind(this);
		notice0( "updateConnection", 1 );
  }
  

  Callback_connect(data) {
				
		if (data == 'OK') {
 
            this.creatingPrinter = 0;
            this.createDevice_printer();
       
		}
                 
  }
  
  
  createDevice_printer() {
  
    var options  = {'crypto' : false, 'buffer' : false};
	this.ePosDev.createDevice(this.printerlist[this.creatingPrinter], 
                            this.ePosDev.DEVICE_TYPE_PRINTER, options, 
                            this.callbackCreateDevice_printer.bind(this)
    );
  
  }


  callbackCreateDevice_printer(data, code) {

        if( data != null ) {
             this.printers[ this.printerlist[this.creatingPrinter] ] = data;

            this.printers[ this.printerlist[this.creatingPrinter] ].onreceive = this.OnPtrReceive.bind(this);
        }
        
        if( this.creatingPrinter == this.printerlist.length - 1 ) {
            // start timer routine
            setInterval(this.updateSpoolStatus.bind(this), pollingInterval);
            
            //表示　プリンタを「接続状態」に     
            notice0( "updateConnection", 3 ); 
        }
        else {
            this.creatingPrinter++;
            this.createDevice_printer();
        }
	
  }


  sendJob(){
  
    var i = SentCnt;
    var L = MC.arrOrder.length;
    var targetPrinter = null;
    
    // まず送信失敗のオーダーおよび今回のオーダーを対象に送信を進める
	for( i; i < L; i++ ) {
	
        if( MC.arrOrder[i]['status'] == "" || MC.arrOrder[i]['status'] == "送信エラー" ) {
			// update MC.sendOrderInfo 
			//MC.sendOrderInfo['currentJob'] = MC.arrOrder[i]['job'];
			MC.arrOrder[i]['status'] = "sending";
			//MC.sendOrderInfo['lastsendtime'] = new Date();
			// send
			if( MC.arrOrder[i]['job'].substring(0,1) == 'd' )  targetPrinter = 'drink_printer';
			else targetPrinter = 'kitchen_printer';
            this.printers[targetPrinter].message = MC.arrOrder[i]['printdata'];
            
			this.printers[targetPrinter].send( MC.arrOrder[i]['job'] ); 
            return;
		}		
		
		SentCnt++;
    }
    
  }


  OnPtrReceive( response ) {
	  
	console.log( "code=" + response['code'] + " stat=" + response['status'] + " suc=" + response['success'] + " job=" + response['printjobid']);
	  
	// 受信したstatusの解析処理
    var statusText = this.getStatusText( this.printers[this.defaultprinter], response['status'] );
    
    //状態判定（送信完了したか？　印刷成功したか
    var resultText = "";
    
    if( response['status'] < 2 && response['success'] == false ) {
      resultText = "送信エラー";
    }
    if( response['status'] == 2 && response['success'] == true ) {
      resultText = "スプール完了";
    }
    if( response['status'] > 2 && response['success'] == true ) {
      resultText = "印刷完了";
    }
    if( response['status'] > 2 && response['success'] == false ) {
      resultText = "印刷失敗";
    }
    if( response['status'] < 16777216 && response['success'] == false ) {
      if( response['code'] == 'printing') {
        resultText = "印刷中";
      }
    }    
    
    MC.updateOrder(response,statusText, resultText );
    
    // 送信を継続するかどうか（送信エラーであっても、次に進む。送信エラーは次回の送信でリカバリーする）    
    if( SentCnt + 1 < MC.arrOrder.length ) {
		//まだ送信するデータが残っているので
		SentCnt++;
		this.sendJob();		
	}
    else {
		isSending = false;
		// update View
		notice0( "updateGrid", "" );
	}
    
  }

  
  // get status text　最初のパラメータはprinerオブジェクトを入れる
  getStatusText(e, status) {
                //status=2ならスプール完了とみなす
		var s = '<BR>';
		if (status & e.ASB_NO_RESPONSE) {
			s += ' No printer response\n';
		}
		if (status & e.ASB_PRINT_SUCCESS) {
                        //if( status == 2 ) s+= "スプール完了\n";
			//else //s += ' Print complete\n';
		}
		if (status & e.ASB_DRAWER_KICK) {
			//s += ' Status of the drawer kick number 3 connector pin = "H"\n';
		}
		if (status & e.ASB_OFF_LINE) {
			s += ' Offline status\n';
		}
		if (status & e.ASB_COVER_OPEN) {
			s += ' Cover is open\n';
		}
		if (status & e.ASB_PAPER_FEED) {
			s += ' feed switch is feeding\n';
		}
		if (status & e.ASB_WAIT_ON_LINE) {
			s += ' Waiting for online recovery\n';
		}
		if (status & e.ASB_PANEL_SWITCH) {
			s += ' Panel switch is ON\n';
		}
		if (status & e.ASB_MECHANICAL_ERR) {
			s += ' Mechanical error\n';
		}
		if (status & e.ASB_AUTOCUTTER_ERR) {
			s += ' Auto cutter error\n';
		}
		if (status & e.ASB_UNRECOVER_ERR) {
			s += ' Unrecoverable error\n';
		}
		if (status & e.ASB_AUTORECOVER_ERR) {
			s += ' Auto recovery error\n';
		}
		if (status & e.ASB_RECEIPT_NEAR_END) {
			s += ' near end\n';
		}
		if (status & e.ASB_RECEIPT_END) {
			s += ' paper end\n';
		}
		if (status & e.ASB_BUZZER) {
			//s += ' Sounding the buzzer (certain model)\n';
		}
		if (status & e.ASB_SPOOLER_IS_STOPPED) {
			s += ' Stop the spooler\n';
		}
		return s;
  }


  updateSpoolStatus() {

    if( isSending ) return;

    //loop for checking spooldata
    var i = 0;
    var L = MC.arrOrder.length;
    for( i = 0; i < L; i++ ) {

      if( MC.arrOrder[i]['result'] == "スプール完了" ) {
		console.log("job check " + MC.arrOrder[i]['job']);
        this.printers['drink_printer'].getPrintJobStatus( MC.arrOrder[i]['job'] );
      }
 
    }

  }


  OnReconnecting() {

    alert( "スプーラと再接続中。" );
    notice0( "updateConnection", 2 );
  }


  OnReconnect() {

    alert( "スプーラとの接続が復旧しました。" );
    notice0( "updateConnection", 3 );
  }


  OnDisconnect() {

    alert( "スプーラとの接続が切れています。" );
    this.connect();
    notice0( "updateConnection", 0 );
  }


}
