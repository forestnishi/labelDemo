class deviceController {
	
  constructor( requesttype, url, isAsync ) {
	/*
    this.ipaddr = ipaddress;
    this.printerlist = printerlist;
    this.printers = {};
    this.creatingPrinter = null;
    this.defaultprinter = "drink_printer";
    this.port = port;
    this.printer = null;
    this.isSent = false;
    this.currentPrintingJob = "";
    this.newOrder2;
	*/
	if( !requesttype ) this.requesttype = "POST";
	else this.requesttype = "POST";

	if( !url ) this.targeturl = "http://192.168.192.168/cgi-bin/epos/service.cgi?devid=local_printer&timeout=10000";
	else this.targeturl = url;

	if( !isAsync ) this.isAsync = true;
	else this.isAsync = isAsync;

	// プリンタステータス一覧
	this.ASB_NO_RESPONSE = 0x00000001;
	this.ASB_PRINT_SUCCESS = 0x00000002;
	this.ASB_DRAWER_KICK = 0x00000004;
	this.ASB_OFF_LINE = 0x00000008;
	this.ASB_COVER_OPEN = 0x00000020;
	this.ASB_PAPER_FEED = 0x00000040;
	this.ASB_WAIT_ON_LINE = 0x00000100;
	this.ASB_PANEL_SWITCH = 0x00000200;
	this.ASB_MECHANICAL_ERR = 0x00000400;
	this.ASB_AUTOCUTTER_ERR = 0x00000800;
	this.ASB_UNRECOVER_ERR = 0x00002000;
	this.ASB_AUTORECOVER_ERR = 0x00004000;
	this.ASB_RECEIPT_NEAR_END = 0x00020000;
	this.ASB_RECEIPT_END = 0x00080000;
	this.ASB_BUZZER = 0x01000000;
	this.ASB_SPOOLER_IS_STOPPED = 0x80000000;

  }

  sendJob( printData, callbackMC ){

		// 印刷を指示し、結果を取得する。　結果が戻ってきたら、結果をMCに通知する   this.requesttype,  this.targeturl, this.isAsync 

		// xhrのインスタンスを生成し、コールバック関数を登録しておく
		let xhrobj = new xhrController( this.requesttype, this.targeturl,  true, 
			function ( res ) { 
				// xhrの受信内容を返す処理
				// ePOSの結果を受信した場合は、xmlからstatusを抜き出し、statusを解析する
				let Status = res[1].documentElement;
				let status1 = res[1].documentElement.getElementsByTagName('response');
				let status2 = res[1].documentElement.getElementsByTagName('response')[0].getAttribute("status");
				let result = DC.getStatusText( status2 );

				// MCに印刷結果を返す
				callbackMC( result );
			} 
		);
		// 印刷データをxhrのインスタンスに渡して印刷を実行させる
		xhrobj.sendData( printData );
  } 

  
  // get status text　最初のパラメータはprinerオブジェクトを入れる
  getStatusText(status) {
                //status=2ならスプール完了とみなす
		var s = '';
		if (status & this.ASB_NO_RESPONSE) {
			s += ' No printer response\n';
		}
		if (status & this.ASB_PRINT_SUCCESS) {
            s+= "印刷完了またはスプール完了\n";
			//else //s += ' Print complete\n';
		}
		if (status & this.ASB_DRAWER_KICK) {
			//s += ' Status of the drawer kick number 3 connector pin = "H"\n';
		}
		if (status & this.ASB_OFF_LINE) {
			s += ' Offline status\n';
		}
		if (status & this.ASB_COVER_OPEN) {
			s += ' Cover is open\n';
		}
		if (status & this.ASB_PAPER_FEED) {
			s += ' feed switch is feeding\n';
		}
		if (status & this.ASB_WAIT_ON_LINE) {
			s += ' Waiting for online recovery\n';
		}
		if (status & this.ASB_PANEL_SWITCH) {
			s += ' Panel switch is ON\n';
		}
		if (status & this.ASB_MECHANICAL_ERR) {
			s += ' Mechanical error\n';
		}
		if (status & this.ASB_AUTOCUTTER_ERR) {
			s += ' Auto cutter error\n';
		}
		if (status & this.ASB_UNRECOVER_ERR) {
			s += ' Unrecoverable error\n';
		}
		if (status & this.ASB_AUTORECOVER_ERR) {
			s += ' Auto recovery error\n';
		}
		if (status & this.ASB_RECEIPT_NEAR_END) {
			s += ' near end\n';
		}
		if (status & this.ASB_RECEIPT_END) {
			s += ' paper end\n';
		}
		if (status & this.ASB_BUZZER) {
			//s += ' Sounding the buzzer (certain model)\n';
		}
		if (status & this.ASB_SPOOLER_IS_STOPPED) {
			s += ' Stop the spooler\n';
		}
		return s;
    }


}
