$(function(){

    $(document).ready(function(){

        // VCへの指示のためにこのイベント通知を利用する
        eventNotify = function( command, param1, param2 ) {
    
            if( command == "printCompletion" ) {

              if( param1 == 0 ) {    // 印刷完了                
                    showPrintCompletion( param2 );
              }
              else {

              }  

            }

        }
        
    });

	//orderをエントリする
	$(document).on("click", "#orderButton", function(){

        // オーダーを入れられるかのチェック
        if( total_current_order == 9) {

            alert( 'いっぱいです。これ以上オーダーできません。');

        }
        // オーダーが入れられる
        else {

            // MCにオーダーエントリの依頼
            let newOrder = MC.entryOrder();

            // オーダーを要素として追加する
            $('#currentOrder').append('<p class="newOrder" id="' + newOrder['job'] + '">' + newOrder['job']  + " " + newOrder["item"] + " " + newOrder["num"] + '</p>');

            total_current_order++;
            
            return true;
        }

	});

    // オーダーの印刷完了を表示する。（オーダーの背景色変更)
    function showPrintCompletion ( orderID ) {

        let bkcolor = $(orderID).css("background-color");

        if( $(orderID).css("background-color") == "rgb(0, 255, 255)" ) {

                // 対象のオーダーの背景色を印刷済みの色に帰る
                $(orderID).css( {'background-color': 'yellow' } );
        }

    }

    // orderを消し込む
	$(document).on("click", ".newOrder", function(){

        let bkcolor = $(this).css("background-color");

        if( $(this).css("background-color") == "rgb(255, 255, 0)" ) {

                let thisSelector = this;
                // 対象のオーダーの背景色を変えておきもう一度トリガーをかける
                $(this).css( {'background-color': 'orange' } );

                // 色の変更が反映されるよう、非同期な処理を使う
                setTimeout(function(){

                    // 対象オーダーの背景色がorangeならオーダーを消す
                    let result = window.confirm('このオーダーを消しますか！');
                
                    if( result ) {
                        $(thisSelector).animate({
                            opacity: 0,    // 透明度0へ　徐々に消していく
                        }, 200, function() {

                            // アニメーション完了後　対象の要素を消す
                            $(thisSelector).remove();
                            // MCに対しオーダー削除の要求を出す。
                            MC.removeOrder(thisSelector.id);
                            
                        });
                        total_current_order--;
                    }
                    else {
                        $(this).css( {'background-color': 'aqua' } );
                    }

                }, 0);
        }

	});

});


