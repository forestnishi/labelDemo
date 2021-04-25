class xhrController {

    constructor( requesttype, targeturl,  isAsync , callback ) {

        // クラス変数はthisを付けてconstructor内に宣言する
        // thisはクラスインスタンスを示すキーワード
        this.requesttype = requesttype;
        this.targeturl = targeturl;
        this.callbackfunc = callback;
        this.isAsync = isAsync;

        // XMLHttpRequest オブジェクトを作成
        // クラス内部からこのメソッドを呼ぶ時はthisが必要
        this.xhr;

    }

    sendData( xmldata ) {

        // Promiseオブジェクトでは、オブジェクト生成時に、実行したい非同期処理とそのあとの成功時処理、失敗時処理に渡す
        // パラメータ(ここではresolveとreject)を規定する。また、
        // 非同期に処理していることが成功に終わったときはPromise.then構文が実行され、失敗のときはPromise.catch構文が
        // 実行される。（非同期終了時に実行させたい処理はthen・catchそれぞれの構文の中に規定すること）
    
        // 実行したい非同期処理が終わるときに成功・失敗の判断を行い、then、catchに渡すそれぞれのパラメータを規定する。
        // ここではそれが　resolve とreject　のパラメータであり、resolve( 文字列など、渡したいパラメータ ) の構文で設定する。
    
        // 以下はPromiseの中で非同期処理の例としてSetTimeoutを実行し、結果の評価を行い、resolveに成功文字列、
        // rejectに失敗文字列を渡している例である。
    
        // 実際にはXHRの処理や HTML5のAPIの処理として用いられることが多いはず。
        let XmlData = xmldata;
        this.xhr = new XMLHttpRequest();
        this.xhr.open( this.requesttype,  this.targeturl, this.isAsync );
        //console.log("this.xhr open");
    
        //< ヘッダーの設定 >
        this.xhr.setRequestHeader('Content-Type', 'text/xml; charset=utf-8');
        this.xhr.setRequestHeader('If-Modified-Since', 'Thu, 01 Jan 1970 00:00:00 GMT');
        this.xhr.setRequestHeader('SOAPAction', '""');
    
        // コールバック時の処理を設定し、xhrの送信を行う。Promise文にて。
        let xhrPromise = new Promise(( resolve, reject ) => {
    
            //onreadystatechange登録
            this.xhr.onreadystatechange = function () {
    
                switch(this.readyState){
    
                    case 1:
                        console.log("readystate1 open() メソッドの呼び出しが完了した");
                        break;
    
                    case 2:
                        break;
    
                    case 3:
                        console.log("readystate3 レスポンスボディを受信中（繰り返し実行される）");
                        break;
    
                    case 4:
                        // リクエスト成功
                        if((200 <= this.status && this.status < 300) || (this.status == 304)){

                            console.log("readystate4 レスポンス:" + this.responseText);
                            resolve( [ this.responseText, this.responseXML ] ); // thenのreso変数に渡される
                            
                        // リクエスト失敗
                        }else{
                            console.log("リクエスト失敗");
                            reject( "failure" ); // catchのrej変数に渡される
                        }
                        break;
    
                    default:
                        break;
                };
            };
             
             // this.xhr send
             this.xhr.send( XmlData );
             //console.log("this.xhr send");
    
        });
    
         xhrPromise
         .then(( reso ) => {
            // 送受信が完了した場合
            this.callbackfunc( reso );
        })
    
        .catch( (rej) => {
            // 送受信失敗したとき
              alert( rej );
        });
    
     }


}