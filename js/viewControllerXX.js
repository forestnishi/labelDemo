               
$(function(){
               $(document).ready(function(){
        
                  notice0 = function( command, param ) {

					  $("#mainbutton").prop("disabled",false);

					  if( command == "updateGrid" ) {
						// jsondata を　ｐｈｐに投げ
					  }

			  
					  if( command == "updateConnection" ) {
						if( param == 0 ) {
						  $("#connectionmessage").text("切断中");
						  $("#connectionmessage").css('color', 'Red');  
						}
						if( param == 1 ) {
						  $("#connectionmessage").text("接続処理中");
						  $("#connectionmessage").css('color', 'Yellow');  
						}
						if( param == 2 ) {
						  $("#connectionmessage").text("再接続処理中");
						  $("#connectionmessage").css('color', 'Yellow');  
						}
						if( param == 3 ) {
						  $("#connectionmessage").text("接続状態");
						  $("#connectionmessage").css('color', 'Green');    
						}                  
                      }
                  
                  }
                  
                  
					//Prepare jTable
					$('#PeopleTableContainer').jtable({
						title: 'この端末のオーダ情報',
						actions: {
							listAction: 'PersonActions.php?action=list',
							createAction: 'PersonActions.php?action=create',
							updateAction: 'PersonActions.php?action=update',
							deleteAction: 'PersonActions.php?action=delete'
						},
						fields: {
							Id: {
								key: true,
								create: true,
								edit: false,
								list: true
							},
							OrderNumber: {
								title: 'オーダー番号',
								width: '200px'
							},
							Job: {
								title: 'Job',
								width: '200px'
							},
							OrderDate: {
								title: 'オーダ時刻',
								width: '200px',
								type: 'date',
								create: false,
								edit: false
							},
							Status: {
								title: '状態',
								width: '200px'
							},
							Result: {
								title: '結果',
								width: '200px'
							},
							ConfirmDate: {
								title: '完了確認時刻',
								width: '200px',
								type: 'date',
								create: false,
								edit: false
							}
						}
					});
					
					
					//Load person list from server
			      $('#PeopleTableContainer').jtable('load');
                  DC.connect();

               });

               


	//order画面に移行する
	$(document).on("click", "#mainbutton", function(){
                $("#mainbutton").prop("disabled", true);
                MC.entryOrder();
		return true;
	});
	
	
        function intervalLoop() {
          DC.updateSpoolStatus.bind(this);
        }
});


