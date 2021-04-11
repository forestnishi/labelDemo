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
        let targetid = $(this).attr('id');
        $('#' + targetid).remove();
        total_current_order--;
	});

});


