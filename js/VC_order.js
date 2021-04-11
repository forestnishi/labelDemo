$(function(){

    $(document).ready(function(){
        
    });

	//orderをエントリする
	$(document).on("click", "#orderButton", function(){

        // オーダーを入れられるかのチェック
        if( total_current_order == 9) {
            alert( 'いっぱいです。これ以上オーダーできません。');
        }
        // オーダーが入れられる
        else {
            // 時刻を取得し、オーダー番号に利用する        　　
            let crnt_date = new Date();
            let orderID = 'order_' + Math.floor( crnt_date.getTime() / 100 );
            // オーダーを要素として追加する
            $('#currentOrder').append('<p class="newOrder" id="' + orderID + '">オーダー追加されました' + orderID + '</p>');
            total_current_order++;
            return true;
        }

	});

    //orderを消し込む
	$(document).on("click", ".newOrder", function(){

        let bkcolor = $(this).css("background-color");

        if( $(this).css("background-color") == "rgb(0, 255, 255)" ) {

                let thisSelector = this;
                // 対象のオーダーの背景色を変えておきもう一度トリガーをかける
                $(this).css( {'background-color': 'orange' } );

                // 色の変更が反映されるよう非同期な処理を使う
                setTimeout(function(){

                    // 対象オーダーの背景色がorangeならオーダーを消す
                    let result = window.confirm('このオーダーを消しますか！');
                
                    if( result ) {
                        $(thisSelector).animate({
                            opacity: 0,    // 透明度0へ　徐々に消していく
                        }, 200, function() {

                            // アニメーション完了後　対象の要素を消す
                            $(thisSelector).remove();
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


